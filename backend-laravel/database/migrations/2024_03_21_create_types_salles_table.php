<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('types_salles', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->timestamps();
        });

        // Ajouter une colonne type_id à la table salles
        Schema::table('salles', function (Blueprint $table) {
            $table->foreignId('type_id')->nullable()->constrained('types_salles')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('salles', function (Blueprint $table) {
            $table->dropForeign(['type_id']);
            $table->dropColumn('type_id');
        });
        Schema::dropIfExists('types_salles');
    }
}; 