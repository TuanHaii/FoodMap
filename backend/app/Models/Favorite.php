<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Favorite extends Model { public $timestamps = false; protected $guarded = []; protected $casts = ['created_at' => 'datetime']; public function user() { return $this->belongsTo(User::class); } public function restaurant() { return $this->belongsTo(Restaurant::class); } }
