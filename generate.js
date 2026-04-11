/**
 * VULTURE ENGINE v2.0 - 20,000 Page Matrix
 * Targets: IRS, TurboTax, H&R Block
 */

const fs = require('fs');
const path = require('path');

// --- 1. SETTINGS ---
const baseUrl = "https://brightlane.github.io/TurboRefundExpress/";
const affiliateUrl = "https://www.linkconnector.com/ta.php?lc=007949061588005142";
const outputDir = path.join(__dirname, 'p');

// --- 2. THE 20,000 PAGE DATA MATRIX ---
const intents = ["best", "fastest", "official", "free", "direct", "guaranteed", "instant", "online", "secure", "verified", "emergency", "last-minute", "advanced", "simple", "expert", "top-rated", "exclusive", "hidden", "unclaimed", "automatic"];

const roots = ["irs-e-file", "turbotax-alt", "hr-block-bypass", "refund-tracker", "no-tax-tips", "senior-6k-credit", "overtime-exempt", "car-loan-interest-deduction", "1040-nr-filing", "crypto-reporting", "self-employed-qbi", "max-refund", "irs-free-file", "fast-deposit", "automated-return", "1099-k-check", "child-credit", "debt-forgiveness", "freetaxusa-vs-turbotax", "lowest-fee-prep"];

const targets = ["portal", "engine", "system", "calculator", "guide", "help", "support", "platform", "software", "app", "dashboard", "lookup", "checker", "processing", "claims", "credits", "benefits", "vouch", "submission", "filing", "vault", "hub", "link", "network", "gateway", "service", "prep", "tool", "optimizer", "analyzer", "expert-system", "direct-link", "priority-access", "premium-level", "standard-tier", "basic-free", "enterprise-grade", "small-biz-specific", "gig-worker-portal", "investor-reporting", "military-filing", "student-credit", "family-benefit", "single-filer-tool", "joint-return-logic", "head-of-household-calc", "amended-return-fix", "back-tax-resolution", "extension-filer", "audit-protection"];

// --- 3. EXECUTION ENGINE ---
function build() {
    console.log("🚀 Starting build...");

    // Ensure /p/ directory exists (Prevents 404s)
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const template = fs.readFileSync('index.html', 'utf8');
    const today = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    let sitemapLinks = [];

    // Loop through the matrix
    intents.forEach(intent => {
        roots.forEach(root => {
            targets.forEach(target => {
                const slug = `${intent}-${root}-${target}`;
                const fileName = `${slug}.html`;
                const atid = `V20K_${slug.replace(/-/g, '_')}`;
                
                // Construct the "Vulture" Content
                const dynamicHtml = `
                    <div style="background:#fffafa; border:2px solid #c53030; padding:25px; margin:20px 0; border-radius:10px; font-family: sans-serif;">
                        <h2 style="color:#c53030; margin-top:0;">2026 Status: Verified Active</h2>
                        <p style="font-size:1.2rem; color:#333;">
                            Your <strong>${intent} ${root.replace(/-/g, ' ')}</strong> ${target} is ready for processing.
                        </p>
                        <p>As of <strong>${today}</strong>, our direct-link protocols allow users to bypass traditional software 
                        delays associated with legacy providers like TurboTax and H&R Block.</p>
                        <a href="${affiliateUrl}&atid=${atid}" 
                           style="display:inline-block; background:#c53030; color:#fff; padding:15px 30px; text-decoration:none; font-weight:bold; border-radius:5px; font-size:1.1rem;">
                           ACCESS SECURE E-FILE PORTAL &gt;
                        </a>
                        <p style="font-size:0.8rem; color:#666; margin-top:15px;">Official 2026 IRS E-file Authorized Logic Path</p>
                    </div>
                `;

                // Build the Page
                let pageContent = template
                    .replace(/{{KEYWORD}}/g, slug.replace(/-/g, ' '))
                    .replace(/index\.html/g, `p/${fileName}`) // Fixes relative links
                    .replace(/<div id="dynamic-content"><\/div>/, dynamicHtml);

                // Write the file to /p/
                fs.writeFileSync(path.join(outputDir, fileName), pageContent);
                sitemapLinks.push(`${baseUrl}p/${fileName}`);
            });
        });
    });

    // --- 4. SITEMAP GENERATION ---
    console.log("🗺️ Creating Sitemap...");
    const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    const sitemapFooter = `\n</urlset>`;
    const sitemapBody = sitemapLinks.map(url => `  <url><loc>${url}</loc><changefreq>daily</changefreq><priority>0.7</priority></url>`).join('\n');
    
    fs.writeFileSync('sitemap.xml', sitemapHeader + sitemapBody + sitemapFooter);

    console.log(`✅ COMPLETE: 20,000 pages built in /p/ and sitemap.xml updated.`);
}

// RUN IT
build();
