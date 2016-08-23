Write-Host "Executing build"
& msbuild /m /t:Rebuild /p:Configuration=Release /v:q /nologo
Write-Host ""

Write-Host "Calculating version"
new-item .\.tools -type directory -force | out-null
nuget install GitVersion.CommandLine -ExcludeVersion -NonInteractive -Prerelease -OutputDirectory .\.tools

$str = .\.tools\GitVersion.CommandLine\tools\GitVersion.exe | out-string
$json = ConvertFrom-Json $str
$version = $json.NuGetVersionV2
Write-Host  "Version: $version" -ForegroundColor Gray
Write-Host ""

Write-Host "Building packages"
new-item .\.nuget\packages\obj -type directory -force | out-null

get-childitem *.nuspec -Recurse -file |
    where { $_.FullName -notmatch '\\packages\\' } |
    where { $path = (Join-Path -Path $_.DirectoryName -ChildPath ($_.BaseName+".csproj")); Test-Path $path } |
    foreach { nuget pack (Join-Path -Path $_.DirectoryName -ChildPath ($_.BaseName+".nuspec")) -Verbose -version $version -o .\.nuget\packages\obj }