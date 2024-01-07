<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recenzija extends Model
{
    use HasFactory;

    protected $table = 'recenzije';

    protected $fillable = [
        'vrstaRecenzije',
        'komentarUzRecenziju', 
        'user_id',
        'objekat_id', 
    ];
}
