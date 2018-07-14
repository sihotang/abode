#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

# Update package list
apt-get update
apt-get -y upgrade

# Install Golang
golangVersion="1.10.3"
wget https://dl.google.com/go/go${golangVersion}.linux-amd64.tar.gz -O golang.tar.gz
tar -C /usr/local -xzf golang.tar.gz
printf "\nPATH=\"/usr/local/go/bin:\$PATH\"\n" | tee -a /home/vagrant/.profile
rm -rf golang.tar.gz
