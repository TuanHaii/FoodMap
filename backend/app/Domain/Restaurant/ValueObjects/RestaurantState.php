<?php

declare(strict_types=1);

namespace App\Domain\Restaurant\ValueObjects;

enum RestaurantState: string { case DRAFT = 'DRAFT'; case PENDING_REVIEW = 'PENDING_REVIEW'; case PUBLISHED = 'PUBLISHED'; case REJECTED = 'REJECTED'; case SUSPENDED = 'SUSPENDED'; case ARCHIVED = 'ARCHIVED'; }
