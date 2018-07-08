#!/usr/bin/env bash

# Clean Up
apt-get -y autoremove
apt-get -y clean
chown -R vagrant:vagrant /home/vagrant
