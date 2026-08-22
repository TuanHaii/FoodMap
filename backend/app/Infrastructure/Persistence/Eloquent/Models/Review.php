<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Models;

use Illuminate\Database\Eloquent\Model;

final class Review extends Model
{
    protected $table = 'reviews';
    protected $fillable = ['user_id', 'restaurant_id', 'rating', 'title', 'content', 'is_anonymous', 'is_edited'];
    protected function casts(): array { return ['is_anonymous' => 'boolean', 'is_edited' => 'boolean']; }
}
