<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\RecenzijaResource;
use App\Models\Recenzija;
use App\Models\Objekat;

class RecenzijaController extends Controller
{
    public function index()
    {
        $recenzije = Recenzija::all();
        return RecenzijaResource::collection($recenzije);
    }

    public function show($id)
    {
        $recenzija = Recenzija::findOrFail($id);
        return new RecenzijaResource($recenzija);
    }

    public function store(Request $request)
    {
    $validator = Validator::make($request->all(), [
        'vrstaRecenzije' => 'required',
        'komentarUzRecenziju' => 'required',
        'brojZvezdica' => 'required',
        'objekat_id' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors());
    }

    $recenzija = new Recenzija();
    $recenzija->vrstaRecenzije = $request->vrstaRecenzije;
    $recenzija->komentarUzRecenziju = $request->komentarUzRecenziju;
    $recenzija->brojZvezdica = $request->brojZvezdica;
    $recenzija->objekat_id = $request->objekat_id;
    $objekat = Objekat::findOrFail($recenzija->objekat_id);
    $objekat->brojRecenzija++;
    $objekat->save();
    $recenzija->user_id = $user_id;

    $recenzija->save();

    return response()->json(['Korisnik je uspesno ostavio recenziju!!!',
         new RecenzijaResource($recenzija)]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'vrstaRecenzije' => 'required',
            'komentarUzRecenziju' => 'required',
            'brojZvezdica' => 'required',
            'objekat_id' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json($errors);
        }

        $recenzija = Recenzija::findOrFail($id);

        $recenzija->vrstaRecenzije = $request->vrstaRecenzije;
        $recenzija->vrstaRecenzije = $request->vrstaRecenzije;
        $recenzija->komentarUzRecenziju = $request->komentarUzRecenziju;
        $recenzija->brojZvezdica = $request->brojZvezdica;
        $recenzija->objekat_id = $request->objekat_id;
        $objekat = Objekat::findOrFail($recenzija->objekat_id);
        $objekat->brojRecenzija++;
        $objekat->save();
        $recenzija->user_id = $user_id;

        $recenzija->save();

        return response()->json(['Recenzija je uspesno izmenjena!', new RecenzijaResource($recenzija)]);
    }

    public function updateKomentar(Request $request, $id)
    {
        $request->validate([
            'komentarUzRecenziju' => 'required'
        ]);

        $recenzija = Recenzija::findOrFail($id);

        $recenzija->update(['komentarUzRecenziju' => $request->input('komentarUzRecenziju')]);

        return response()->json(['message' => 'Uspesno izmenjen komentar date recenzije.', new RecenzijaResource($recenzija)]);
    }



    public function destroy($id)
    {
        $recenzija = Recenzija::findOrFail($id);
        $objekat = Objekat::findOrFail($recenzija->objekat_id);
        $objekat->brojRecenzija--;
        $objekat->save();
        $recenzija->delete();
        return response()->json('Data recenzija je uspesno obrisana!');
    }
}
