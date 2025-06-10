<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class SessionController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $attributes = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required'
        ]);

        if(!Auth::attempt($attributes))
        {
            throw ValidationException::withMessages([
                'email' => 'Provided credentials does not match our record.'
            ]);
        }

        return response()->json([
            'message' => 'Welcome back'
        ]);
    }
}
