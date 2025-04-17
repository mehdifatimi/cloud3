<?php

namespace Database\Seeders;

use App\Models\Salle;
use App\Models\Creneau;
use Illuminate\Database\Seeder;

class SalleSeeder extends Seeder
{
    public function run()
    {
        // Create 10 salles
        $salles = Salle::factory()->count(10)->create();

        // Create 5 creneaux for each salle
        foreach ($salles as $salle) {
            Creneau::factory()
                ->count(5)
                ->forSalle($salle)
                ->create();
        }
    }
} 