<?php

namespace App\Http\Controllers\V1\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class AdminCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->page ?? 1;
        $categories = Category::latest()->paginate(5, ['*'], 'page', $page);
        return response()->json([
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|string'
        ]);

        Category::create([
            'name' =>  $request->name,
            'slug' => str()->slug($request->name)
        ]);

        return response()->json([
            'message' => 'Category has been created'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return response()->json([
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
         $request->validate([
            'name' => 'required|min:3|string'
        ]);

        $category->update([
            'name' =>  $request->name,
            'slug' => str()->slug($request->name)
        ]);

        return response()->json([
            'message' => 'Category has been updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([
            'message' => 'Category has been deleted'
        ]);
    }
}
