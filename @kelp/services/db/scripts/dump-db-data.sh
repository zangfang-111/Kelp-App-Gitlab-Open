#!/bin/bash

# get the root dir based on the git
root=$(git rev-parse --show-toplevel)

# https://gist.github.com/mihow/9c7f559807069a03e302605691f85572
set -o allexport; source $root/.env; set +o allexport


dataDir="$root/data/data"

fileName=$dataDir/$(date +%m-%d-%Y_%H-%M-%S).sql

echo "Dumping the data to $fileName ..."

pg_dump \
  --username=$DATABASE_OWNER \
  --password \
  --dbname=$DATABASE_NAME \
  --host=localhost \
  --port=5432 \
  --data-only \
  --no-owner \
  --exclude-schema=graphile_migrate \
  --exclude-schema=graphile_worker \
  --exclude-schema=graphile_scheduler \
  --file=$fileName

echo "Dump done!"
