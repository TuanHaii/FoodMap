<?php

declare(strict_types=1);

namespace App\Providers;

use App\Application\Media\Ports\StorageServiceInterface;
use App\Application\Shared\Ports\CacheServiceInterface;
use App\Domain\Media\Repositories\MediaRepositoryInterface;
use App\Domain\Restaurant\Repositories\RestaurantRepositoryInterface;
use App\Domain\Review\Repositories\ReviewRepositoryInterface;
use App\Domain\User\Repositories\UserRepositoryInterface;
use App\Infrastructure\Cache\RedisCacheService;
use App\Infrastructure\Persistence\Repositories\{EloquentMediaRepository, EloquentRestaurantRepository, EloquentReviewRepository, EloquentUserRepository};
use App\Infrastructure\Storage\R2StorageService;
use Illuminate\Support\ServiceProvider;

final class DomainServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);
        $this->app->bind(RestaurantRepositoryInterface::class, EloquentRestaurantRepository::class);
        $this->app->bind(ReviewRepositoryInterface::class, EloquentReviewRepository::class);
        $this->app->bind(MediaRepositoryInterface::class, EloquentMediaRepository::class);
        $this->app->bind(StorageServiceInterface::class, R2StorageService::class);
        $this->app->bind(CacheServiceInterface::class, RedisCacheService::class);
    }
}
