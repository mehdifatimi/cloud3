<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

use App\Models\Salle;

$salles = [
    [
        'nom' => 'Salle de Réunion A',
        'type' => 'Réunion',
        'capacite' => 20,
        'equipements' => ['Projecteur', 'Tableau blanc', 'WiFi'],
        'localisation' => 'Bâtiment A, 1er étage'
    ],
    [
        'nom' => 'Salle de Formation B',
        'type' => 'Formation',
        'capacite' => 30,
        'equipements' => ['Projecteur', 'Tableau blanc', 'WiFi', 'Ordinateurs'],
        'localisation' => 'Bâtiment B, 2ème étage'
    ],
    [
        'nom' => 'Salle de Conférence C',
        'type' => 'Conférence',
        'capacite' => 50,
        'equipements' => ['Projecteur', 'Tableau blanc', 'WiFi', 'Système audio', 'Microphones'],
        'localisation' => 'Bâtiment C, Rez-de-chaussée'
    ],
    [
        'nom' => 'Salle de Réunion D',
        'type' => 'Réunion',
        'capacite' => 15,
        'equipements' => ['Tableau blanc', 'WiFi'],
        'localisation' => 'Bâtiment D, 3ème étage'
    ],
    [
        'nom' => 'Salle de Formation E',
        'type' => 'Formation',
        'capacite' => 25,
        'equipements' => ['Projecteur', 'Tableau blanc', 'WiFi', 'Ordinateurs'],
        'localisation' => 'Bâtiment E, 1er étage'
    ]
];

$sallesCrees = 0;

foreach ($salles as $salle) {
    Salle::create($salle);
    $sallesCrees++;
}

echo "Création terminée ! $sallesCrees salles ont été créées.\n"; 