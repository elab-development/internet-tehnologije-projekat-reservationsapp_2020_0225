<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\UserResource;
use App\Models\User;

use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{


    public function index()
    {
        $jeAdmin = Auth::user()->jeAdmin;

        if (!$jeAdmin) {
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Samo admin moze videti sve korisnike!'], 403);
        }
        $users = User::all();
        return UserResource::collection($users);
    }




    public function destroy($id)
    {
        $jeAdmin = Auth::user()->jeAdmin;

        if (!$jeAdmin) {
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Samo admin moze brisati korisnike iz sistema!'], 403);
        }
        $user = User::findOrFail($id);
        $ime = $user->name;
        $user->delete();
        return response()->json('Korisnik '.$ime.' je uspesno obrisan!');
    }
}
