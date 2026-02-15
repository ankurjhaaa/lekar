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
        Schema::create('plans', function (Blueprint $table) {
            $table->id();

            // Basic
            $table->string('name');                 // Bike Monthly
            $table->string('vehicle_type');         // bike, auto, toto
            $table->decimal('price', 8, 2);         // 299, 399
            $table->integer('validity_days');       // 30

            // Features
            $table->text('features')->nullable();   // JSON / text

            // Controls
            $table->boolean('is_active')->default(true);
            $table->integer('max_daily_rides')->nullable(); // optional limit

            // Meta
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
