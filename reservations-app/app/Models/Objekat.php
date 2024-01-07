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
}
