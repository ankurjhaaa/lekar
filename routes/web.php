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
});