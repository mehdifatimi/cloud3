<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Equipement;

class EquipementsSeeder extends Seeder
{
    public function run()
    {
        $equipements = [
            'Projecteur',
            'Tableau blanc',
            'WiFi',
            'Système audio',
            'Microphones',
            'Ordinateurs'
        ];

        foreach ($equipements as $equipement) {
            Equipement::create(['nom' => $equipement]);
        }
    }
} 