<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Objekat;
use App\Models\TipObjekta;
use App\Http\Resources\ObjekatResource;

use Illuminate\Support\Facades\Auth;
use Illuminate\Pagination\Paginator;

class PretragaController extends Controller
{
    public function pretragaPoNazivu(Request $request)
    {
        $user_id = Auth::user()->id; 

        //ADMINISTRATOR
        $jeAdmin = Auth::user()->jeAdmin;

        if (!$jeAdmin) {
             return response()->json(['error' => 'NEOVLASCEN PRISTUP: Administrator samo moze videti sve korisnike!'], 403);
         }
         
        $query = Objekat::query();


        if ($request->has('naziv')) {
            $query->where('naziv', 'like', '%' . $request->input('naziv') . '%');
        }

        $page = $request->input('page', 1);
        $perPage = 2;

        $objekti = $query->orderBy('naziv')->paginate($perPage, ['*'], 'page', $page);

        if($objekti->isEmpty()){
            return response()->json(['message' => 'Ne postoje objekti ciji naziv zadovoljava uneti kriterijum pretrage.'], 404);
        }
        return response()->json(['Current page: ' => $objekti->currentPage(), 'Last page:' => $objekti->lastPage(),
         'Pronadjeni objekti sa unetim nazivom:' => ObjekatResource::collection($objekti)], 200);
    }

        //vrati objekte po tipu objketa - po nazivu unesenom i paginiraj
        public function pretragaPoTipu(Request $request)
        {
            $nazivTipa = $request->input('naziv');
    
            $tipObjekta = TipObjekta::where('naziv', trim($nazivTipa))->first();
    
            //ako ne postoji taj tip
            if (!$tipObjekta) {
                return response()->json(['message' => 'Dati tip objekta ne postoji.'], 404);
            }
    
            //smesta sve koje su tog tipa
            $objekti = Objekat::where('tip_objekta_id', $tipObjekta->id)->get();
    
            //ako je prazan niz
            if ($objekti->isEmpty()) {
                return response()->json(['message' => 'Objekti tipa ' . $nazivTipa . ' nisu nadjeni.'], 404);
            }
    
            //trenutna stranica
            $currentPage = Paginator::resolveCurrentPage();
            $perPage = 1;
            //vraca rezultate za trenutnu stranicu, sece niz objekti na osnovu formule
            //pretvara u php array sa fjom all jer to prihvata lenghtAwarePaginator
            $currentPageSearchResults = $objekti->slice(($currentPage - 1) * $perPage, $perPage)->all();
    
            //kreira se obj LenghtAwarePaginator koji rezultate pretrage, ukupan broj objekata, koliko po stranici
            $paginatedSearchResults= new \Illuminate\Pagination\LengthAwarePaginator($currentPageSearchResults, count($objekti), $perPage);
    
            //objekti koje su po paginate principu uradjeni
            return response()->json([
                'message' => 'Objekti tipa ' . $nazivTipa . ' su uspesno pronadjeni: ',
                'objekti' => PropertyResource::collection($paginatedSearchResults)
            ]);
        }
}
