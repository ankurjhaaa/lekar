<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $guarded = [];
    protected $casts = [
        'route_geometry' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function driver()
    {
        return $this->belongsTo(User::class, 'driver_id');
    }
    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
