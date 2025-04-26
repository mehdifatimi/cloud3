<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('salles', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('type');
            $table->integer('capacite');
            $table->json('equipements')->nullable();
            $table->string('localisation');
            $table->unsignedBigInteger('idResponsable')->nullable();
            $table->timestamps();

            $table->foreign('idResponsable')->references('id')->on('users')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('salles');
    }
}; 