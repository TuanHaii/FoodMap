<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Dish extends Model { use SoftDeletes; protected $guarded = []; protected $casts = ['price' => 'decimal:2', 'is_available' => 'boolean']; public function restaurant() { return $this->belongsTo(Restaurant::class); } public function media() { return $this->hasMany(Media::class, 'owner_id')->where('owner_type', 'dish'); } }
