const fs = require('fs');
const path = require('path');
const { DOMParser } = require('xmldom'); // Add this line for DOMParser in Node.js

// Define the directory containing your HTML files
const rootDir = './'; // Project root directory
const urlBase = 'https://brightlane.github.io/TurboRefundExpress/'; // Replace with your actual domain

// Function to generate sitemap.xml content
function generateSitemap() {
  const files = fs.readdirSync(rootDir);
  const htmlFiles = files.filter(file => file.endsWith('.html')); // Get all HTML files
  const images = files.filter(file => file.endsWith('.png')); // Add other image types if needed

  // Start building the <urlset> part of the sitemap
  let urls = htmlFiles.map(file => {
    const url = urlBase + file;
    return `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    `;
  });

  // Add image URLs
  images.forEach(image => {
    const url = urlBase + image;
    urls.push(`
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.3</priority>
    </url>
    `);
  });

  // Wrap the URLs in the <urlset> tags
  const sitemapXml = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  // Write the generated sitemap to sitemap.xml
  fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemapXml);
  console.log('Sitemap generated successfully!');
  
  // Now extract and list the URLs from the generated sitemap
  extractUrlsFromSitemap(sitemapXml);
}

// Function to extract URLs from the sitemap and log them
function extractUrlsFromSitemap(sitemapXml) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(sitemapXml, 'application/xml');
  
  // Get all the <loc> elements from the <url> tags in the sitemap
  const urlElements = xmlDoc.getElementsByTagName('loc');
  const urls = [];

  // Loop through the <loc> elements and extract the URLs
  for (let i = 0; i < urlElements.length; i++) {
    urls.push(urlElements[i].textContent);
  }

  // Display the URLs for easy access
  console.log('URLs in sitemap.xml:');
  urls.forEach(url => console.log(url));
}

// Call the function to generate the sitemap
generateSitemap();
