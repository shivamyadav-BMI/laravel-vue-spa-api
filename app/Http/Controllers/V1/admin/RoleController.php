<?php

namespace App\Http\Controllers\V1\admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::with('users')->latest()->paginate(2);
        return response()->json([
            'roles' => $roles
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'role' => 'required|min:3|string'
        ]);

        Auth::user()->role()->create($attributes);
        return response()->json([
            'message' => 'Role has been created.'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        return response()->json([
            'role' => $role
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $attributes = $request->validate([
            'role' => 'required|min:3|string'
        ]);

        Auth::user()->role()->update($attributes);
        return response()->json([
            'message' => 'Role has been created.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return response()->json([
            'message' => "Role has been deleted."
        ]);
    }
}
