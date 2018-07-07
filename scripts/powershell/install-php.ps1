# Install PHP Stuffs
# Current PHP (7.2)
choco install php --params '"/NonThreadSafe /DontAddToPath /InstallDir:C:\PHP\php7.2"' --version 7.2.7 -my

# PHP 7.1
choco install php --params '"/NonThreadSafe /DontAddToPath /InstallDir:C:\PHP\php7.1"' --version 7.1.19 -my

# PHP 7.0
choco install php --params '"/NonThreadSafe /DontAddToPath /InstallDir:C:\PHP\php7.0"' --version 7.0.30 -my

# PHP 5.6
choco install php --params '"/NonThreadSafe /DontAddToPath /InstallDir:C:\PHP\php5.6"' --version 5.6.36 -my

# Set Some PHP CLI Settings
(Get-Content -Path "C:\PHP\php7.2\php.ini") | ForEach-Object {$_ -Replace "error_reporting = .+", "error_reporting = E_ALL"} | Set-Content -Path "C:\PHP\php7.2\php.ini"
(Get-Content -Path "C:\PHP\php7.2\php.ini") | ForEach-Object {$_ -Replace "display_errors = .+", "display_errors = On"} | Set-Content -Path "C:\PHP\php7.2\php.ini"
(Get-Content -Path "C:\PHP\php7.2\php.ini") | ForEach-Object {$_ -Replace "memory_limit = .+", "memory_limit = 512M"} | Set-Content -Path "C:\PHP\php7.2\php.ini"
(Get-Content -Path "C:\PHP\php7.2\php.ini") | ForEach-Object {$_ -Replace ";date.timezone.+", "date.timezone = UTC"} | Set-Content -Path "C:\PHP\php7.2\php.ini"

(Get-Content -Path "C:\PHP\php7.1\php.ini") | ForEach-Object {$_ -Replace "error_reporting = .+", "error_reporting = E_ALL"} | Set-Content -Path "C:\PHP\php7.1\php.ini"
(Get-Content -Path "C:\PHP\php7.1\php.ini") | ForEach-Object {$_ -Replace "display_errors = .+", "display_errors = On"} | Set-Content -Path "C:\PHP\php7.1\php.ini"
(Get-Content -Path "C:\PHP\php7.1\php.ini") | ForEach-Object {$_ -Replace "memory_limit = .+", "memory_limit = 512M"} | Set-Content -Path "C:\PHP\php7.1\php.ini"
(Get-Content -Path "C:\PHP\php7.1\php.ini") | ForEach-Object {$_ -Replace ";date.timezone.+", "date.timezone = UTC"} | Set-Content -Path "C:\PHP\php7.1\php.ini"

(Get-Content -Path "C:\PHP\php7.0\php.ini") | ForEach-Object {$_ -Replace "error_reporting = .+", "error_reporting = E_ALL"} | Set-Content -Path "C:\PHP\php7.0\php.ini"
(Get-Content -Path "C:\PHP\php7.0\php.ini") | ForEach-Object {$_ -Replace "display_errors = .+", "display_errors = On"} | Set-Content -Path "C:\PHP\php7.0\php.ini"
(Get-Content -Path "C:\PHP\php7.0\php.ini") | ForEach-Object {$_ -Replace "memory_limit = .+", "memory_limit = 512M"} | Set-Content -Path "C:\PHP\php7.0\php.ini"
(Get-Content -Path "C:\PHP\php7.0\php.ini") | ForEach-Object {$_ -Replace ";date.timezone.+", "date.timezone = UTC"} | Set-Content -Path "C:\PHP\php7.0\php.ini"

(Get-Content -Path "C:\PHP\php5.6\php.ini") | ForEach-Object {$_ -Replace "error_reporting = .+", "error_reporting = E_ALL"} | Set-Content -Path "C:\PHP\php5.6\php.ini"
(Get-Content -Path "C:\PHP\php5.6\php.ini") | ForEach-Object {$_ -Replace "display_errors = .+", "display_errors = On"} | Set-Content -Path "C:\PHP\php5.6\php.ini"
(Get-Content -Path "C:\PHP\php5.6\php.ini") | ForEach-Object {$_ -Replace "memory_limit = .+", "memory_limit = 512M"} | Set-Content -Path "C:\PHP\php5.6\php.ini"
(Get-Content -Path "C:\PHP\php5.6\php.ini") | ForEach-Object {$_ -Replace ";date.timezone.+", "date.timezone = UTC"} | Set-Content -Path "C:\PHP\php5.6\php.ini"
