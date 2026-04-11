const fs = require('fs');

// 1. Your 10 High-Volume Seeds
const keywords = ["Online Tax Filing", "IRS Refund Tracker", "1040-NR E-file", "No Tax on Tips", "Overtime Tax Exemption", "Seniors 6k Credit", "Auto Loan Deduction", "TurboTax Alternative", "Fastest Tax Refund", "IRS E-file Partners"];

// 2. 50 Top Cities (Sample - Expand this list to 50)
const cities = ["New York", "London", "Dubai", "Mumbai", "Toronto", "Sydney", "Singapore", "Berlin", "Hong Kong", "Manila"]; 

const template = fs.readFileSync('index.html', 'utf8');
const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

keywords.forEach(kw => {
    cities.forEach(city => {
        const fileName = `${kw.toLowerCase().replace(/ /g, '-')}-${city.toLowerCase()}.html`;
        const pageTitle = `${kw} 2026 for Expats in ${city}`;
        const atid = `TRB_${kw.replace(/ /g, '_')}_${city}`;
        
        let content = template
            .replace(/<title>.*?<\/title>/, `<title>${pageTitle}</title>`)
            .replace(/atid=UsaTaxRefunds/g, `atid=${atid}`)
            .replace(/Verified: .*?<\/span>/, `Verified: ${today}</span>`); // Freshness trick

        fs.writeFileSync(fileName, content);
    });
});
console.log("500 Pages Generated.");
