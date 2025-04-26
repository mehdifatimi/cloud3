<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Equipement;

class EquipementSeeder extends Seeder
{
    public function run()
    {
        $equipements = [
            'Projecteur',
            'Tableau blanc',
            'WiFi',
            'Système audio',
            'Microphones',
            'Ordinateurs',
            'Écran',
            'Système de visioconférence',
            'Imprimante 3D',
            'Climatisation',
            'Tableau interactif',
            'Système de sonorisation',
            'Caméra de surveillance',
            'Système de contrôle d\'accès',
            'Éclairage intelligent'
        ];

        foreach ($equipements as $equipement) {
            Equipement::create(['nom' => $equipement]);
        }
    }
} 