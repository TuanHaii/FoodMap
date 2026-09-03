<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller; use App\Http\Resources\CategoryResource; use App\Models\Category;
class CategoryController extends Controller { public function index() { return CategoryResource::collection(Category::with('children')->whereNull('parent_id')->orderBy('name')->get()); } }
