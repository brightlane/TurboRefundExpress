const fs = require('fs');
const template = fs.readFileSync('index.html', 'utf8');
const today = new Date();
const dateString = today.toISOString().split('T')[0];
const longDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

// 1. CONTENT BRICKS (The "Spinner")
const facts = [
    "The IRS has updated the 2026 electronic filing protocols for faster processing.",
    "New deductions for 2026 include enhanced credits for energy-efficient home upgrades.",
    "Early filers are seeing refund approvals in as little as 8 business days this season.",
    "Be aware: The IRS is increasing audits on high-volume digital asset transactions.",
    "Recent 2026 legislation has adjusted the standard deduction for inflation."
];

const tips = [
    "Pro Tip: Always double-check your routing number to avoid refund delays.",
    "Reminder: Keep your 1099-K forms handy if you use third-party payment apps.",
    "Check your local state requirements as many have decoupled from federal deadlines.",
    "Expats should ensure Form 8833 is attached if claiming treaty benefits.",
    "Maximize your return by itemizing if your total deductions exceed the new 2026 limit."
];

// 2. EXPANDED POWER KEYWORDS
const powerKeywords = [
    "TurboTax Login 2026", "H&R Block Online Filing", "No Tax on Tips Credit", 
    "Overtime Tax Exemption", "Seniors 6k Standard Credit", "Auto Loan Interest Deduction",
    "IRS Form 1040-NR", "Crypto Capital Gains Tax", "IRS Audit Protection",
    "Foreign Earned Income Exclusion", "Tax Refund Status Tracker", "W-2 Form Recovery"
    // ... add all the others from our previous list here!
];

// 3. 50 GLOBAL CITIES
const cities = ["New York", "London", "Dubai", "Mumbai", "Toronto", "Sydney", "Singapore", "Berlin", "Hong Kong", "Manila", /* ... all 50 cities */];

let sitemapLinks = [];
const baseUrl = "https://brightlane.github.io/TurboRefundExpress";

// 4. THE GENERATOR ENGINE
powerKeywords.forEach((kw, kwIdx) => {
    cities.forEach((city, cityIdx) => {
        const slug = `${kw.toLowerCase().replace(/ /g, '-')}-${city.toLowerCase().replace(/ /g, '-')}.html`;
        const atid = `TRB_${kw.replace(/ /g, '_')}_${city.replace(/ /g, '_')}`;
        
        // ROTATION LOGIC: Changes every day based on the date
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        const factIndex = (dayOfYear + kwIdx) % facts.length;
        const tipIndex = (dayOfYear + cityIdx) % tips.length;
        
        const dailyOriginalContent = `<strong>Update for ${longDate}:</strong> ${facts[factIndex]} ${tips[tipIndex]} Residents in ${city} seeking ${kw} should act before the next IRS batch window closes.`;

        let content = template
            .replace(/<title>.*?<\/title>/, `<title>${kw} in ${city} | Updated ${longDate}</title>`)
            .replace(/atid=UsaTaxRefunds/g, `atid=${atid}`)
            .replace(/id="dynamic-content">.*?<\/div>/, `<div id="dynamic-content">${dailyOriginalContent}</div>`)
            .replace(/Verified: .*?<\/span>/, `<span>Last Updated: ${longDate}</span>`);

        fs.writeFileSync(slug, content);
        sitemapLinks.push(`  <url><loc>${baseUrl}/${slug}</loc><lastmod>${dateString}</lastmod><changefreq>daily</changefreq></url>`);
    });
});

// Write Sitemap
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapLinks.join('\n')}</urlset>`;
fs.writeFileSync('sitemap.xml', sitemapContent);
console.log(`Mission Accomplished: All pages refreshed with original daily content for ${dateString}.`);
