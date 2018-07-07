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

# Set Configuration PHP CGI for IIS
If ((Get-WindowsOptionalFeature -Online -FeatureName IIS-CGI).State -ne "Disabled") {
	# Set Fast CGI
    # Get-WebConfigurationProperty -Filter /system.webServer/fastCGI -Name collection | select fullPath
    Add-WebConfigurationProperty /system.webServer/fastCgi -Name collection -Value @{fullPath = "C:\PHP\php7.2\php-cgi.exe"; activityTimeout = 600; instanceMaxRequests = 10000}
    Add-WebConfigurationProperty /system.webServer/fastCgi -Name collection -Value @{fullPath = "C:\PHP\php7.1\php-cgi.exe"; activityTimeout = 600; instanceMaxRequests = 10000}
	Add-WebConfigurationProperty /system.webServer/fastCgi -Name collection -Value @{fullPath = "C:\PHP\php7.0\php-cgi.exe"; activityTimeout = 600; instanceMaxRequests = 10000}
    Add-WebConfigurationProperty /system.webServer/fastCgi -Name collection -Value @{fullPath = "C:\PHP\php5.6\php-cgi.exe"; activityTimeout = 600; instanceMaxRequests = 10000}

	# Set Handler Mapping based on Fast CGI module
	New-WebHandler -Name "PHP72_via_FastCGI" -Path "*.php" -Verb "*" -Modules "FastCgiModule" -ScriptProcessor "C:\PHP\php7.2\php-cgi.exe" -ResourceType Either
    New-WebHandler -Name "PHP71_via_FastCGI" -Path "*.php" -Verb "*" -Modules "FastCgiModule" -ScriptProcessor "C:\PHP\php7.1\php-cgi.exe" -ResourceType Either
    New-WebHandler -Name "PHP70_via_FastCGI" -Path "*.php" -Verb "*" -Modules "FastCgiModule" -ScriptProcessor "C:\PHP\php7.0\php-cgi.exe" -ResourceType Either
    New-WebHandler -Name "PHP56_via_FastCGI" -Path "*.php" -Verb "*" -Modules "FastCgiModule" -ScriptProcessor "C:\PHP\php5.6\php-cgi.exe" -ResourceType Either

	# Set Default Document (Default.php, index.php)
	Add-WebConfigurationProperty /system.webServer/defaultDocument -Name files -Value @{ value = "Default.php" }
    # Remove-WebConfigurationProperty /system.webServer/defaultDocument -Name files -AtElement @{ value = "Default.php" }
	Add-WebConfigurationProperty /system.webServer/defaultDocument -Name files -Value @{ value = "index.php" }
	# Remove-WebConfigurationProperty /system.webServer/defaultDocument -Name files -AtElement @{ value = "index.php" }

	# Setup sites with specific php version
	$Script = "<?php phpinfo(); ?>"
    $PathWWWRoot = (Get-ItemProperty HKLM:\Software\Microsoft\INetStp -Name "PathWWWRoot").PathWWWRoot

	New-Item -Path $PathWWWRoot -Name "phpinfo.php" -ItemType "file" -Value $Script

	# PHP 7.2
    New-Item -Path $PathWWWRoot -Name "php72" -ItemType "directory"
	New-Item -Path ($PathWWWRoot + "\php72") -Name "index.php" -ItemType "file" -Value $Script
    New-WebApplication -Name PHP72 -Site 'Default Web Site' -PhysicalPath ($PathWWWRoot + "\php72") -ApplicationPool DefaultAppPool


    # PHP 7.1
    New-Item -Path $PathWWWRoot -Name "php71" -ItemType "directory"
	New-Item -Path ($PathWWWRoot + "\php71") -Name "index.php" -ItemType "file" -Value $Script
    New-WebApplication -Name PHP71 -Site 'Default Web Site' -PhysicalPath ($PathWWWRoot + "\php71") -ApplicationPool DefaultAppPool

	# PHP 7.0
    New-Item -Path $PathWWWRoot -Name "php70" -ItemType "directory"
	New-Item -Path ($PathWWWRoot + "\php70") -Name "index.php" -ItemType "file" -Value $Script
    New-WebApplication -Name PHP70 -Site 'Default Web Site' -PhysicalPath ($PathWWWRoot + "\php70") -ApplicationPool DefaultAppPool

    # PHP 5.6
    New-Item -Path $PathWWWRoot -Name "php56" -ItemType "directory"
	New-Item -Path ($PathWWWRoot + "\php56") -Name "index.php" -ItemType "file" -Value $Script
    New-WebApplication -Name PHP56 -Site 'Default Web Site' -PhysicalPath ($PathWWWRoot + "\php56") -ApplicationPool DefaultAppPool

    # Restart Services
	Invoke-Expression -Command "IISRESET"
    Get-Service W3SVC | Start-Service
}
