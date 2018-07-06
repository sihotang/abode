#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

# Update package list
apt-get update
apt-get -y upgrade

# Install Postgres
apt-get install -y postgresql-10

# Configure Postgres Remote Access
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/10/main/postgresql.conf
echo "host    all             all             10.0.2.2/32               md5" | tee -a /etc/postgresql/10/main/pg_hba.conf
sudo -u postgres psql -c "CREATE ROLE homestead LOGIN PASSWORD 'secret' SUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;"
sudo -u postgres /usr/bin/createdb --echo --owner=homestead homestead
service postgresql restart
