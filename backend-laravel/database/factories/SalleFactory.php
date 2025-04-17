<?php

namespace Database\Factories;

use App\Models\Salle;
use Illuminate\Database\Eloquent\Factories\Factory;

class SalleFactory extends Factory
{
    protected $model = Salle::class;

    public function definition()
    {
        $types = ['réunion', 'classe', 'terrain', 'bureau'];
        $equipements = ['projecteur', 'tableaux', 'chaises', 'tables'];
        
        return [
            'nom' => $this->faker->unique()->word,
            'type' => $this->faker->randomElement($types),
            'capacite' => $this->faker->numberBetween(10, 100),
            'equipements' => $this->faker->randomElements($equipements, $this->faker->numberBetween(1, 4)),
            'localisation' => $this->faker->address,
        ];
    }
} 