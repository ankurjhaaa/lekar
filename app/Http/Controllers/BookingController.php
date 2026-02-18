<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_type' => 'required|string',
            'pickup_location' => 'required|string',
            'drop_location' => 'required|string',
            'pickup_lat' => 'required|numeric',
            'pickup_lng' => 'required|numeric',
            'drop_lat' => 'required|numeric',
            'drop_lng' => 'required|numeric',
            'distance_km' => 'required|numeric',
            'duration_min' => 'required|numeric',
        ]);

        // Calculate Fare logic
        $multipliers = [
            'bike' => 10,
            'toto' => 15,
            'auto' => 18,
            'cab' => 25
        ];

        $type = $validated['vehicle_type'];
        $multiplier = $multipliers[$type] ?? 15;
        $fare = round($validated['distance_km'] * $multiplier);

        // Find Drivers
        $drivers = $this->findNearbyDrivers($validated['pickup_lat'], $validated['pickup_lng']);

        $booking = Booking::create([
            'user_id' => auth()->id() ?? 1,
            'vehicle_type' => $type,
            'pickup_location' => $validated['pickup_location'],
            'drop_location' => $validated['drop_location'],
            'pickup_lat' => $validated['pickup_lat'],
            'pickup_lng' => $validated['pickup_lng'],
            'drop_lat' => $validated['drop_lat'],
            'drop_lng' => $validated['drop_lng'],
            'distance_km' => $validated['distance_km'],
            'duration_min' => $validated['duration_min'],
            'fare_total' => $fare,
            'total_amount' => $fare,
            'status' => 'searching_driver',
            'otp_code' => rand(1000, 9999),
            'current_attempt' => 0,
            'drivers_queue' => json_encode($drivers->pluck('user_id'))
        ]);

        return to_route('findingDriver', ['id' => $booking->id]);
    }

    public function status(Request $request, $id)
    {
        $booking = Booking::with(['driver'])->find($id);
        if (!$booking)
            return response()->json(['error' => 'Not found'], 404);

        // Simulate Acceptance
        if ($booking->status === 'searching_driver') {
            $this->simulateDriverAcceptance($booking);
        }

        return response()->json([
            'status' => $booking->status,
            'otp' => $booking->otp_code,
            'driver' => $booking->driver,
            'nearby' => $this->findNearbyDrivers($booking->pickup_lat, $booking->pickup_lng)
        ]);
    }

    private function findNearbyDrivers($lat, $lng)
    {
        // Simple Box Search for compatibility
        $radius = 0.5; // ~50km to ensure we find someone for demo
        return Driver::with('user')
            ->whereBetween('lat', [$lat - $radius, $lat + $radius])
            ->whereBetween('lng', [$lng - $radius, $lng + $radius])
            ->where('driver_status', 'online')
            ->limit(10)
            ->get();
    }

    private function simulateDriverAcceptance(Booking $booking)
    {
        // If booking is older than 5 seconds, assign to first available driver
        if ($booking->created_at->diffInSeconds(now()) > 5) {
            $drivers = $this->findNearbyDrivers($booking->pickup_lat, $booking->pickup_lng);

            if ($drivers->isNotEmpty()) {
                $driver = $drivers->first();
                $booking->update([
                    'driver_id' => $driver->user_id, // Assign User ID of driver
                    'status' => 'driver_assigned'
                ]);
            } else {
                // Create mock driver for demo if none found
                // This ensures the demo always works
                try {
                    // Check if mock user exists
                    $mockUser = \App\Models\User::firstOrCreate(
                        ['email' => 'driver@demo.com'],
                        ['name' => 'Raju Driver', 'password' => bcrypt('password')]
                    );

                    // Check if mock driver exists
                    $mockDriver = Driver::firstOrCreate(
                        ['user_id' => $mockUser->id],
                        [
                            'lat' => $booking->pickup_lat + 0.001,
                            'lng' => $booking->pickup_lng + 0.001,
                            'driver_status' => 'online',
                            'vehicle_type' => $booking->vehicle_type,
                            'vehicle_name' => 'Splendor',
                            'number_plate' => 'DL-10-1234'
                        ]
                    );

                    $booking->update([
                        'driver_id' => $mockUser->id,
                        'status' => 'driver_assigned'
                    ]);

                } catch (\Exception $e) {
                    // Ignore
                }
            }
        }
    }
}
