<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Objekat;
use App\Http\Resources\ObjekatResource;

use Illuminate\Support\Facades\Auth;

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
}
