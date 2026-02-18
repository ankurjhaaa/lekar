<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $guarded = [];
    protected $casts = ['meta' => 'array'];
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
