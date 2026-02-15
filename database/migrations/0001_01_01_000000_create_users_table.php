<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            // Basic
            $table->string('name')->nullable();
            $table->string('email')->nullable()->unique();
            $table->string('phone')->nullable()->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            // Role
            $table->enum('role', ['user', 'driver', 'admin'])->default('user');

            // Profile
            $table->string('profile_image')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();

            // Wallet (for user payments)
            $table->decimal('wallet_balance', 10, 2)->default(0);

            // App related
            $table->boolean('is_blocked')->default(false);
            $table->timestamp('last_login_at')->nullable();

            $table->rememberToken();
            $table->timestamps();
        });


        // 👉 Insert Default Users
        DB::table('users')->insert([
            [
                'name' => 'User One',
                'email' => 'user@gmail.com',
                'phone' => '9999999999',
                'password' => Hash::make('111111'),
                'role' => 'user',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Driver One',
                'email' => 'driver@gmail.com',
                'phone' => '8888888888',
                'password' => Hash::make('111111'),
                'role' => 'driver',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Driver two',
                'email' => 'driver2@gmail.com',
                'phone' => '6666666666',
                'password' => Hash::make('111111'),
                'role' => 'driver',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Admin User',
                'email' => 'admin@gmail.com',
                'phone' => '7777777777',
                'password' => Hash::make('111111'),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);


        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
