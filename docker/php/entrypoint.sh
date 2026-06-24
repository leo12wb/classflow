#!/bin/sh
set -e

echo "⏳ Aguardando banco de dados..."
until php artisan db:monitor --max=10 2>/dev/null; do
    sleep 2
done

echo "🔗 Criando link de storage..."
php artisan storage:link --force 2>/dev/null || true

echo "🗄️  Rodando migrations..."
php artisan migrate --force --no-interaction

echo "⚙️  Otimizando..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Pronto!"
exec "$@"
