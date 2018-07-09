#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

# Update package list
apt-get update
apt-get -y upgrade

# Install Node & Packages: npm, gulp, bower, yarn, & grunt
apt-get install -y nodejs
/usr/bin/npm install -g npm
/usr/bin/npm install -g gulp-cli
/usr/bin/npm install -g bower
/usr/bin/npm install -g yarn
/usr/bin/npm install -g grunt-cli
