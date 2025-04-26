<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeSalle extends Model
{
    use HasFactory;

    protected $table = 'types_salles';
    protected $fillable = ['nom'];

    public function salles()
    {
        return $this->hasMany(Salle::class);
    }
} 