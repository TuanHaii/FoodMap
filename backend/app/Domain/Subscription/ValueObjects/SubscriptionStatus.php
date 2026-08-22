<?php

declare(strict_types=1);

namespace App\Domain\Subscription\ValueObjects;

/** Source B2B state machine; TODO: reconcile with subscription_status_enum in DDL. */
enum SubscriptionStatus: string { case TRIALING = 'TRIALING'; case ACTIVE = 'ACTIVE'; case PAST_DUE = 'PAST_DUE'; case CANCELED = 'CANCELED'; case EXPIRED = 'EXPIRED'; case PAUSED = 'PAUSED'; }
