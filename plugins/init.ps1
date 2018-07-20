$profilePath = Split-Path -parent $profile

New-Item $profilePath -ItemType Directory -Force -ErrorAction SilentlyContinue

Copy-Item -Path ./*.ps1 -Destination $profilePath -Exclude "init.ps1"

Remove-Variable profilePath
