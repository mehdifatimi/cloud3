<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Salle;
use App\Models\Creneau;
use Carbon\Carbon;

class CreneauSeeder extends Seeder
{
    public function run()
    {
        // Récupérer toutes les salles
        $salles = Salle::all();

        // Pour chaque salle, créer des créneaux pour les 7 prochains jours
        foreach ($salles as $salle) {
            for ($jour = 0; $jour < 7; $jour++) {
                $date = Carbon::now()->addDays($jour);
                
                // Créneaux du matin (8h-12h)
                Creneau::create([
                    'salle_id' => $salle->id,
                    'date' => $date->format('Y-m-d'),
                    'heure_debut' => '08:00:00',
                    'heure_fin' => '12:00:00',
                    'disponible' => true
                ]);

                // Créneaux de l'après-midi (14h-18h)
                Creneau::create([
                    'salle_id' => $salle->id,
                    'date' => $date->format('Y-m-d'),
                    'heure_debut' => '14:00:00',
                    'heure_fin' => '18:00:00',
                    'disponible' => true
                ]);

                // Créneaux du soir (19h-22h)
                Creneau::create([
                    'salle_id' => $salle->id,
                    'date' => $date->format('Y-m-d'),
                    'heure_debut' => '19:00:00',
                    'heure_fin' => '22:00:00',
                    'disponible' => true
                ]);
            }
        }
    }
} 