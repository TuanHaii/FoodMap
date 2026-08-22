<?php

declare(strict_types=1);

namespace App\Infrastructure\Persistence\Repositories;

use App\Domain\Restaurant\Repositories\RestaurantRepositoryInterface;

/** TODO: implement PostGIS querying only after the repository contract is approved. */
final class EloquentRestaurantRepository implements RestaurantRepositoryInterface {}
