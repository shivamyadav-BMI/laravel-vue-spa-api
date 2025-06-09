<?php

use App\Http\Controllers\CompleteTaskController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\V1\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});


Route::post("/register", [RegisterController::class, 'store']);
// Route::post("/login", [RegisterController::class, 'store']);
Route::delete("/logout", [RegisterController::class, 'destroy']);

Route::prefix('/v1')->group(function () {
Route::apiResource('/tasks', TaskController::class);
Route::put("/tasks/{task}/complete", CompleteTaskController::class);
});
