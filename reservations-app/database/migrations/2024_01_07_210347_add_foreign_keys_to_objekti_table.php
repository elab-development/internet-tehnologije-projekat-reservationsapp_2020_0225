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
        Schema::table('objekti', function (Blueprint $table) {
            $table->foreignId('user_created_id')->nullable()->references('id')->on('users')->onDelete('set null');
            $table->foreignId('user_reserved_id')->nullable()->references('id')->on('users')->onDelete('set null');
            $table->foreignId('tip_objekta_id')->nullable()->references('id')->on('tipovi_objekata')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('objekti', function (Blueprint $table) {
            $table->dropForeign('user_created_id');
            $table->dropForeign('user_reserved_id');
            $table->dropForeign('tip_objekta_id');
        });
    }
};
