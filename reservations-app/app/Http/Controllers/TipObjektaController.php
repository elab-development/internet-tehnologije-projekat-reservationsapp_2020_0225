<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\TipObjektaResource;
use App\Models\TipObjekta;

use Illuminate\Support\Facades\Auth;

class TipObjektaController extends Controller
{
    public function index()
    {
        $jeAdmin = Auth::user()->jeAdmin;

        if (!$jeAdmin) {
            return response()->json(['error' => 'NEOVLASCEN PRISTUP: Samo admin moze videti sve tipove objekata!'], 403);
        }
        $tipovi = TipObjekta::all();
        return TipObjektaResource::collection($tipovi);
    }
}
