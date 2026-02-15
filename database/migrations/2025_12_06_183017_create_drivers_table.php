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
        Schema::create('drivers', function (Blueprint $table) {
            $table->id();

            // Relation
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // Application status
            $table->enum('application_status', [
                'draft',
                'submitted',
                'approved',
                'rejected'
            ])->default('draft');

            $table->text('reject_reason')->nullable();

            // Driver availability
            $table->enum('driver_status', ['offline', 'online', 'busy'])->default('offline');

            // KYC
            $table->string('aadhar_number')->nullable();
            $table->string('aadhar_front_image')->nullable();
            $table->string('aadhar_back_image')->nullable();

            $table->string('driving_license_number')->nullable();
            $table->string('driving_license_image')->nullable();

            // Vehicle
            $table->enum('vehicle_type', ['bike', 'auto', 'car'])->nullable();
            $table->string('vehicle_name')->nullable();
            $table->string('number_plate')->nullable();
            $table->string('vehicle_image')->nullable();

            // Live location
            $table->decimal('lat', 10, 7)->nullable();
            $table->decimal('lng', 10, 7)->nullable();

            // Performance
            $table->decimal('rating', 3, 2)->default(5.00);
            $table->integer('total_rides')->default(0);

            // Admin verification
            $table->boolean('is_verified')->default(false);
            $table->timestamp('verified_at')->nullable();

            $table->timestamps();
        });


        DB::table('drivers')->insert([
            [
                'user_id' => 2,
                'driver_status' => 'online',
                'lat' => 25.792330,
                'lng' => 87.466507,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 3,
                'driver_status' => 'online',
                'lat' => 25.784198,
                'lng' => 87.472478,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drivers');
    }
};
