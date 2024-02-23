<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;
use App\Models\TipObjekta;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Objekat>
 */
class ObjekatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv' => $this->faker->word().' '.$this->faker->word(), 
            'opis' => $this->faker->sentence(),
            'grad' => $this->faker->city(),
            'adresa' => $this->faker->streetAddress(),
            'brojRecenzija' => $this->faker->numberBetween($min = 0, $max = 5),
            'user_created_id' => User::factory(), 
            'user_reserved_id' => User::factory(),   
            'tip_objekta_id' => TipObjekta::factory(), 
        ];
    }
}
