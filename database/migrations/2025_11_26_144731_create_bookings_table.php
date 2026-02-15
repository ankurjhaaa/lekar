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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('driver_id')->nullable()->constrained('users')->nullOnDelete();

            // Locations
            $table->string('vehicle_type');
            $table->text('pickup_location');
            $table->text('drop_location');
            $table->decimal('pickup_lat', 10, 7)->nullable();
            $table->decimal('pickup_lng', 10, 7)->nullable();
            $table->decimal('drop_lat', 10, 7)->nullable();
            $table->decimal('drop_lng', 10, 7)->nullable();
            $table->integer('duration_min')->nullable();
            // 🔥 ROUTE LINE
            $table->json('route_geometry')->nullable();

            
            // Fare & Distance
            $table->decimal('distance_km', 8, 2)->nullable();
            $table->decimal('fare_total', 10, 2)->nullable();

            // Fare breakdown
            $table->decimal('base_fare', 10, 2)->nullable();
            $table->decimal('distance_fare', 10, 2)->nullable();
            $table->decimal('time_fare', 10, 2)->nullable();
            $table->decimal('surge_fare', 10, 2)->nullable();
            $table->decimal('platform_fee', 10, 2)->nullable();
            $table->decimal('tax_amount', 10, 2)->nullable();
            $table->decimal('total_amount', 10, 2)->nullable();

            // Assignment
            $table->integer('current_attempt')->default(0);
            $table->json('drivers_queue')->nullable();

            // OTP
            $table->string('otp_code', 6)->nullable();
            $table->boolean('otp_verified')->default(false);

            // Ride lifecycle
            $table->enum('status', [
                'searching_driver',
                'driver_assigned',
                'driver_enroute',
                'arrived_at_pickup',
                'otp_verified',
                'ride_started',
                'ride_completed',
                'canceled',
                'no_driver_available'
            ])->default('searching_driver');

            // Time tracking
            $table->timestamp('driver_reached_time')->nullable();
            $table->timestamp('pickup_time')->nullable();
            $table->timestamp('drop_time')->nullable();
            $table->timestamp('ride_start_time')->nullable();
            $table->timestamp('ride_end_time')->nullable();

            // Cancellation info
            $table->enum('canceled_by', ['user', 'driver'])->nullable();
            $table->string('cancel_reason')->nullable();

            // Payment
            $table->enum('payment_method', ['cash', 'wallet', 'online'])->default('cash');
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending');
            $table->string('transaction_id')->nullable();

            // Driver live location (optional)
            $table->decimal('current_driver_lat', 10, 7)->nullable();
            $table->decimal('current_driver_lng', 10, 7)->nullable();

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
