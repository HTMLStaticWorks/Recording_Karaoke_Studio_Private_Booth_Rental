$files = Get-ChildItem -Path . -Filter "*.html" -Recurse
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    
    # Auth Pages
    $content = $content.Replace('<button class="theme-toggle p-3 rounded-full glass-card hover:bg-white/20 transition-colors shadow-lg text-primary">', '<button class="theme-toggle w-12 h-12 flex items-center justify-center rounded-full glass-card hover:bg-white/20 transition-colors shadow-lg text-primary" aria-label="Toggle Theme">')
    $content = $content.Replace('<button class="rtl-toggle p-3 rounded-full glass-card hover:bg-white/20 transition-colors shadow-lg text-primary text-sm font-bold" aria-label="Toggle RTL">', '<button class="rtl-toggle w-12 h-12 flex items-center justify-center rounded-full glass-card hover:bg-white/20 transition-colors shadow-lg text-primary text-sm font-bold" aria-label="Toggle RTL">')

    # Public Pages
    $content = $content -replace '<button class="theme-toggle p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"( aria-label="Toggle Theme")?>', '<button class="theme-toggle w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle Theme">'
    $content = $content -replace '<button class="rtl-toggle p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xs font-bold"( aria-label="Toggle RTL")?>', '<button class="rtl-toggle w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xs font-bold" aria-label="Toggle RTL">'

    Set-Content $f.FullName $content -NoNewline
}

$dashboardFiles = Get-ChildItem -Path .\dashboard -Filter "*.html" -Recurse
foreach ($f in $dashboardFiles) {
    $content = Get-Content $f.FullName -Raw
    
    $oldDash = '(?s)<div class="flex items-center justify-between mb-4 px-2">\s*<span class="text-sm font-medium">Dark Mode</span>\s*<button class="theme-toggle p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">\s*<i class="fa-solid fa-moon dark:hidden"></i>\s*<i class="fa-solid fa-sun hidden dark:block text-yellow-400"></i>\s*</button>\s*</div>'
    $newDash = '<div class="flex items-center justify-between mb-4 px-2">
                    <span class="text-sm font-medium">Preferences</span>
                    <div class="flex items-center gap-2">
                        <button class="theme-toggle w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle Theme">
                            <i class="fa-solid fa-moon dark:hidden"></i>
                            <i class="fa-solid fa-sun hidden dark:block text-yellow-400"></i>
                        </button>
                        <button class="rtl-toggle w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle RTL">
                            <i class="fa-solid fa-arrow-right-arrow-left"></i>
                        </button>
                    </div>
                </div>'
    $content = $content -replace $oldDash, $newDash

    Set-Content $f.FullName $content -NoNewline
}
