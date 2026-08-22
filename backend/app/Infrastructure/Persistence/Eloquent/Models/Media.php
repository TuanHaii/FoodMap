<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Models;

use Illuminate\Database\Eloquent\Model;

final class Media extends Model
{
    public const CREATED_AT = null;
    public const UPDATED_AT = null;
    protected $table = 'media';
    protected $fillable = ['user_id', 'restaurant_id', 'review_id', 'dish_id', 'media_type', 'url', 'thumbnail_url', 'description', 'uploaded_at'];
    protected function casts(): array { return ['uploaded_at' => 'datetime']; }
}
