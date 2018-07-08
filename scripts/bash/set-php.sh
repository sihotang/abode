#!/usr/bin/env bash

sudo update-alternatives --set php /usr/bin/php$1
sudo update-alternatives --set php-config /usr/bin/php-config$1
sudo update-alternatives --set phpize /usr/bin/phpize$1
