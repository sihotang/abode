#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

# Update package list
apt-get update
apt-get -y upgrade

# Install wp-cli
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar
mv wp-cli.phar /usr/local/bin/wp
