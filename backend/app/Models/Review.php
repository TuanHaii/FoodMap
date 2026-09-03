<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Review extends Model { use SoftDeletes; protected $guarded = []; public function restaurant() { return $this->belongsTo(Restaurant::class); } public function user() { return $this->belongsTo(User::class); } public function media() { return $this->hasMany(Media::class, 'owner_id')->where('owner_type', 'review'); } }
