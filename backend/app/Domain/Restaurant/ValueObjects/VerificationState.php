<?php

declare(strict_types=1);

namespace App\Domain\Restaurant\ValueObjects;

enum VerificationState: string { case UNVERIFIED = 'UNVERIFIED'; case VERIFIED = 'VERIFIED'; case BUSINESS_VERIFIED = 'BUSINESS_VERIFIED'; }
