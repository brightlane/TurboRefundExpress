const fs = require('fs');

// --- CONFIGURATION ---
const baseUrl = "https://brightlane.github.io/TurboRefundExpress";
const affiliateUrl = "https://www.linkconnector.com/ta.php?lc=007949061588005142";

// --- THE DATA EMPIRE ---
const keywords = [
    "1040-nr-e-file", "fastest-tax-refund", "irs-refund-tracker", 
    "no-tax-on-tips", "overtime-tax-exemption", "seniors-6k-credit",
    "irs-e-file-partners", "online-tax-filing", "turbotax-alternative", "auto-loan-deduction"
];

const cities = [
    "New York", "London", "Dubai", "Singapore", "Sydney", "Mumbai", 
    "Manila", "Toronto", "Berlin", "Hong Kong", "Paris", "Tokyo",
    "Chicago", "Los Angeles", "Houston", "Phoenix", "Philadelphia",
    "San Antonio", "San Diego", "Dallas", "San Jose", "Austin",
    "Seattle", "Miami", "Boston", "Atlanta", "Denver", "Bangkok", "Seoul"
];

async function startDeployment() {
    console.log("🚀 Starting Empire Build...");
    const template = fs.readFileSync('index.html', 'utf8');
    let sitemapEntries = [];

    cities.forEach(city => {
        keywords.forEach(keyword => {
            const fileName = `${keyword}-${city.toLowerCase().replace(/ /g, '-')}.html`;
            const atid = `TRB_${keyword.replace(/-/g, '_')}_2026_${city.replace(/ /g, '_')}`;
            const fullAffiliateLink = `${affiliateUrl}&atid=${atid}`;
            
            // Inject content and scripts
            let pageContent = template
                .replace(/index\.html/g, fileName)
                .replace(/https:\/\/www\.linkconnector\.com\/ta\.php\?lc=007949061588005142&atid=UsaTaxRefunds/g, fullAffiliateLink)
                .replace(/<div id="dynamic-content"><\/div>/, `
                    <div style="background:#fff5f5; border:1px solid #feb2b2; padding:15px; border-radius:8px; margin-bottom:20px;">
                        <h2 style="margin-top:0; color:#c53030; font-size:1.1rem;">Latest 2026 Update for ${city} Residents</h2>
                        <p style="margin:0; font-size:0.9rem;">The IRS is currently prioritizing <strong>${keyword.replace(/-/g, ' ')}</strong> requests. Local filers in ${city} should submit electronically to secure OBBBA credits.</p>
                    </div>
                `);

            const scripts = `
                <script>
                function calculateRefund() {
                    const tips = parseFloat(document.getElementById('tips').value) || 0;
                    const ot = parseFloat(document.getElementById('overtime').value) || 0;
                    const senior = document.getElementById('isSenior').checked ? 6000 : 0;
                    const total = (tips * 0.12) + (ot * 0.15) + senior;
                    const res = document.getElementById('calc-result');
                    if(res) {
                        res.style.display = 'block';
                        res.innerHTML = 'Estimated 2026 OBBBA Savings: $' + total.toLocaleString();
                    }
                }
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
            
            fs.writeFileSync(fileName, pageContent.replace('</body>', scripts + '</body>'));
            sitemapEntries.push(`${baseUrl}/${fileName}`);
        });
    });

    // --- SITEMAP GENERATION (ERROR-PROOF) ---
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(url => {
    const safeUrl = url.replace(/&/g, '&amp;'); // THE CRITICAL FIX
    return `  <url><loc>${safeUrl}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`;
}).join('\n')}
</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemapContent);
    console.log(`✅ Build Complete: ${sitemapEntries.length} pages generated.`);
}

startDeployment();
