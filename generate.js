const fs = require('fs');
const path = require('path');
const template = fs.readFileSync('index.html', 'utf8');
const today = new Date();
const dateISO = today.toISOString().split('T')[0];
const longDate = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

// --- THE KEYWORD EMPIRE ---
const powerKeywords = [
    "TurboTax Login 2026", "H&R Block Online Filing", "TaxSlayer Refund Tracker", "FreeTaxUSA E-file",
    "No Tax on Tips Credit", "Overtime Tax Exemption", "Seniors 6k Standard Credit", "Auto Loan Interest Deduction",
    "Tax on Inherited Property", "Selling a Home Tax Rules", "Newlywed Joint Filing Guide", "Divorce Tax Implications",
    "Crypto Capital Gains Tax", "OnlyFans Income Reporting", "Airbnb Rental Tax Deductions", "Uber Driver Expense Hack",
    "IRS Form 1040-NR", "W-2 Form Recovery", "1099-NEC Contractor", "Foreign Earned Income Exclusion"
];

const cities = [
    "New York", "London", "Dubai", "Mumbai", "Toronto", "Sydney", "Singapore", "Berlin", "Hong Kong", "Manila",
    "Paris", "Tokyo", "Bangkok", "Abu Dhabi", "Zurich", "Dublin", "Mexico City", "Seoul", "Amsterdam", "Madrid",
    "Rome", "Chicago", "Los Angeles", "Houston", "San Francisco", "Miami", "Boston", "Seattle", "Austin", "Denver",
    "Atlanta", "Shanghai", "Beijing", "Bangalore", "Delhi", "Cape Town", "Johannesburg", "Sao Paulo", "Buenos Aires", "Tel Aviv",
    "Istanbul", "Riyadh", "Doha", "Kuala Lumpur", "Jakarta", "Hanoi", "Ho Chi Minh City", "Prague", "Warsaw", "Vienna"
];

// --- CONTENT SPINNER BRICKS ---
const facts = [
    "The 2026 IRS systems are prioritizing OBBBA deduction claims for faster processing.",
    "New digital filing standards for 2026 require updated 1099-K reporting for residents.",
    "Early filers are seeing higher-than-average returns due to the new Overtime Exemption laws.",
    "The IRS has confirmed that the $6,000 Seniors Credit is now fully active for the 2026 season."
];

let sitemapLinks = [];
const baseUrl = "https://brightlane.github.io/SkyScanner"; // Ensure this matches your repo name

// --- THE GENERATOR ---
powerKeywords.forEach((kw, kwIdx) => {
    cities.forEach((city, cityIdx) => {
        const slug = `${kw.toLowerCase().replace(/ /g, '-')}-${city.toLowerCase().replace(/ /g, '-')}.html`;
        const atid = `TRB_${kw.replace(/ /g, '_')}_${city.replace(/ /g, '_')}`;
        
        // Spin logic: Change content every day based on the day of the year
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
        const spinText = facts[(dayOfYear + kwIdx + cityIdx) % facts.length];

        const pageTitle = `${kw} in ${city} | Official 2026 Tax Guide`;
        const dailyText = `<strong>Live Update for ${city} (${longDate}):</strong> ${spinText} If you are filing for ${kw}, ensure you use an authorized IRS partner to secure your 2026 refund.`;

        let content = template
            .replace(/<title>.*?<\/title>/, `<title>${pageTitle}</title>`)
            .replace(/atid=UsaTaxRefunds/g, `atid=${atid}`)
            .replace(/id="dynamic-content">.*?<\/div>/, `<div id="dynamic-content">${dailyText}</div>`)
            .replace(/Verified: .*?<\/span>/, `<span>Verified: ${longDate}</span>`);

        fs.writeFileSync(slug, content);
        sitemapLinks.push(`  <url><loc>${baseUrl}/${slug}</loc><lastmod>${dateISO}</lastmod><changefreq>daily</changefreq></url>`);
    });
});

// --- GENERATE SITEMAP ---
const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapLinks.join('\n')}</urlset>`;
fs.writeFileSync('sitemap.xml', sitemap);

console.log(`Success: ${powerKeywords.length * cities.length} pages generated with daily fresh content.`);
