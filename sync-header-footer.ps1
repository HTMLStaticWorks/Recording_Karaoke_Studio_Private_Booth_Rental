$rootDir = (Get-Location).Path
$indexPath = Join-Path $rootDir "index.html"

if (-Not (Test-Path $indexPath)) {
    Write-Error "index.html not found!"
    exit 1
}

$indexContent = [System.IO.File]::ReadAllText($indexPath)

$headerRegex = "(?is)<header[^>]*id=`"main-header`"[\s\S]*?</header>"
$headerRegexGeneric = "(?is)<header[\s\S]*?</header>"
$footerRegex = "(?is)<footer[\s\S]*?</footer>"

$headerHtml = $null
if ($indexContent -match $headerRegex) {
    $headerHtml = $matches[0]
} elseif ($indexContent -match $headerRegexGeneric) {
    $headerHtml = $matches[0]
}

$footerHtml = $null
if ($indexContent -match $footerRegex) {
    $footerHtml = $matches[0]
}

if (-Not $headerHtml -or -Not $footerHtml) {
    Write-Error "Could not find header or footer in index.html"
    exit 1
}

$targetFiles = @("home-2.html", "about.html", "packages.html", "events.html", "private-events.html", "contact.html", "book-room.html")
$updatedCount = 0

foreach ($file in $targetFiles) {
    $filePath = Join-Path $rootDir $file
    if (Test-Path $filePath) {
        $content = [System.IO.File]::ReadAllText($filePath)
        $changed = $false
        
        if ($content -match $headerRegexGeneric) {
            # In .NET regex replacement, $ needs to be escaped as $$
            $safeHeaderHtml = $headerHtml -replace '\$', '$$$$'
            $content = [System.Text.RegularExpressions.Regex]::Replace($content, $headerRegexGeneric, $safeHeaderHtml)
            $changed = $true
        }
        
        if ($content -match $footerRegex) {
            $safeFooterHtml = $footerHtml -replace '\$', '$$$$'
            $content = [System.Text.RegularExpressions.Regex]::Replace($content, $footerRegex, $safeFooterHtml)
            $changed = $true
        }
        
        if ($changed) {
            [System.IO.File]::WriteAllText($filePath, $content)
            Write-Output "Updated $file"
            $updatedCount++
        }
    }
}
Write-Output "Successfully updated $updatedCount files."
