<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tipovi_objekata', function (Blueprint $table) {
            $table->id();
            $table->string('naziv',40);
            $table->integer('brojObjekataKojiSuTrenutnoOvogTipa');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipovi_objekata');
    }
};
