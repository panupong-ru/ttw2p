#!/bin/sh
set -e

echo "🚀 Starting application..."

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
max_attempts=30
attempt=0
while [ $attempt -lt $max_attempts ]; do
  if echo "SELECT 1" | npx prisma db execute --stdin > /dev/null 2>&1; then
    echo "✅ Database is ready!"
    break
  fi
  attempt=$((attempt + 1))
  echo "Waiting for database... ($attempt/$max_attempts)"
  sleep 2
done

if [ $attempt -eq $max_attempts ]; then
  echo "⚠️  Database connection timeout, but continuing..."
fi

# Run migrations
echo "📦 Running database migrations..."
# Check if migrations are needed by checking if tables exist
TABLE_CHECK=$(echo "SHOW TABLES LIKE 'UserLogIn'" | npx prisma db execute --stdin 2>/dev/null | grep -q "UserLogIn" && echo "exists" || echo "not_exists")
if [ "$TABLE_CHECK" != "exists" ]; then
  echo "📋 Tables not found, running migrations..."
  # Try Prisma migrate first
  npx prisma migrate deploy 2>/dev/null || {
    echo "⚠️  Prisma migration failed, migrations should be run from host machine"
    echo "💡 Run: docker-compose exec app npx prisma migrate deploy"
  }
else
  echo "✅ Database tables already exist"
fi

# Seed database (optional, won't fail if already seeded)
echo "🌱 Seeding database..."
npx prisma db seed || {
  echo "ℹ️  Seeding skipped (might already be seeded or not configured)"
}

# Start the application
echo "🎉 Starting Next.js application..."
exec node server.js

