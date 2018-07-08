#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

# Update package list
apt-get update
apt-get -y upgrade

# Install Heroku CLI
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
