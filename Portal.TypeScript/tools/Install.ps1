Param(
    [Parameter(Mandatory=$true)] [string] $repoRoot
)

$src = "..\content\*"
$dest = "$repoRoot\Web"

Copy-Item $src $dest -Recurse