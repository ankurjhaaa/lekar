<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        return Inertia::render('home');
    }

    public function about()
    {
        return inertia('About');
    }

    public function contact()
    {
        return inertia('Contact');
    }

    public function services()
    {
        return inertia('Services');
    }

    public function search()
    {
        return inertia('Search');
    }

    public function booking()
    {
        return inertia('Booking');
    }

    public function findingDriver(Request $request)
    {
        $id = $request->id;
        $booking = \App\Models\Booking::find($id);
        if (!$booking)
            return to_route('home');

        return inertia('FindingDriver', [
            'booking' => $booking
        ]);
    }
}
