<?php
namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller; use App\Models\Favorite; use App\Models\Restaurant; use Illuminate\Http\Request;
class FavoriteController extends Controller { public function store(Request $request,Restaurant $restaurant) { abort_unless($restaurant->state==='PUBLISHED',404); Favorite::firstOrCreate(['user_id'=>$request->user()->id,'restaurant_id'=>$restaurant->id]); return response()->json(['data'=>['favorited'=>true]],201); } public function destroy(Request $request,Restaurant $restaurant) { Favorite::where('user_id',$request->user()->id)->where('restaurant_id',$restaurant->id)->delete(); return response()->noContent(); } }
