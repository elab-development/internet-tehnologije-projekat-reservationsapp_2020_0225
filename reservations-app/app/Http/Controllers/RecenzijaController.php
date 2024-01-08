<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\RecenzijaResource;
use App\Models\Recenzija;
use App\Models\Objekat;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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

    $user_id = Auth::user()->id; 

    //ADMINISTRATOR
    $jeAdmin = Auth::user()->jeAdmin;

    if ($jeAdmin) {
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Administrator ne moze ostaviti recenziju!'], 403);
    }

    $jeMenadzerObjekata = Auth::user()->jeMenadzerObjekata;

    if ($jeMenadzerObjekata) {
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Menadzeri objekata nisu ovlasceni da ostavljaju recenzije!'], 403);
    }


    $validator = Validator::make($request->all(), [
        'vrstaRecenzije' => 'required',
        'komentarUzRecenziju' => 'required',
        'brojZvezdica' => 'required',
        'objekat_id' => 'required',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors());
    }

    $brojZvezdica = $request->brojZvezdica;
    $stars = str_repeat('⭐', $brojZvezdica);

    $recenzija = new Recenzija();
    $recenzija->vrstaRecenzije = $request->vrstaRecenzije;
    $recenzija->komentarUzRecenziju = $request->komentarUzRecenziju;
    $recenzija->brojZvezdica = $stars;
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
        $user_id = Auth::user()->id; 

            //ADMINISTRATOR
    $jeAdmin = Auth::user()->jeAdmin;

    if ($jeAdmin) {
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Administrator ne moze menjati recenziju!'], 403);
    }

    $jeMenadzerObjekata = Auth::user()->jeMenadzerObjekata;

    if ($jeMenadzerObjekata) {
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Menadzeri objekata nisu ovlasceni da menjaju recenzije!'], 403);
    }

    $recenzija_user_id = Recenzija::where('id', $id)->value('user_id');

    if($user_id != $recenzija_user_id){
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Datu recenziju nije kreirao trenutno ulogovani korisnik, stoga je ne moze ni menjati!'], 403);
    }


        $validator = Validator::make($request->all(), [
            'vrstaRecenzije' => 'required',
            'komentarUzRecenziju' => 'required',
            'brojZvezdica' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json($errors);
        }

        $brojZvezdica = $request->brojZvezdica;
        $stars = str_repeat('⭐', $brojZvezdica);

        $recenzija = Recenzija::findOrFail($id);

        $recenzija->vrstaRecenzije = $request->vrstaRecenzije;
        $recenzija->vrstaRecenzije = $request->vrstaRecenzije;
        $recenzija->komentarUzRecenziju = $request->komentarUzRecenziju;
        $recenzija->brojZvezdica = $stars;
        $recenzija->user_id = $user_id;

        $recenzija->save();

        return response()->json(['Recenzija je uspesno izmenjena!', new RecenzijaResource($recenzija)]);
    }



    public function destroy($id)
    {
        $user_id = Auth::user()->id; 
                    //ADMINISTRATOR
    $jeAdmin = Auth::user()->jeAdmin;

    if ($jeAdmin) {
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Administrator ne moze brisati recenziju!'], 403);
    }

    $jeMenadzerObjekata = Auth::user()->jeMenadzerObjekata;

    if ($jeMenadzerObjekata) {
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Menadzeri objekata nisu ovlasceni da brisu recenzije!'], 403);
    }

    $recenzija_user_id = Recenzija::where('id', $id)->value('user_id');

    if($user_id != $recenzija_user_id){
        return response()->json(['error' => 'NEOVLASCEN PRISTUP: Datu recenziju nije kreirao trenutno ulogovani korisnik, stoga je ne moze ni brisati!'], 403);
    }
        $recenzija = Recenzija::findOrFail($id);
        $objekat = Objekat::findOrFail($recenzija->objekat_id);
        $objekat->brojRecenzija--;
        $objekat->save();
        $recenzija->delete();
        return response()->json('Data recenzija je uspesno obrisana!');
    }
}
