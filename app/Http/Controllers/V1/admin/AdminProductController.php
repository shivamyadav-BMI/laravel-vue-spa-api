<?php

namespace App\Http\Controllers\V1\admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class AdminProductController extends Controller
{

    public function getCategories()
    {
        $categories = Category::all();
        return response()->json([
            'categories' => $categories
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $page = $request->page ?? 1;
        $products = Product::latest()->paginate(5,['*'], 'page', $page);
        return response()->json([
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AdminProductRequest $request)
    {
        $attributes = $request->validated();
        dd($attributes);

        // for file upload
        if($request->hasFile('image'))
        {
            $file = $request->file('image');
            $imageName = time() . '_' . $file->getClientOriginalExtension();
            $file->move(storage_path("app/public/products", $imageName));
            $attributes['image'] = $imageName;
        }

        dd($request->file('image')->getClientOriginalExtension());

        Product::create($attributes);
        return response()->json([
            'message' => 'Product has been created'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
