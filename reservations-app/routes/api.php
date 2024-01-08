<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ObjekatController;
use App\Http\Controllers\TipObjektaController;
use App\Http\Controllers\RecenzijaController;

use App\Http\Controllers\PretragaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('objekti', [ObjekatController::class, 'index']);
Route::get('objekti/{id}', [ObjekatController::class, 'show']); 

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('users', [UserController::class, 'index']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);

    Route::get('tipovi_objekata', [TipObjektaController::class, 'index']);

    Route::post('objekti', [ObjekatController::class, 'store']);
    Route::post('objekti/makeAReservation/{id}', [ObjekatController::class, 'makeAReservation']);
    Route::put('objekti/{id}', [ObjekatController::class, 'update']); 
    Route::patch('objekti/izmeniOpis/{id}', [ObjekatController::class, 'updateOpis']);
    Route::delete('objekti/{id}', [ObjekatController::class, 'destroy']);

    Route::resource('recenzije', RecenzijaController::class);

    Route::get('/pretragaObjekata/poNazivu', [PretragaController::class, 'pretragaPoNazivu']);
    Route::get('/pretragaObjekata/poTipu', [PretragaController::class, 'pretragaPoTipu']);

    Route::post('logout', [AuthController::class, 'logout']);
});

