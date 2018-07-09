#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

# Update Package List
apt-get update
apt-get -y upgrade

# Force Locale
echo "LC_ALL=en_US.UTF-8" >> /etc/default/locale
locale-gen en_US.UTF-8

# Install Some Basic Packages
apt-get install -y software-properties-common curl

curl -s https://packagecloud.io/gpg.key | apt-key add -
echo "deb http://packages.blackfire.io/debian any main" | tee /etc/apt/sources.list.d/blackfire.list

curl --silent --location https://deb.nodesource.com/setup_8.x | bash -

# Update Package Lists
apt-get update

apt-get install -y build-essential dos2unix gcc git libmcrypt4 libpcre3-dev libpng-dev ntp unzip \
make python2.7-dev python-pip re2c supervisor unattended-upgrades whois vim libnotify-bin \
pv cifs-utils mcrypt bash-completion zsh

# Set My Timezone
ln -sf /usr/share/zoneinfo/UTC /etc/localtime

# Upgrade check
apt-get -y upgrade

# Enable Swap Memory
sudo bash /scripts/bash/enable-swap-memory.sh
