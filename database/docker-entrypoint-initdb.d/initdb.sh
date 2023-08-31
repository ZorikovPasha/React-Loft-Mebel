#!/bin/bash

db=loft_furniture
username=postgres
password=postgres

echo "Creating user '$username' and database '$db'"
psql -U $POSTGRES_USER -c "create user $username with LOGIN CREATEROLE CREATEDB password '$password';"
psql -U $POSTGRES_USER -c "create database $db;"