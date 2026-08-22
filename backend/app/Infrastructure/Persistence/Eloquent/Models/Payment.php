<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Models;

use Illuminate\Database\Eloquent\Model;

final class Payment extends Model
{
    protected $table = 'payments';
    protected $fillable = ['user_id', 'subscription_id', 'amount', 'currency', 'status', 'payment_method', 'transaction_id', 'paid_at'];
    protected function casts(): array { return ['amount' => 'decimal:2', 'paid_at' => 'datetime']; }
}
