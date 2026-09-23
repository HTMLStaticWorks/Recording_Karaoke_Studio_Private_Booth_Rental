const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Auth Pages
    content = content.replace(/<button class="theme-toggle p-3 rounded-full glass-card hover:bg-white\/20 transition-colors shadow-lg text-primary">/g, 
        '<button class="theme-toggle w-12 h-12 flex items-center justify-center rounded-full glass-card hover:bg-white/20 transition-colors shadow-lg text-primary" aria-label="Toggle Theme">');
    content = content.replace(/<button class="rtl-toggle p-3 rounded-full glass-card hover:bg-white\/20 transition-colors shadow-lg text-primary text-sm font-bold" aria-label="Toggle RTL">/g,
        '<button class="rtl-toggle w-12 h-12 flex items-center justify-center rounded-full glass-card hover:bg-white/20 transition-colors shadow-lg text-primary text-sm font-bold" aria-label="Toggle RTL">');

    // 2. Public Pages
    content = content.replace(/<button class="theme-toggle p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"( aria-label="Toggle Theme")?>/g,
        '<button class="theme-toggle w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle Theme">');
    content = content.replace(/<button class="rtl-toggle p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xs font-bold"( aria-label="Toggle RTL")?>/g,
        '<button class="rtl-toggle w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xs font-bold" aria-label="Toggle RTL">');

    // 3. Dashboard Pages
    if (filePath.includes('dashboard')) {
        const dashboardTarget = `<div class="flex items-center justify-between mb-4 px-2">
                    <span class="text-sm font-medium">Dark Mode</span>
                    <button class="theme-toggle p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <i class="fa-solid fa-moon dark:hidden"></i>
                        <i class="fa-solid fa-sun hidden dark:block text-yellow-400"></i>
                    </button>
                </div>`;
        const dashboardReplacement = `<div class="flex items-center justify-between mb-4 px-2">
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
                </div>`;
        content = content.replace(dashboardTarget, dashboardReplacement);
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === 'dashboard') {
                walkDir(fullPath);
            }
        } else if (fullPath.endsWith('.html')) {
            replaceInFile(fullPath);
        }
    }
}

walkDir(__dirname);
console.log('Update complete.');
