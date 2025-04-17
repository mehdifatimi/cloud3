<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SallesController;
use App\Http\Controllers\CreneauxController;
use App\Http\Middleware\CheckManager;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes
Route::get('/salles', [SallesController::class, 'index']);
Route::get('/salles/disponibles', [SallesController::class, 'search']);
Route::get('/salles/{salle}', [SallesController::class, 'show']);

// Protected routes (manager only)
Route::middleware([CheckManager::class])->group(function () {
    Route::post('/salles', [SallesController::class, 'store']);
    Route::put('/salles/{salle}', [SallesController::class, 'update']);
    Route::delete('/salles/{salle}', [SallesController::class, 'destroy']);
    
    Route::post('/salles/{salle}/creneaux', [CreneauxController::class, 'store']);
    Route::put('/creneaux/{creneau}', [CreneauxController::class, 'update']);
    Route::delete('/creneaux/{creneau}', [CreneauxController::class, 'destroy']);
});

// Creneau routes
Route::get('/salles/{salle}/creneaux', [CreneauxController::class, 'index']);
