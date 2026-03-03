param(
    [int]$Port = 8000,
    [switch]$NoBrowser
)

Set-Location -Path $PSScriptRoot
$py = "python"
$args = @()
if ($Port) { $args += "--port"; $args += $Port }
if ($NoBrowser) { $args += "--no-browser" }

& $py start_server.py @args
