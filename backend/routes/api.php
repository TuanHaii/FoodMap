<?php
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\CheckInController;
use App\Http\Controllers\Api\V1\FavoriteController;
use App\Http\Controllers\Api\V1\MeController;
use App\Http\Controllers\Api\V1\RestaurantController;
use App\Http\Controllers\Api\V1\ReviewController;
use App\Http\Controllers\Api\HealthController;

use Illuminate\Support\Facades\Route;
Route::prefix('v1')->group(function () {
 Route::get('/health', HealthController::class);
 Route::post('auth/register',[AuthController::class,'register']); Route::post('auth/login',[AuthController::class,'login']);
 Route::get('categories',[CategoryController::class,'index']); Route::get('restaurants/search',[RestaurantController::class,'search']); Route::get('restaurants',[RestaurantController::class,'index']); Route::get('restaurants/{restaurant}',[RestaurantController::class,'show']); Route::get('restaurants/{restaurant}/reviews',[ReviewController::class,'index']);
 Route::middleware('auth:sanctum')->group(function () { Route::post('auth/logout',[AuthController::class,'logout']); Route::get('me',[MeController::class,'show']); Route::get('me/favorites',[MeController::class,'favorites']); Route::get('me/check-ins',[MeController::class,'checkIns']); Route::post('restaurants',[RestaurantController::class,'store']); Route::post('restaurants/{restaurant}/reviews',[ReviewController::class,'store']); Route::patch('reviews/{review}',[ReviewController::class,'update']); Route::delete('reviews/{review}',[ReviewController::class,'destroy']); Route::post('restaurants/{restaurant}/favorite',[FavoriteController::class,'store']); Route::delete('restaurants/{restaurant}/favorite',[FavoriteController::class,'destroy']); Route::post('restaurants/{restaurant}/check-ins',[CheckInController::class,'store']); });
});
