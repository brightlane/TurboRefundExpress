const fs = require('fs');

// REPAIR: Ensure the base URL is clean and the affiliate link is handled correctly
const baseUrl = "https://brightlane.github.io/TurboRefundExpress/"; 
const affiliateUrl = "https://www.linkconnector.com/ta.php?lc=007949061588005142";

const keywords = ["1040-nr-e-file", "fastest-tax-refund", "irs-refund-tracker", "no-tax-on-tips", "overtime-tax-exemption", "seniors-6k-credit", "irs-e-file-partners", "online-tax-filing", "turbotax-alternative", "auto-loan-deduction"];
const cities = ["New York", "London", "Dubai", "Singapore", "Sydney", "Mumbai", "Manila", "Toronto", "Berlin", "Hong Kong", "Paris", "Tokyo", "Chicago", "Los Angeles", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Seattle", "Miami", "Boston", "Atlanta", "Denver", "Bangkok", "Seoul"];

function build() {
    const template = fs.readFileSync('index.html', 'utf8');
    let sitemapLinks = [];

    cities.forEach(city => {
        keywords.forEach(keyword => {
            const fileName = `${keyword}-${city.toLowerCase().replace(/ /g, '-')}.html`;
            const atid = `TRB_${keyword.replace(/-/g, '_')}_2026_${city.replace(/ /g, '_')}`;
            const link = `${affiliateUrl}&atid=${atid}`;
            
            let html = template
                .replace(/index\.html/g, fileName)
                .replace(/https:\/\/www\.linkconnector\.com\/ta\.php\?lc=007949061588005142&atid=UsaTaxRefunds/g, link)
                .replace(/<div id="dynamic-content"><\/div>/, `
                    <div style="background:#fff5f5;border:1px solid #feb2b2;padding:15px;border-radius:8px;margin-bottom:20px;">
                        <h2 style="margin:0;color:#c53030;font-size:1.1rem;">${city} Priority Filing</h2>
                        <p style="margin:5px 0 0;font-size:0.9rem;">IRS systems are active for <strong>${keyword.replace(/-/g, ' ')}</strong> in ${city}. Claim your OBBBA tax credits before the deadline.</p>
                    </div>`);

            fs.writeFileSync(fileName, html);
            // Push clean URL to list
            sitemapLinks.push(`${baseUrl}${fileName}`);
        });
    });

    // BUILD SITEMAP - Formatted to be 100% XML compliant
    const xmlEntries = sitemapLinks.map(url => {
        // This is the critical repair: replacing '&' with '&amp;'
        const safeUrl = url.replace(/&/g, '&amp;').replace(/\s/g, '%20'); 
        return `  <url>\n    <loc>${safeUrl}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>`;
    }).join('\n');

    // Added the root home page to the start of the XML entries
    const fullXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <priority>1.0</priority>
  </url>
${xmlEntries}
</urlset>`;
    
    fs.writeFileSync('sitemap.xml', fullXml);
    console.log(`✅ Success: Generated ${sitemapLinks.length} pages and sitemap.xml`);
}

build();
