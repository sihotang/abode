#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

# Update package list
apt-get update
apt-get -y upgrade


# Install Composer
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/compose

# Add Composer Global Bin To Path
printf "\nPATH=\"$(sudo su - vagrant -c 'composer config -g home 2>/dev/null')/vendor/bin:\$PATH\"\n" | tee -a /home/vagrant/.profile
