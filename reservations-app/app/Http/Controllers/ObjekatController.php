<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\ObjekatResource;
use App\Models\Objekat;
use App\Models\TipObjekta;

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
    $objekat->user_id = $user_id;

    $objekat->save();

    return response()->json(['Korisnik je uspesno kreirao objekat!!!',
         new ObjekatResource($objekat)]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required',
            'opis' => 'required',
            'grad' => 'required',
            'adresa' => 'required',
            'tip_objekta_id' => 'required',
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
        $tipObjekta = TipObjekta::findOrFail($objekat->tip_objekta_id);
        $tipObjekta->brojObjekataKojiSuTrenutnoOvogTipa++;
        $tipObjekta->save();
        $objekat->user_id = $user_id;

        $objekat->save();

        return response()->json(['Objekat je uspesno izmenjen!', new ObjekatResource($objekat)]);
    }

    public function updateOpis(Request $request, $id)
    {
        $request->validate([
            'opis' => 'required'
        ]);

        $objekat = Objekat::findOrFail($id);

        $objekat->update(['opis' => $request->input('opis')]);

        return response()->json(['message' => 'Uspesno izmenjen opis objekta.', new ObjekatResource($objekat)]);
    }



    public function destroy($id)
    {
        $objekat = Objekat::findOrFail($id);
        $tipObjekta = TipObjekta::findOrFail($objekat->tip_objekta_id);
        $tipObjekta->brojObjekataKojiSuTrenutnoOvogTipa--;
        $tipObjekta->save();
        $objekat->delete();
        return response()->json('Dati objekat je uspesno obrisan!');
    }
}
