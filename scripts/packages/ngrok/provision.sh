#!/usr/bin/env bash

export DEBIAN_FRONTEND=noninteractive

# Update package list
apt-get update
apt-get -y upgrade

# Install ngrok
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip -d /usr/local/bin
rm -rf ngrok-stable-linux-amd64.zip
