<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->decimal('rate_per_km', 8, 2)->default(10.00);
            $table->decimal('minimum_fare', 8, 2)->default(50.00);
            $table->integer('advance_percent')->default(10);
            $table->timestamps();
        });
        \DB::table('settings')->insert([
            'rate_per_km' => 10.00,
            'minimum_fare' => 50.00,
            'advance_percent' => 10,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
