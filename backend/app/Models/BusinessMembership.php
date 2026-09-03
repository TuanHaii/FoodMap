<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class BusinessMembership extends Model { public $timestamps = false; protected $guarded = []; protected $casts = ['verified_at' => 'datetime']; public function user() { return $this->belongsTo(User::class); } public function restaurant() { return $this->belongsTo(Restaurant::class); } }
