<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\Auth\RegisterController as AuthRegisterController;
use App\Http\Controllers\CompleteTaskController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\V1\TaskController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/user', function () {
    return Auth::user();
})->middleware('auth:sanctum');


Route::prefix('auth')->group(function () {
    Route::post("/register", [RegisterController::class, 'store']);
    Route::post("/login", SessionController::class);
    Route::delete("/logout", [RegisterController::class, 'destroy']);
});

Route::prefix('/v1')->group(function () {
    Route::apiResource('/tasks', TaskController::class);
    Route::put("/tasks/{task}/complete", CompleteTaskController::class);
});

// Route::prefix('auth')->group(function () {
//     Route::post("/register", AuthRegisterController::class);
//     Route::post("/login", LoginController::class);
//     Route::post("/logout", LogoutController::class);
// });
