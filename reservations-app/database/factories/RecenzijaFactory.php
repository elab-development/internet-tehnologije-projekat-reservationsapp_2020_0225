<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;
use App\Models\Objekat;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recenzija>
 */
class RecenzijaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $brojZvezdica = $this->faker->numberBetween($min = 0, $max = 5);
        $stars = str_repeat('⭐', $brojZvezdica);
        
        return [
            'vrstaRecenzije' => $this->faker->randomElement($array= 
            array('Pozitivna','Negativna')), 
            'komentarUzRecenziju' => $this->faker->sentence(),
            'brojZvezdica' => $stars,
            'user_id' => User::factory(), 
            'objekat_id' => Objekat::factory(), 
        ];
    }
}
