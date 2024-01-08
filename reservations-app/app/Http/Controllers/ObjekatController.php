<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\ObjekatResource;
use App\Models\Objekat;
use App\Models\TipObjekta;

use Illuminate\Support\Facades\Auth;

class ObjekatController extends Controller
{
    public function index()
    {
        $objekti = Objekat::all();
        return ObjekatResource::collection($objekti);
    }

    public function show($id)
    {

        $objekat = Objekat::findOrFail($id);
        return new ObjekatResource($objekat);
    }

    public function store(Request $request)
    {

    $user_id = Auth::user()->id; 

    //ADMINISTRATOR
    $jeAdmin = Auth::user()->jeAdmin;

    if ($jeAdmin) {
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Administrator ne moze kreirati objekte!'], 403);
    }

    //MENADZER OBJEKTA

    $jeMenadzerObjekta = Auth::user()->jeMenadzerObjekta;

    if (!$jeMenadzerObjekta) {
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Samo menadzeri objekata mogu kreirati objekte!'], 403);
    }

    $validator = Validator::make($request->all(), [
        'naziv' => 'required',
        'opis' => 'required',
        'grad' => 'required',
        'adresa' => 'required',
        'tip_objekta_id' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors());
    }

    $objekat = new Objekat();
    $objekat->naziv = $request->naziv;
    $objekat->opis = $request->opis;
    $objekat->grad = $request->grad;
    $objekat->adresa = $request->adresa;
    $objekat->brojRecenzija = 0;
    $objekat->tip_objekta_id = $request->tip_objekta_id;
    $tipObjekta = TipObjekta::findOrFail($objekat->tip_objekta_id);
    $tipObjekta->brojObjekataKojiSuTrenutnoOvogTipa++;
    $tipObjekta->save();
    $objekat->user_created_id = $user_id;
    $objekat->user_reserved_id = 0;

    $objekat->save();

    return response()->json(['Korisnik je uspesno kreirao objekat!!!',
         new ObjekatResource($objekat)]);
    }

    public function makeAReservation(Request $request, $id)
    {

    $user_id = Auth::user()->id; 

    //ADMINISTRATOR
    $jeAdmin = Auth::user()->jeAdmin;

    if ($jeAdmin) {
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Administrator ne moze rezervisati objekte!'], 403);
    }

    $jeMenadzerObjekta = Auth::user()->jeMenadzerObjekta;

    if ($jeMenadzerObjekta) {
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Menadzeri objekata nisu ovlasceni da prave rezervacije objekata!'], 403);
    }
    
    $objekat = Objekat::findOrFail($id);
    $objekat->user_reserved_id = $user_id;

    $objekat->save();

    return response()->json(['Korisnik je uspesno ostavio rezervaciju za dati objekat!!!',
         new ObjekatResource($objekat)]);
    }

    public function update(Request $request, $id)
    {
        $user_id = Auth::user()->id; 

    //MENADZER OBJEKTA
    $jeMenadzerObjekta = Auth::user()->jeMenadzerObjekta;

    //ADMINISTRATOR
    $jeAdmin = Auth::user()->jeAdmin;

    if (!$jeMenadzerObjekta && !$jeAdmin) {
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Samo menadzeri objekata ili administrator mogu menjati objekte!'], 403);
    }
    //DA LI JE TAJ MENADZER KREATOR OBJEKTA
    if($jeMenadzerObjekta){
        $objekat_user_created_id = Objekat::where('id', $id)->value('user_created_id');

        if($user_id != $objekat_user_created_id){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Dati menadzer nije objavio oglas za ovaj objekat, stoga ga ne moze ni menjati!'], 403);
        }
    }


        $validator = Validator::make($request->all(), [
            'naziv' => 'required',
            'opis' => 'required',
            'grad' => 'required',
            'adresa' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json($errors);
        }

        $objekat = Objekat::findOrFail($id);

        $objekat->naziv = $request->naziv;
        $objekat->opis = $request->opis;
        $objekat->grad = $request->grad;
        $objekat->adresa = $request->adresa;
        $objekat->tip_objekta_id = $request->tip_objekta_id;
        $objekat->user_created_id = $user_id;

        $objekat->save();

        return response()->json(['Objekat je uspesno izmenjen!', new ObjekatResource($objekat)]);
    }

    public function updateOpis(Request $request, $id)
    {
        $user_id = Auth::user()->id; 
    //MENADZER OBJEKTA

    $jeMenadzerObjekta = Auth::user()->jeMenadzerObjekta;

    //ADMINISTRATOR
    $jeAdmin = Auth::user()->jeAdmin;

    if (!$jeMenadzerObjekta && !$jeAdmin) {
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Samo menadzeri objekata ili administrator mogu menjati objekte!'], 403);
    }
    //DA LI JE TAJ MENADZER KREATOR OBJEKTA
    if($jeMenadzerObjekta){
        $objekat_user_created_id = Objekat::where('id', $id)->value('user_created_id');

        if($user_id != $objekat_user_created_id){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Dati menadzer nije objavio oglas za ovaj objekat, stoga ga ne moze ni menjati!'], 403);
        }
    }
        $request->validate([
            'opis' => 'required'
        ]);

        $objekat = Objekat::findOrFail($id);

        $objekat->update(['opis' => $request->input('opis')]);

        return response()->json(['message' => 'Uspesno izmenjen opis objekta.', new ObjekatResource($objekat)]);
    }



    public function destroy($id)
    {
        $user_id = Auth::user()->id; 
    //MENADZER OBJEKTA

    $jeMenadzerObjekta = Auth::user()->jeMenadzerObjekta;

    //ADMINISTRATOR
    $jeAdmin = Auth::user()->jeAdmin;

    if (!$jeMenadzerObjekta && !$jeAdmin) {
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Samo menadzeri objekata ili administrator mogu brisati objekte!'], 403);
    }
    //DA LI JE TAJ MENADZER KREATOR OBJEKTA
    if($jeMenadzerObjekta){
        $objekat_user_created_id = Objekat::where('id', $id)->value('user_created_id');

        if($user_id != $objekat_user_created_id){
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Dati menadzer nije objavio oglas za ovaj objekat, stoga ga ne moze ni brisati!'], 403);
        }
    }

        $objekat = Objekat::findOrFail($id);
        $tipObjekta = TipObjekta::findOrFail($objekat->tip_objekta_id);
        $tipObjekta->brojObjekataKojiSuTrenutnoOvogTipa--;
        $tipObjekta->save();
        $objekat->delete();
        return response()->json('Dati objekat je uspesno obrisan!');
    }
}
