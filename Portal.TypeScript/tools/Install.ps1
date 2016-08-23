param($installPath, $toolsPath, $package, $project)

$src = "$installPath\content\*"
$dest = "$installPath\..\..\Web"

Copy-Item $src $dest -Recurse -Force