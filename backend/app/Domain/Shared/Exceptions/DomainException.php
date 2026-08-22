<?php

declare(strict_types=1);

namespace App\Domain\Shared\Exceptions;

/** Base exception for domain invariants; it has no framework dependency. */
class DomainException extends \RuntimeException
{
}
