# ------------------------------
# Stage 1: Node Build
# ------------------------------
FROM node:20-alpine AS node-builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ------------------------------
# Stage 2: PHP-FPM
# ------------------------------
FROM php:8.2-fpm-alpine

RUN apk add --no-cache \
    bash \
    git \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    zip \
    unzip \
    oniguruma-dev \
    libxml2-dev \
    icu-dev \
    mysql-client

RUN docker-php-ext-install pdo pdo_sqlite mbstring exif pcntl bcmath gd intl

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

# Copy built frontend assets
COPY --from=node-builder /app/public/build /var/www/public/build

RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www
RUN chmod -R 775 storage bootstrap/cache

USER www-data

CMD ["php-fpm"]
