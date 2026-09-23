const fs = require('fs');
const path = require('path');

const files = [
    'dashboard.html',
    'profile.html',
    'bookings.html',
    'songs.html',
    'addons.html',
    'payments.html'
];

const topBarHTML = `                <!-- Top Bar -->
                <div class="flex justify-end mb-6">
                    <div class="flex flex-row items-center gap-4 w-full md:w-auto justify-end">
                        <!-- Toggles -->
                        <div class="flex items-center gap-2">
                            <button class="theme-toggle w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-900 shadow-sm" aria-label="Toggle Theme">
                                <i class="fa-solid fa-moon dark:hidden"></i>
                                <i class="fa-solid fa-sun hidden dark:block text-yellow-400"></i>
                            </button>
                            <button class="rtl-toggle w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-gray-900 shadow-sm" aria-label="Toggle RTL">
                                <i class="fa-solid fa-arrow-right-arrow-left"></i>
                            </button>
                        </div>
                        
                        <!-- Profile -->
                        <div class="flex items-center gap-3 bg-white dark:bg-gray-900 p-2 pr-4 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
                            <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">JS</div>
                            <div class="hidden sm:block text-left">
                                <p class="text-sm font-bold leading-tight">John Singer</p>
                                <p class="text-xs text-gray-500 truncate max-w-[120px]">Premium Member</p>
                            </div>
                        </div>
                    </div>
                </div>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove existing Toggles and Profile
    // The structure might vary, let's remove the block containing it.
    // In dashboard.html:
    const regex1 = /<div class="flex items-center gap-6 bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 w-full md:w-auto">[\s\S]*?<!-- Profile -->[\s\S]*?<\/div>\s*<\/div>/g;
    
    // In bookings.html it's already extracted, we can just replace the whole Top Bar.
    const regex2 = /<div class="flex justify-end mb-6">[\s\S]*?<!-- Profile -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;

    let hasRemoved = false;
    
    if (regex2.test(content)) {
        content = content.replace(regex2, '');
        hasRemoved = true;
    } else if (regex1.test(content)) {
        content = content.replace(regex1, '');
        hasRemoved = true;
    } else {
        // Fallback for profile.html and others
        const regex3 = /<div class="flex items-center gap-6 bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 w-full md:w-auto">[\s\S]*?<!-- Profile -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
        if (regex3.test(content)) {
            content = content.replace(regex3, '</div>');
            hasRemoved = true;
        } else {
            const regex4 = /<div class="flex items-center gap-6 bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 w-full md:w-auto">[\s\S]*?<!-- Profile -->[\s\S]*?<\/div>\s*<\/div>/g;
            if (regex4.test(content)) {
                content = content.replace(regex4, '');
                hasRemoved = true;
            }
        }
    }

    // Now insert the topBarHTML right after <div class="p-6 md:p-10 ...">
    const insertPoint = /<div class="p-6 md:p-10[^>]*>/;
    content = content.replace(insertPoint, match => match + '\n' + topBarHTML + '\n');

    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
});
