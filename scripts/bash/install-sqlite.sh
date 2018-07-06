#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

# Update package list
apt-get update
apt-get -y upgrade

# Install SQLite
apt-get install -y sqlite3 libsqlite3-dev
