<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Models;

use Illuminate\Database\Eloquent\Model;

final class Subscription extends Model
{
    protected $table = 'subscriptions';
    protected $fillable = ['user_id', 'plan_id', 'start_date', 'end_date', 'status', 'auto_renew'];
    protected function casts(): array { return ['start_date' => 'datetime', 'end_date' => 'datetime', 'auto_renew' => 'boolean']; }
}
