<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Salle;
use App\Models\User;

class SalleSeeder extends Seeder
{
    public function run()
    {
        // Récupérer l'ID du manager
        $manager = User::where('role', 'manager')->first();

        // Créer quelques salles
        Salle::create([
            'nom' => 'Salle de Formation A',
            'type' => 'Formation',
            'capacite' => 30,
            'equipements' => ['Projecteur', 'Tableau blanc', 'WiFi'],
            'localisation' => 'Bâtiment A, 1er étage',
            'idResponsable' => $manager->id
        ]);

        Salle::create([
            'nom' => 'Salle de Réunion B',
            'type' => 'Réunion',
            'capacite' => 15,
            'equipements' => ['Écran', 'Système de visioconférence', 'WiFi'],
            'localisation' => 'Bâtiment B, 2ème étage',
            'idResponsable' => $manager->id
        ]);

        Salle::create([
            'nom' => 'Laboratoire C',
            'type' => 'Laboratoire',
            'capacite' => 20,
            'equipements' => ['Ordinateurs', 'Imprimante 3D', 'WiFi'],
            'localisation' => 'Bâtiment C, Rez-de-chaussée',
            'idResponsable' => $manager->id
        ]);
    }
} 