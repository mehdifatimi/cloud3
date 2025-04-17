<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SallesController extends Controller
{
    public function index()
    {
        return response()->json(Salle::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'capacite' => 'required|integer|min:1',
            'equipements' => 'nullable|array',
            'localisation' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $salle = Salle::create($request->all());
        return response()->json($salle, 201);
    }

    public function show(Salle $salle)
    {
        return response()->json($salle);
    }

    public function update(Request $request, Salle $salle)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|max:255',
            'capacite' => 'sometimes|required|integer|min:1',
            'equipements' => 'nullable|array',
            'localisation' => 'sometimes|required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $salle->update($request->all());
        return response()->json($salle);
    }

    public function destroy(Salle $salle)
    {
        $salle->delete();
        return response()->json(null, 204);
    }

    public function search(Request $request)
    {
        $query = Salle::query();

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('date') && $request->has('heure_debut') && $request->has('heure_fin')) {
            $query->whereDoesntHave('creneaux', function ($q) use ($request) {
                $q->where('date', $request->date)
                  ->where(function ($q) use ($request) {
                      $q->whereBetween('heure_debut', [$request->heure_debut, $request->heure_fin])
                        ->orWhereBetween('heure_fin', [$request->heure_debut, $request->heure_fin]);
                  })
                  ->where('disponible', false);
            });
        }

        return response()->json($query->get());
    }
} 