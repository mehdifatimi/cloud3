<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Salle;
use App\Models\Equipement;
use Illuminate\Support\Facades\DB;

class SalleEquipementSeeder extends Seeder
{
    public function run()
    {
        // Récupérer toutes les salles et équipements
        $salles = Salle::all();
        $equipements = Equipement::all();

        // Pour chaque salle, associer 3 à 5 équipements aléatoires
        foreach ($salles as $salle) {
            // Sélectionner 3 à 5 équipements aléatoires
            $randomEquipements = $equipements->random(rand(3, 5));

            // Associer les équipements à la salle
            foreach ($randomEquipements as $equipement) {
                DB::table('salle_equipement')->insert([
                    'salle_id' => $salle->id,
                    'equipement_id' => $equipement->id,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
} 