<?php

declare(strict_types=1);

namespace App\Domain\Restaurant\Exceptions;

use App\Domain\Shared\Exceptions\DomainException;

final class DuplicateRestaurantException extends DomainException {}
