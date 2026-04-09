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
  console.log('Sitemap generated successfully!\n');
  
  // Now extract and list the URLs from the generated sitemap
  extractUrlsFromSitemap(sitemapXml);
}

// Function to extract URLs from the sitemap and log them in an easy-to-read format
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

  // Display the URLs for easy access at the bottom of the code
  console.log('\nSitemap generated successfully!');
  console.log('URLs in sitemap.xml:\n');

  // Print each URL on a new line for easy copying
  urls.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
  });

  console.log('\nYou can copy and paste the URLs from above.');
}

// Call the function to generate the sitemap
generateSitemap();
<!-- Cross-Linking Section: Related Pages -->
<section id="cross-linking">
  <h3>Related Tax Filing Resources:</h3>
  <ul>
    <li><a href="TaxTurboXpress.html" title="Tax Turbo Express: Fast Tax Filing">Tax Turbo Express</a></li>
    <li><a href="TaxFileXpress.html" title="File Your Taxes Quickly with TaxFile Xpress">File Your Taxes Quickly</a></li>
    <li><a href="TurboTax.html" title="TurboTax Alternative for Easy Tax Filing">TurboTax Alternative</a></li>
    <li><a href="UsaTaxReturn.html" title="Complete Your USA Tax Return with Ease">USA Tax Return</a></li>
    <li><a href="taxturboOnline.html" title="TaxTurbo Online: File Taxes Now">TaxTurbo Online</a></li>
    <li><a href="TaxTurbo.html" title="Tax Turbo: Fast and Reliable Tax Filing">Tax Turbo</a></li>
    <li><a href="TaxTurbo-Online.html" title="Online Tax Filing Made Easy with TaxTurbo">Online Tax Filing</a></li>
    <li><a href="TaxTurboXpress.html" title="Fast Filing for Tax Returns with Turbo Express">Tax Turbo Express</a></li>
  </ul>
</section>
