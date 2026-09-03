<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller; use App\Http\Resources\RestaurantResource; use App\Http\Resources\UserResource; use App\Models\CheckIn; use App\Models\Favorite; use Illuminate\Http\Request;
class MeController extends Controller { public function show(Request $request) { return new UserResource($request->user()); } public function favorites(Request $request) { return RestaurantResource::collection($request->user()->favorites()->with(['restaurant.category','restaurant.media'])->get()->pluck('restaurant')->filter()->values()); } public function checkIns(Request $request) { return response()->json(['data'=>$request->user()->checkIns()->with('restaurant:id,name,slug')->latest('created_at')->paginate(12)->items()]); } }
