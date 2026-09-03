<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Restaurant extends Model {
    use SoftDeletes;
    protected $guarded = [];
    protected $casts = ['avg_rating' => 'decimal:2'];
    public function getRouteKeyName(): string { return 'slug'; }
    public function category() { return $this->belongsTo(Category::class); }
    public function submitter() { return $this->belongsTo(User::class, 'submitted_by'); }
    public function dishes() { return $this->hasMany(Dish::class); }
    public function reviews() { return $this->hasMany(Review::class); }
    public function favorites() { return $this->hasMany(Favorite::class); }
    public function checkIns() { return $this->hasMany(CheckIn::class); }
    public function media() { return $this->hasMany(Media::class, 'owner_id')->where('owner_type', 'restaurant'); }
}
