#!/bin/bash

if [ "$GM_DBURL" = "" ]; then
  echo "This script should only be ran from inside graphile-migrate";
  exit 1;
fi

export COMPOSE_PROJECT_NAME

# When ran inside docker-compose we need to be able to run a different pg_dump binary
echo "Dumping the schema to root/data/schema.sql ..."
${PG_DUMP:-pg_dump} \
  --no-sync \
  --schema-only \
  --no-owner \
  --exclude-schema=graphile_migrate \
  --exclude-schema=graphile_worker \
  --exclude-schema=graphile_scheduler \
  --file=../../data/schema.sql \
  "$GM_DBURL"


