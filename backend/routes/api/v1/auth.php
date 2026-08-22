<?php

use Illuminate\Support\Facades\Route;

// TODO: map handlers to Application use cases; paths/methods match OpenAPI contract.
Route::post('/auth/register', static fn () => null);
Route::post('/auth/login', static fn () => null);
Route::post('/auth/refresh', static fn () => null);
Route::post('/auth/logout', static fn () => null);
Route::get('/user', static fn () => null);
Route::put('/user', static fn () => null);
