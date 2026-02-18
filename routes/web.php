<?php

use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(PublicController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/about', 'about')->name('about');
    Route::get('/contact', 'contact')->name('contact');
    Route::get('/services', 'services')->name('services');
    Route::get('/search', 'search')->name('search');
    Route::get('/booking', 'booking')->name('booking');
    Route::get('/finding-driver', 'findingDriver')->name('findingDriver');
    Route::get('/profile', function () {
        return Inertia::render('profile');
    })->name('profile');
    Route::get('/activity', function () {
        return Inertia::render('activity');
    })->name('activity');
    Route::get('/support', function () {
        return Inertia::render('support');
    })->name('support');
    Route::get('/parcel', function () {
        return Inertia::render('parcel');
    })->name('parcel');
    Route::get('/payment', function () {
        return Inertia::render('payment');
    })->name('payment');
    Route::get('/safety', function () {
        return Inertia::render('safety');
    })->name('safety');
    Route::get('/refer', function () {
        return Inertia::render('refer');
    })->name('refer');
    Route::get('/rewards', function () {
        return Inertia::render('rewards');
    })->name('rewards');
    Route::get('/pass', function () {
        return Inertia::render('pass');
    })->name('pass');
    Route::get('/coins', function () {
        return Inertia::render('coins');
    })->name('coins');
    Route::get('/oneway', function () {
        return Inertia::render('oneway');
    })->name('oneway');
});

Route::post('/book', [\App\Http\Controllers\BookingController::class, 'store'])->name('book');
Route::get('/booking/{id}/status', [\App\Http\Controllers\BookingController::class, 'status'])->name('booking.status');