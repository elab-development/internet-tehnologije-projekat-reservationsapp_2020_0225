<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TipObjekta>
 */
class TipObjektaFactory extends Factory
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
            'brojObjekataKojiSuTrenutnoOvogTipa' => $this->faker->numberBetween($min = 0, $max = 5),
        ];
    }
}
