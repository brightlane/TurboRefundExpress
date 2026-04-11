const fs = require('fs');
const path = require('path');

// CONFIGURATION
const BASE_URL = 'https://brightlane.github.io/TurboRefundExpress/';
const OUTPUT_FILE = 'sitemap.xml'; // Always use .xml for Google

// 1. Function to make URLs safe for XML
function escapeXML(str) {
    return str.replace(/[<>&"']/g, (m) => {
        return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[m];
    });
}

// 2. Find all HTML files in the folder
const files = fs.readdirSync('./').filter(file => 
    file.endsWith('.html') && 
    file !== 'index.html' && 
    !file.includes('sitemap')
);

// 3. Build the XML structure
let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Add Homepage
xml += `  <url>\n    <loc>${BASE_URL}</loc>\n    <priority>1.0</priority>\n  </url>\n`;

// Add all generated pages
files.forEach(file => {
    // Replace spaces with %20 and escape & characters
    const safeFile = escapeXML(file.replace(/ /g, '%20'));
    xml += `  <url>\n    <loc>${BASE_URL}${safeFile}</loc>\n    <priority>0.8</priority>\n  </url>\n`;
});

xml += `</urlset>`;

// 4. Save the file
try {
    fs.writeFileSync(OUTPUT_FILE, xml);
    console.log(`✅ Success! ${OUTPUT_FILE} created with ${files.length + 1} URLs.`);
} catch (err) {
    console.error('❌ Error writing sitemap:', err);
}
