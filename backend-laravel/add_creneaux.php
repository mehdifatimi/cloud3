<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

use App\Models\Salle;
use App\Models\Creneau;
use Carbon\Carbon;

// Récupérer toutes les salles
$salles = Salle::all();

if ($salles->isEmpty()) {
    echo "Aucune salle trouvée. Veuillez d'abord créer des salles.\n";
    exit;
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

$creneauxCrees = 0;

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
            $creneauxCrees++;
        }
    }
}

echo "Création terminée ! $creneauxCrees créneaux ont été créés.\n"; 