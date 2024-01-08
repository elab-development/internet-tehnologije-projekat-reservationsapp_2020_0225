<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{


    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }




    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $ime = $user->name;
        $user->delete();
        return response()->json('Korisnik '.$ime.' je uspesno obrisan!');
    }
}
