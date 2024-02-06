#!/bin/sh

# Wait for the database to be ready
echo "Waiting for the database to be ready..."
while ! nc -z db 5432; do
  sleep 1
done

echo "Database is up and running"

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Generate Prisma client
echo "Migrating tables..."
npx prisma migrate dev --name init

# Start the Node.js server
echo "Starting Node.js server..."
exec npm run start
