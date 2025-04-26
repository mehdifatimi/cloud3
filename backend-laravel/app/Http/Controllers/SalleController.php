<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SalleController extends Controller
{
    /**
     * Afficher toutes les salles
     */
    public function index()
    {
        $salles = Salle::with('responsable')->get();
        return response()->json($salles);
    }

    /**
     * Afficher une salle spécifique
     */
    public function show($id)
    {
        $salle = Salle::with('responsable')->find($id);
        
        if (!$salle) {
            return response()->json(['message' => 'Salle non trouvée'], 404);
        }

        return response()->json($salle);
    }

    /**
     * Créer une nouvelle salle
     */
    public function store(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'capacite' => 'required|integer|min:1',
            'equipements' => 'required|array',
            'equipements.*' => 'string',
            'localisation' => 'required|string|max:255',
            'idResponsable' => 'nullable|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Création de la salle
        $salle = Salle::create($request->all());

        return response()->json($salle, 201);
    }

    /**
     * Mettre à jour une salle
     */
    public function update(Request $request, $id)
    {
        $salle = Salle::find($id);

        if (!$salle) {
            return response()->json(['message' => 'Salle non trouvée'], 404);
        }

        // Validation des données
        $validator = Validator::make($request->all(), [
            'nom' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|max:255',
            'capacite' => 'sometimes|required|integer|min:1',
            'equipements' => 'sometimes|required|array',
            'equipements.*' => 'string',
            'localisation' => 'sometimes|required|string|max:255',
            'idResponsable' => 'nullable|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Mise à jour de la salle
        $salle->update($request->all());

        return response()->json($salle);
    }

    /**
     * Supprimer une salle
     */
    public function destroy($id)
    {
        $salle = Salle::find($id);

        if (!$salle) {
            return response()->json(['message' => 'Salle non trouvée'], 404);
        }

        $salle->delete();

        return response()->json(['message' => 'Salle supprimée avec succès']);
    }
} 