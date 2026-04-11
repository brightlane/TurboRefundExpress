# TurboRefundExpress 🚀

TurboRefundExpress is a high-performance, **Programmatic SEO (pSEO)** engine designed to generate and maintain localized tax filing landing pages across 500+ global locations. The project targets keywords related to IRS 1040/1040-NR filing, refund tracking, and tax credits.

## 🌐 Live Site
[https://brightlane.github.io/TurboRefundExpress/](https://brightlane.github.io/TurboRefundExpress/)

## 🛠 Features
* **Dynamic Page Generation:** Uses `generate.js` to build hundreds of localized HTML files (Berlin, Dubai, London, New York, etc.).
* **Global Reach:** Targeted landing pages for US expats and non-residents (1040-NR) in major international hubs.
* **Automated Workflows:** GitHub Actions (`daily-refresh.yml`) ensure content freshness and sitemap updates.
* **SEO Optimized:** Includes automated `sitemap.xml` generation, `.nojekyll` bypass, and `robots.txt` for rapid Google indexing.
* **Conversion Focused:** Mobile-responsive pages with dynamic CTAs and affiliate tracking (LinkConnector).

## 📂 Project Structure
* `index.html`: The master template for all generated pages.
* `generate.js`: The core engine script that builds city pages and the sitemap.
* `sitemap.xml`: The auto-generated map for search engines.
* `robots.txt`: Crawler instructions for Google and Bing.
* `.github/workflows/`: Automation for daily site refreshes.

## 🚀 Getting Started
1. Clone the repository: `git clone https://github.com/brightlane/TurboRefundExpress.git`
2. Install Node.js.
3. Run `node generate.js` to build the local site.
