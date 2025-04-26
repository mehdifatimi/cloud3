<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('equipements', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->timestamps();
        });

        // Table pivot pour la relation many-to-many entre salles et équipements
        Schema::create('salle_equipement', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('salle_id');
            $table->unsignedBigInteger('equipement_id');
            $table->timestamps();

            $table->foreign('salle_id')->references('id')->on('salles')->onDelete('cascade');
            $table->foreign('equipement_id')->references('id')->on('equipements')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('salle_equipement');
        Schema::dropIfExists('equipements');
    }
}; 