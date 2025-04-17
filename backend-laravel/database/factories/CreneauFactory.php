<?php

namespace Database\Factories;

use App\Models\Creneau;
use App\Models\Salle;
use Illuminate\Database\Eloquent\Factories\Factory;

class CreneauFactory extends Factory
{
    protected $model = Creneau::class;

    public function definition()
    {
        $heureDebut = $this->faker->dateTimeBetween('08:00', '18:00');
        $heureFin = (clone $heureDebut)->modify('+2 hours');

        return [
            'date' => $this->faker->dateTimeBetween('now', '+30 days'),
            'heure_debut' => $heureDebut->format('H:i:s'),
            'heure_fin' => $heureFin->format('H:i:s'),
            'disponible' => $this->faker->boolean(80),
        ];
    }

    public function forSalle(Salle $salle)
    {
        return $this->state(function (array $attributes) use ($salle) {
            return [
                'salle_id' => $salle->id,
            ];
        });
    }
} 