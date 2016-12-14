#!/bin/bash

psql -U postgres postgres -c "CREATE DATABASE dms WITH OWNER postgres TEMPLATE template0 ENCODING 'UTF8' TABLESPACE  pg_default LC_COLLATE  'C' LC_CTYPE  'C' CONNECTION LIMIT  -1"
<<<<<<< HEAD
=======

>>>>>>> 47fc1c896420f8927de2f1fc388e0a65228e4db9
psql -U postgres postgres -c "CREATE DATABASE dms_test WITH OWNER postgres TEMPLATE template0 ENCODING 'UTF8' TABLESPACE  pg_default LC_COLLATE  'C' LC_CTYPE  'C' CONNECTION LIMIT  -1"
