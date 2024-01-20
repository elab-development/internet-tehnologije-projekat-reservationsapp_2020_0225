<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Objekat;

class ObjekatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $userCreatedId = rand(2, 6);
            
            do {
                $userReservedId = rand(2, 6);
            } while ($userReservedId === $userCreatedId);

            Objekat::factory()->create([
                'user_created_id' => $userCreatedId,
                'user_reserved_id'=> $userReservedId,
            ]);
        }

        for ($i = 0; $i < 4; $i++) {
            $userCreatedId = rand(2, 6);
            
            do {
                $userReservedId = rand(2, 6);
            } while ($userReservedId === $userCreatedId);

            Objekat::factory()->create([
                'tip_objekta_id'=> 2,
                'naziv'=> 'Naziv1',
                'user_created_id' => $userCreatedId,
                'user_reserved_id'=> $userReservedId,
                'brojRecenzija'=> 0,
            ]);
        }

        for ($i = 0; $i < 4; $i++) {
            $userCreatedId = rand(2, 6);
            
            do {
                $userReservedId = rand(2, 6);
            } while ($userReservedId === $userCreatedId);

            Objekat::factory()->create([
                'tip_objekta_id'=> 3,
                'user_created_id' => $userCreatedId,
                'user_reserved_id'=> $userReservedId,
                'brojRecenzija'=> 0,
            ]);
        }
    }
}
