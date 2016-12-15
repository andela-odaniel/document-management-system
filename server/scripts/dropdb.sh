#!/bin/bash

psql -U postgres postgres -c "DROP DATABASE IF EXISTS dms"
psql -U postgres postgres -c "DROP DATABASE IF EXISTS dms_test"
