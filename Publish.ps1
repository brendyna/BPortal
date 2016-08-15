Write-Host "Publishing packages"
new-item .\.nuget\packages -type directory -force | out-null

gci .\.nuget\packages\*.nupkg -File |
    foreach { nuget push $_.FullName -Source https://microsoft.pkgs.visualstudio.com/DefaultCollection/_packaging/WPT.WPS/nuget/v3/index.json -ApiKey WPT.WPS }