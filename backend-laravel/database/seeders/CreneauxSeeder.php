<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Salle;
use App\Models\Creneau;
use Carbon\Carbon;

class CreneauxSeeder extends Seeder
{
    public function run()
    {
        // Récupérer toutes les salles
        $salles = Salle::all();

        if ($salles->isEmpty()) {
            $this->command->info('Aucune salle trouvée. Veuillez d\'abord créer des salles.');
            return;
        }

        // Dates pour les créneaux (aujourd'hui et les 7 prochains jours)
        $dates = collect();
        for ($i = 0; $i < 7; $i++) {
            $dates->push(Carbon::today()->addDays($i));
        }

        // Heures de début et fin pour chaque jour
        $heures = [
            ['debut' => '09:00:00', 'fin' => '10:00:00'],
            ['debut' => '10:00:00', 'fin' => '11:00:00'],
            ['debut' => '11:00:00', 'fin' => '12:00:00'],
            ['debut' => '14:00:00', 'fin' => '15:00:00'],
            ['debut' => '15:00:00', 'fin' => '16:00:00'],
            ['debut' => '16:00:00', 'fin' => '17:00:00'],
        ];

        // Créer des créneaux pour chaque salle
        foreach ($salles as $salle) {
            foreach ($dates as $date) {
                foreach ($heures as $heure) {
                    Creneau::create([
                        'salle_id' => $salle->id,
                        'date' => $date,
                        'heure_debut' => $heure['debut'],
                        'heure_fin' => $heure['fin'],
                        'disponible' => true
                    ]);
                }
            }
        }

        $this->command->info('Créneaux créés avec succès !');
    }
} 