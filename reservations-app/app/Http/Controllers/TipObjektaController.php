<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Resources\TipObjektaResource;
use App\Models\TipObjekta;

class TipObjektaController extends Controller
{
    public function index()
    {
        $tipovi = TipObjekta::all();
        return TipObjektaResource::collection($tipovi);
    }
}
