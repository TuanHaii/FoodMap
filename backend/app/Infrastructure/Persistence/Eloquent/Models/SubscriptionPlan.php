<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Models;

use Illuminate\Database\Eloquent\Model;

final class SubscriptionPlan extends Model
{
    protected $table = 'subscription_plans';
    protected $fillable = ['name', 'description', 'price', 'currency', 'duration_days', 'features', 'is_active'];
    protected function casts(): array { return ['price' => 'decimal:2', 'features' => 'array', 'is_active' => 'boolean']; }
}
