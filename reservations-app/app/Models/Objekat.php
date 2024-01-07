<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Objekat extends Model
{
    use HasFactory;

    protected $table = 'objekti';

    protected $fillable = [
        'naziv',
        'opis', 
        'grad',
        'adresa',
        'brojRecenzija',
        'user_id',
        'tip_objekta_id', 
    ];

    public function tipObjekta() {
        return $this->belongsTo(TipObjekta::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
    
    public function recenzije() {
        return $this->hasMany(Recenzija::class);
    }
}
