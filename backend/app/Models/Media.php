<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Media extends Model { use SoftDeletes; protected $guarded = []; public function owner() { return $this->morphTo(__FUNCTION__, 'owner_type', 'owner_id'); } public function uploader() { return $this->belongsTo(User::class, 'uploaded_by'); } }
