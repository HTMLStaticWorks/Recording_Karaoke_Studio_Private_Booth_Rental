$rootDir = (Get-Location).Path
$dashboardDir = Join-Path $rootDir "dashboard"

$targetFiles = @("index.html", "songs.html", "addons.html", "bookings.html", "payments.html", "profile.html")
$updatedCount = 0

$mobileRegex = '(?is)<div class="flex items-center gap-2">(\s*<div class="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">\s*<i class="fa-solid fa-microphone-lines[^>]*></i>\s*</div>\s*<span class="font-heading font-bold text-lg">Resonance</span>\s*)</div>'

$desktopRegex = '(?is)<div class="p-6 hidden lg:flex items-center gap-3 mb-2">(\s*<div class="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white">\s*<i class="fa-solid fa-microphone-lines[^>]*></i>\s*</div>\s*<span class="font-heading font-bold text-2xl tracking-tight">Resonance</span>\s*)</div>'

foreach ($file in $targetFiles) {
    $filePath = Join-Path $dashboardDir $file
    if (Test-Path $filePath) {
        $content = [System.IO.File]::ReadAllText($filePath)
        $changed = $false
        
        if ($content -match $mobileRegex) {
            $content = [System.Text.RegularExpressions.Regex]::Replace($content, $mobileRegex, '<a href="../index.html" class="flex items-center gap-2 hover:opacity-80 transition-opacity">$1</a>')
            $changed = $true
        }
        
        if ($content -match $desktopRegex) {
            $content = [System.Text.RegularExpressions.Regex]::Replace($content, $desktopRegex, '<a href="../index.html" class="p-6 hidden lg:flex items-center gap-3 mb-2 hover:opacity-80 transition-opacity">$1</a>')
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
