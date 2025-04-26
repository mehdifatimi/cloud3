<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TypeSalle;

class TypeSalleSeeder extends Seeder
{
    public function run()
    {
        $types = [
            'Formation',
            'Réunion',
            'Conférence',
            'Atelier',
            'Laboratoire',
            'Salle de réunion',
            'Salle de conférence',
            'Salle de formation',
            'Salle de projection',
            'Salle de réception'
        ];

        foreach ($types as $type) {
            TypeSalle::create(['nom' => $type]);
        }
    }
} 