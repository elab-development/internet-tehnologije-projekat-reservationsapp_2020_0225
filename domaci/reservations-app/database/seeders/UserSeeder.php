<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Str;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name'=>"Administrator",
            'email'=>"admin@gmail.com",
            'password' =>  "admin",
            'jeAdmin' => true,
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name'=>"Milos Avramovski",
            'email'=>"miki123@gmail.com",
            'password' =>  "miki123",
            'jeMenadzerObjekata' => true,
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name'=>"Ana Cosic",
            'email'=>"ana33@gmail.com",
            'password' =>  "ana33",
            'jeMenadzerObjekata' => true,
            'remember_token' => Str::random(10),
        ]);

        User::factory()->times(3)->create();
    }
}
