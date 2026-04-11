const fs = require('fs');
const path = require('path');

// 1. CONFIGURATION
const BASE_URL = 'https://brightlane.github.io/TurboRefundExpress/';
const OUTPUT_FILE = 'sitemap.xml';

// 2. THE REPAIR FUNCTION (Ensures XML compatibility)
function makeUrlSafe(filename) {
    return filename
        .replace(/&/g, '&amp;')   // Fixes the "xmlParseEntityRef" error
        .replace(/ /g, '%20')     // Encodes spaces for browsers
        .replace(/'/g, '&apos;')
        .replace(/"/g, '&quot;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;');
}

// 3. SCANNING YOUR CONTENT
// This grabs every .html file you generated, excluding the index and the sitemap itself
const files = fs.readdirSync('./').filter(file => 
    file.endsWith('.html') && 
    file !== 'index.html' && 
    file !== '404.html' &&
    !file.includes('sitemap')
);

// 4. GENERATING THE XML STRUCTURE
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Homepage
xml += `  <url>\n    <loc>${BASE_URL}</loc>\n    <priority>1.0</priority>\n  </url>\n`;

// Add every generated page safely
files.forEach(file => {
    const safeLink = makeUrlSafe(file);
    xml += `  <url>\n    <loc>${BASE_URL}${safeLink}</loc>\n    <priority>0.8</priority>\n  </url>\n`;
});

xml += `</urlset>`;

// 5. FINAL WRITE
try {
    fs.writeFileSync(OUTPUT_FILE, xml);
    console.log(`✅ Success! Sitemap created with ${files.length + 1} links.`);
} catch (err) {
    console.error('❌ Error saving sitemap:', err);
}
