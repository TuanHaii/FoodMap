<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Models;

use Illuminate\Database\Eloquent\Model;

final class Restaurant extends Model
{
    protected $table = 'restaurants';
    protected $fillable = ['owner_id', 'name', 'description', 'address', 'ward_id', 'phone_number', 'email', 'website', 'location', 'avg_rating', 'review_count', 'is_verified', 'is_active', 'cover_image_url'];
    protected function casts(): array { return ['avg_rating' => 'decimal:1', 'is_verified' => 'boolean', 'is_active' => 'boolean']; }
}
