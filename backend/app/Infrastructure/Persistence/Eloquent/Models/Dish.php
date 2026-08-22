<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Models;

use Illuminate\Database\Eloquent\Model;

final class Dish extends Model
{
    protected $table = 'dishes';
    protected $fillable = ['restaurant_id', 'category_id', 'name', 'description', 'price', 'image_url', 'is_available'];
    protected function casts(): array { return ['price' => 'decimal:2', 'is_available' => 'boolean']; }
}
