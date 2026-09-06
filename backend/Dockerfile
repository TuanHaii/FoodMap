FROM composer:2 AS vendor

WORKDIR /app

COPY composer.json composer.lock artisan ./
COPY app ./app
COPY bootstrap ./bootstrap
COPY config ./config
COPY database ./database
COPY routes ./routes

RUN composer install \
    --no-dev \
    --no-interaction \
    --no-ansi \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader

FROM php:8.3-fpm-alpine AS runtime

WORKDIR /var/www/html

RUN apk add --no-cache \
        icu-libs \
        libpq \
        libzip \
        nginx \
        supervisor \
    && apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        icu-dev \
        libzip-dev \
        libpq-dev \
    && docker-php-ext-install -j$(nproc) \
        bcmath \
        intl \
        opcache \
        pdo_pgsql \
        zip \
    && apk del .build-deps \
    && rm -rf /var/cache/apk/* /tmp/*

COPY . .
COPY --from=vendor /app/vendor ./vendor

COPY docker/php/production.ini /usr/local/etc/php/conf.d/production.ini
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisord.conf

RUN mkdir -p \
        bootstrap/cache \
        storage/framework/cache/data \
        storage/framework/sessions \
        storage/framework/views \
        storage/logs \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 10000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
