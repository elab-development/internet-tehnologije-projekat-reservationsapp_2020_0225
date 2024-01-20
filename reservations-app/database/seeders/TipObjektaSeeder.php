<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\TipObjekta;
use App\Models\Objekat;

class TipObjektaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        // Create TipObjekat instances
        $tipObjekti = TipObjekta::limit(5)->get();


        // Update brojObjekataKojiSuTrenutnoOvogTipa for each TipObjekat
        foreach ($tipObjekti as $tipObjekat) {
            $countObjekata = Objekat::where('tip_objekta_id', $tipObjekat->id)->count();
            
            // Update the field in the TipObjekat instance
            $tipObjekat->update(['brojObjekataKojiSuTrenutnoOvogTipa' => $countObjekata]);
        }
    }
}
