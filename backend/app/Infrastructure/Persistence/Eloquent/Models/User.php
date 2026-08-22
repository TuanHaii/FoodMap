<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Eloquent\Models;

use Illuminate\Database\Eloquent\Model;

/** DDL mapping only; relationships and behavior are deliberately deferred. */
final class User extends Model
{
    protected $table = 'users';
    protected $fillable = ['role_id', 'username', 'email', 'phone_number', 'password_hash', 'full_name', 'avatar_url', 'bio', 'is_active', 'last_login'];
    protected function casts(): array { return ['is_active' => 'boolean', 'last_login' => 'datetime']; }
}
