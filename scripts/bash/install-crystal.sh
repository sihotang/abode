#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

# Update package list
apt-get update
apt-get -y upgrade

# Install Crystal Programming Language Support
apt-key adv --keyserver hkp://keys.gnupg.net:80 --recv-keys 09617FD37CC06B54
echo "deb https://dist.crystal-lang.org/apt crystal main" | tee /etc/apt/sources.list.d/crystal.list
apt-get update
apt-get install -y crystal libssl1.0-dev

# Install Lucky Framework for Crystal
wget https://github.com/luckyframework/lucky_cli/archive/v0.10.0-rc3.tar.gz
tar -zxvf v0.10.0-rc3.tar.gz
cd lucky_cli-0.10.0-rc3
crystal deps
crystal build src/lucky.cr --release --no-debug
mv lucky /usr/local/bin/.
cd /home/vagrant
rm -rf lucky_cli-0.10.0-rc3
rm -rf v0.10.0-rc3.tar.gz
