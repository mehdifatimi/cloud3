<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\CreneauController;
use App\Http\Controllers\ReservationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group.
|
*/

// Routes pour les salles
Route::resource('salles', SalleController::class);

// Routes pour les créneaux
Route::resource('creneaux', CreneauController::class);

// Routes pour les réservations
Route::resource('reservations', ReservationController::class);
