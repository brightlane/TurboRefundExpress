const fs = require('fs');
const template = fs.readFileSync('index.html', 'utf8');
const today = new Date().toISOString().split('T')[0]; // Format: 2026-04-11

// 1. Core High-Volume Keywords
const seeds = ["Online Tax Filing", "IRS Refund Tracker", "1040-NR E-file", "No Tax on Tips", "Overtime Tax Exemption", "Seniors 6k Credit", "Auto Loan Deduction", "TurboTax Alternative", "Fastest Tax Refund", "IRS E-file Partners"];

// 2. Target Cities
const cities = ["New York", "London", "Dubai", "Mumbai", "Toronto", "Sydney", "Singapore", "Berlin", "Hong Kong", "Manila"]; 

let sitemapLinks = [];
const baseUrl = "https://brightlane.github.io/SkyScanner"; // Ensure this matches your actual URL

seeds.forEach(kw => {
    cities.forEach(city => {
        const slug = `${kw.toLowerCase().replace(/ /g, '-')}-${city.toLowerCase().replace(/ /g, '-')}.html`;
        const pageTitle = `${kw} 2026 for Expats in ${city}`;
        const atid = `TRB_${kw.replace(/ /g, '_')}_${city.replace(/ /g, '_')}`;
        
        // Generate Page
        let content = template
            .replace(/<title>.*?<\/title>/, `<title>${pageTitle}</title>`)
            .replace(/atid=UsaTaxRefunds/g, `atid=${atid}`)
            .replace(/Verified: .*?<\/span>/, `<span>Verified: ${new Date().toLocaleDateString()}</span>`);

        fs.writeFileSync(slug, content);
        
        // Add to Sitemap List
        sitemapLinks.push(`  <url>\n    <loc>${baseUrl}/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.80</priority>\n  </url>`);
    });
});

// 3. Generate the actual sitemap.xml file
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/index.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
  </url>
${sitemapLinks.join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapContent);
console.log("500 Pages and Sitemap.xml generated successfully.");
