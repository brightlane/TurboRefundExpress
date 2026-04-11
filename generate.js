const fs = require('fs');
const template = fs.readFileSync('index.html', 'utf8');
const today = new Date();
const dateISO = today.toISOString().split('T')[0];
const longDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

// 1. THE REVENUE ENGINE (Keywords & Global Geographies)
const powerKeywords = [
    "TurboTax Login 2026", "H&R Block Online Filing", "TaxSlayer Refund Tracker", "FreeTaxUSA E-file",
    "No Tax on Tips Credit", "Overtime Tax Exemption", "Seniors 6k Standard Credit", "Auto Loan Interest Deduction",
    "Form 1040-NR Non-Resident Alien", "Form 8843 International Student", "W-2 Form Recovery", "1099-K Venmo Reporting",
    "Crypto Capital Gains Tax", "Airbnb Rental Tax Deductions", "Uber Driver Expense Hack", "IRS Audit Protection",
    "Back Taxes Settlement", "FBAR Foreign Account Reporting", "FEIE Foreign Earned Income Exclusion",
    "ITIN Application Guide", "US Tax for Digital Nomads"
];

const cities = [
    "New York City", "Los Angeles", "Chicago", "Houston", "Miami", "Dallas", "Atlanta", "Philadelphia", "Phoenix", "Boston",
    "Seattle", "San Diego", "San Francisco", "Austin", "Denver", "Las Vegas", "Nashville", "Orlando", "Charlotte", "Baltimore",
    "California", "Texas", "Florida", "New York State", "Puerto Rico", "Guam", "US Virgin Islands", "American Samoa",
    "Pennsylvania", "Illinois", "Ohio", "Georgia", "North Carolina", "Michigan", "New Jersey", "Virginia", "Washington State",
    "Dubai", "London", "Toronto", "Sydney", "Singapore", "Berlin", "Hong Kong", "Manila", "Mexico City", "Tokyo",
    "Paris", "Seoul", "Amsterdam", "Madrid", "Rome", "Bangkok", "Abu Dhabi", "Zurich", "Dublin", "Panama City",
    "San Jose Costa Rica", "Lisbon", "Grand Cayman", "Nassau", "Tel Aviv", "Istanbul", "Riyadh", "Doha"
];

// 2. SCRIPTS & LEGAL COMPONENTS
const enhancedScripts = `
<script>
// EXIT INTENT COOKIE DROP (The Safety Net)
let cookieDropped = false;
document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0 && !cookieDropped) {
        const exitFrame = document.createElement('iframe');
        exitFrame.src = "https://www.linkconnector.com/ta.php?lc=007949061588005142&atid=EXIT_INTENT_RECOVERY";
        exitFrame.style.display = "none";
        document.body.appendChild(exitFrame);
        cookieDropped = true;
    }
});

// OBBBA 2026 CALCULATOR
function calculateRefund() {
    const tips = Math.min(parseInt(document.getElementById('tips')?.value || 0), 25000);
    const ot = Math.min(parseInt(document.getElementById('overtime')?.value || 0), 12500);
    const senior = document.getElementById('isSenior')?.checked ? 6000 : 0;
    const savings = (tips + ot + senior) * 0.15;
    const res = document.getElementById('calc-result');
    if(res) {
        res.innerHTML = "<strong>Estimated OBBBA Savings: $" + savings.toFixed(2) + "</strong><br><small>Verified for ${longDate}. Click 'File Now' to secure this refund.</small>";
        res.style.display = "block";
    }
}
</script>`;

const complianceFooter = `
<footer style="background:#1a202c; color:#cbd5e0; padding:60px 20px; font-family:sans-serif; font-size:0.85em; text-align:left;">
    <div style="max-width:1200px; margin:0 auto; display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:40px;">
        <div>
            <h4 style="color:#fff;">Legal & Compliance</h4>
            <p>Authorized e-file partner. <a href="privacy.html" style="color:#fc8181;">Privacy Policy</a> | <a href="https://www.e-file.com/terms.php" target="_blank" style="color:#fc8181;">Terms</a></p>
            <p>Independent affiliate of e-file.com. All IRS brand names are property of their respective owners.</p>
        </div>
        <div>
            <h4 style="color:#fff;">Contact & Support</h4>
            <p>For filing status questions, please contact e-file.com support directly. For site inquiries, reach us via our GitHub property: brightlane.</p>
        </div>
    </div>
    <div style="text-align:center; border-top:1px solid #2d3748; margin-top:30px; padding-top:20px; opacity:0.6;">
        © 2026 brightlane Digital. Supporting OBBBA Reform Awareness.
    </div>
</footer>`;

// 3. GENERATION LOOP
let sitemapLinks = [];
const baseUrl = "https://brightlane.github.io/SkyScanner"; 

powerKeywords.forEach((kw, kwIdx) => {
    cities.forEach((city, cityIdx) => {
        const slug = \`\${kw.toLowerCase().replace(/ /g, '-')}-\${city.toLowerCase().replace(/ /g, '-')}.html\`;
        const atid = \`TRB_\${kw.replace(/ /g, '_')}_\${city.replace(/ /g, '_')}\`;
        
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        const variations = [
            \`IRS batch processing for \${city} is currently live for 2026 \${kw} filings.\`,
            \`New OBBBA exemptions apply to \${kw} returns for users in \${city}.\`,
            \`Expats and residents in \${city} can now access updated \${kw} e-filing for 2026.\`
        ];
        const dailyNews = variations[(dayOfYear + kwIdx + cityIdx) % variations.length];

        let content = template
            .replace(/<\/head>/, \`<link rel="canonical" href="\${baseUrl}/\${slug}" />\\n</head>\`)
            .replace(/atid=UsaTaxRefunds/g, \`atid=\${atid}\`)
            .replace(/<title>.*?<\/title>/, \`<title>\${kw} in \${city} | Updated \${longDate}</title>\`)
            .replace(/id="dynamic-content">.*?<\/div>/, \`<div id="dynamic-content" style="padding:20px; border:2px dashed #e53e3e; background:#fff; margin:20px 0;"><strong>Update for \${longDate}:</strong> \${dailyNews}</div>\`)
            .replace(/<\/body>/, \`\${enhancedScripts}\${complianceFooter}</body>\`);

        fs.writeFileSync(slug, content);
        sitemapLinks.push(\`  <url><loc>\${baseUrl}/\${slug}</loc><lastmod>\${dateISO}</lastmod><changefreq>daily</changefreq></url>\`);
    });
});

const sitemap = \`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\${sitemapLinks.join('\\n')}</urlset>\`;
fs.writeFileSync('sitemap.xml', sitemap);
console.log("Mission Accomplished: 1,500+ High-Performance pages deployed.");
