<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipObjekta extends Model
{
    use HasFactory;

    protected $table = 'tipovi_objekata';

    protected $fillable = [
        'naziv',
        'brojObjekataKojiSuTrenutnoOvogTipa',  
    ];

    public function objekti() {
        return $this->hasMany(Objekat::class);
    }
}
