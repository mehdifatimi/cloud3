<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salle extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'type',
        'capacite',
        'equipements',
        'localisation',
        'idResponsable'
    ];

    protected $casts = [
        'equipements' => 'array'
    ];

    /**
     * Relation avec le responsable de la salle
     */
    public function responsable()
    {
        return $this->belongsTo(User::class, 'idResponsable');
    }

    /**
     * Relation avec les créneaux
     */
    public function creneaux()
    {
        return $this->hasMany(Creneau::class);
    }
} 