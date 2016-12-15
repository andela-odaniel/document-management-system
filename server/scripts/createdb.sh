#!/bin/bash

psql -U postgres postgres -c "CREATE DATABASE dms WITH OWNER postgres TEMPLATE template0 ENCODING 'UTF8' TABLESPACE  pg_default LC_COLLATE  'C' LC_CTYPE  'C' CONNECTION LIMIT  -1"
psql -U postgres postgres -c "CREATE DATABASE dms_test WITH OWNER postgres TEMPLATE template0 ENCODING 'UTF8' TABLESPACE  pg_default LC_COLLATE  'C' LC_CTYPE  'C' CONNECTION LIMIT  -1"
