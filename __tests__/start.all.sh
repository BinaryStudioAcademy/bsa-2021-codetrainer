#!/bin/bash

echo "PORT=5000
APP_URL=http://localhost:5000
TYPEORM_CONNECTION=postgres
TYPEORM_USERNAME=postgres
TYPEORM_PASSWORD=postgres
TYPEORM_PORT=5432
TYPEORM_SYNCHRONIZE=true
TYPEORM_LOGGING=true
TYPEORM_ENTITIES=src/data/models/**/*.ts
TYPEORM_MIGRATIONS=src/data/migrations/**/*.ts
TYPEORM_MIGRATIONS_DIR=src/data/migrations
TYPEORM_ENTITIES_DIR=src/data/models
TYPEORM_SSL=false
SECRET_KEY=secretkeysecretkeysecretkey
COOKIE_SECRET=secretkeysecretkeysecretkey

EMAIL_ADDRESS=fake
EMAIL_PASSWORD=fake

AWS_IMAGES_BUCKET_NAME=fake
AWS_IMAGES_BUCKET_REGION=fake
AWS_IMAGES_ACCESS_KEY=fake
AWS_IMAGES_SECRET_KEY=fake

GITHUB_CLIENT_ID=fake
GITHUB_SECRET=fake
GITHUB_CALLBACK=http://localhost:5000/api/auth/github/callback
AMQP_URL=amqp://rabbitmq
AMQP_QUEUE=codetrainer "> server/.env

#Build Backend
docker build -t backend -f ./__tests__/docker/Backend.Dockerfile .

docker-compose -f ./__tests__/docker-compose.tests.yml up -d

#Wait for server
bash ./__tests__/scripts/wait.sh

#Run Tests
cd __tests__ && npm run test
