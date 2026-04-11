const fs = require('fs');
const path = require('path');

// 1. CRITICAL CONFIG - The "Empire" Settings
const baseUrl = "https://brightlane.github.io/TurboRefundExpress";
const affiliateUrl = "https://www.linkconnector.com/ta.php?lc=007949061588005142";

// 2. DATA POOLS
const keywords = [
    "1040-nr-e-file", "fastest-tax-refund", "irs-refund-tracker", 
    "no-tax-on-tips", "overtime-tax-exemption", "seniors-6k-credit",
    "irs-e-file-partners", "online-tax-filing", "turbotax-alternative", "auto-loan-deduction"
];

const cities = [
    "New York", "London", "Dubai", "Singapore", "Sydney", "Mumbai", 
    "Manila", "Toronto", "Berlin", "Hong Kong", "Paris", "Tokyo",
    "Chicago", "Los Angeles", "Houston", "Phoenix", "Philadelphia",
    "San Antonio", "San Diego", "Dallas", "San Jose", "Austin"
];

// 3. THE GENERATOR ENGINE
async function generateEmpire() {
    const template = fs.readFileSync('index.html', 'utf8');
    let sitemapEntries = [];

    cities.forEach(city => {
        keywords.forEach(keyword => {
            const fileName = `${keyword}-${city.toLowerCase().replace(/ /g, '-')}.html`;
            const atid = `TRB_${keyword.replace(/-/g, '_')}_2026_${city.replace(/ /g, '_')}`;
            const fullAffiliateLink = `${affiliateUrl}&atid=${atid}`;
            
            // Personalize the content for the city
            let pageContent = template
                .replace(/index\.html/g, fileName)
                .replace(/https:\/\/www\.linkconnector\.com\/ta\.php\?lc=007949061588005142&atid=UsaTaxRefunds/g, fullAffiliateLink)
                .replace(/<div id="dynamic-content"><\/div>/, `
                    <div style="background:#fff5f5; border:1px solid #feb2b2; padding:15px; border-radius:8px; margin-bottom:20px;">
                        <h2 style="margin-top:0; color:#c53030; font-size:1.1rem;">Latest Update for ${city} Residents</h2>
                        <p style="margin:0; font-size:0.9rem;">IRS systems are currently processing high volumes for <strong>${keyword.replace(/-/g, ' ')}</strong>. Local filers in ${city} are encouraged to use e-file for direct deposit to avoid the 8-week paper check delay.</p>
                    </div>
                `);

            // Add the Calculator and Exit-Intent Scripts before </body>
            const scripts = `
                <script>
                function calculateRefund() {
                    const tips = parseFloat(document.getElementById('tips').value) || 0;
                    const ot = parseFloat(document.getElementById('overtime').value) || 0;
                    const senior = document.getElementById('isSenior').checked ? 6000 : 0;
                    const total = (tips * 0.12) + (ot * 0.15) + senior;
                    const res = document.getElementById('calc-result');
                    res.style.display = 'block';
                    res.innerHTML = 'Estimated 2026 OBBBA Savings: $' + total.toLocaleString() + '<br><small>Click "Start My Return" to finalize this claim.</small>';
                }
                
                // Exit Intent Cookie Drop
                let exitDropped = false;
                document.addEventListener('mouseleave', (e) => {
                    if (e.clientY < 0 && !exitDropped) {
                        const ifrm = document.createElement('iframe');
                        ifrm.src = '${fullAffiliateLink}&atid=EXIT_RECOVERY_${city.replace(/ /g, '_')}';
                        ifrm.style.display = 'none';
                        document.body.appendChild(ifrm);
                        exitDropped = true;
                    }
                });
                </script>
            `;
            
            pageContent = pageContent.replace('</body>', scripts + '</body>');

            fs.writeFileSync(fileName, pageContent);
            sitemapEntries.push(`${baseUrl}/${fileName}`);
        });
    });

    // 4. GENERATE SITEMAP
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(url => `  <url><loc>${url}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemapContent);
    console.log(`Successfully generated ${sitemapEntries.length} pages and updated sitemap.`);
}

generateEmpire();
