const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const indexContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');

// Extract header and footer from index.html
const headerRegex = /<header[^>]*id="main-header"[\s\S]*?<\/header>/i;
// Using a slightly more general regex in case other pages don't have id="main-header" but just <header>
const headerRegexGeneric = /<header[\s\S]*?<\/header>/i;
const footerRegex = /<footer[\s\S]*?<\/footer>/i;

const headerMatch = indexContent.match(headerRegex) || indexContent.match(headerRegexGeneric);
const footerMatch = indexContent.match(footerRegex);

if (!headerMatch || !footerMatch) {
    console.error("Could not find header or footer in index.html");
    process.exit(1);
}

const headerHtml = headerMatch[0];
const footerHtml = footerMatch[0];

// Files to update (excluding index.html itself, login, signup, and dashboard folder)
const targetFiles = [
    'home-2.html',
    'about.html',
    'packages.html',
    'events.html',
    'private-events.html',
    'contact.html',
    'book-room.html'
];

let updatedCount = 0;

targetFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        let changed = false;
        if (headerRegexGeneric.test(content)) {
            content = content.replace(headerRegexGeneric, headerHtml);
            changed = true;
        }
        if (footerRegex.test(content)) {
            content = content.replace(footerRegex, footerHtml);
            changed = true;
        }
        
        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
            updatedCount++;
        }
    }
});

console.log(`Successfully updated ${updatedCount} files.`);
