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
        'brojZvezdica', 
        'user_id',
        'objekat_id', 
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function objekat() {
        return $this->belongsTo(Objekat::class);
    }
}
