<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipement extends Model
{
    use HasFactory;

    protected $fillable = ['nom'];

    public function salles()
    {
        return $this->belongsToMany(Salle::class, 'salle_equipement');
    }
} 