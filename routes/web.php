<?php

use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});


// Route::post("/register", [RegisterController::class, 'store']);
// // Route::post("/login", [RegisterController::class, 'store']);
// Route::delete("/logout", [RegisterController::class, 'destroy']);

