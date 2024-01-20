<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Recenzija;
use App\Models\Objekat;

class RecenzijaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $objektiIDijevi = [1,2,3,4,5];

        foreach ($objektiIDijevi as $objekat_id) {
        $brojRecenzija = Objekat::find($objekat_id)->brojRecenzija;

        for ($i = 0; $i < $brojRecenzija; $i++) {
            Recenzija::factory()->create([
                'user_id' => rand(2, 6),
                'objekat_id' => $objekat_id,
            ]);
        }
        }
    }
}
