<?php

namespace App\Http\Controllers;

use App\Models\Creneau;
use App\Models\Salle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CreneauxController extends Controller
{
    public function index(Salle $salle)
    {
        return response()->json($salle->creneaux);
    }

    public function store(Request $request, Salle $salle)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'heure_debut' => 'required|date_format:H:i:s',
            'heure_fin' => 'required|date_format:H:i:s|after:heure_debut',
            'disponible' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $creneau = $salle->creneaux()->create($request->all());
        return response()->json($creneau, 201);
    }

    public function update(Request $request, Creneau $creneau)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'sometimes|required|date',
            'heure_debut' => 'sometimes|required|date_format:H:i:s',
            'heure_fin' => 'sometimes|required|date_format:H:i:s|after:heure_debut',
            'disponible' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $creneau->update($request->all());
        return response()->json($creneau);
    }

    public function destroy(Creneau $creneau)
    {
        $creneau->delete();
        return response()->json(null, 204);
    }
} 