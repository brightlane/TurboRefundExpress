# 🚀 TurboRefundExpress

TurboRefundExpress is a high-performance, **Programmatic SEO (pSEO)** engine designed to generate and maintain localized tax filing landing pages across 500+ global locations. The project targets keywords related to IRS 1040/1040-NR filing, refund tracking, and tax credits.

## 🌐 Live Site
[https://brightlane.github.io/TurboRefundExpress/](https://brightlane.github.io/TurboRefundExpress/)

## 🛠 Features
- **Dynamic Page Generation:** Uses `generate.js` to build hundreds of localized HTML files (Berlin, Dubai, London, New York, etc.).
- **Global Reach:** Targeted landing pages for US expats and non-residents (1040-NR) in major international hubs.
- **Automated Workflows:** GitHub Actions (`daily-refresh.yml`) ensure content freshness and sitemap updates.
- **Optimized for Conversions:** Fast-loading, mobile-responsive pages with countdown timers and clear CTA (Call to Action) buttons.
- **Sitemap Automation:** `generate-sitemap.js` automatically maps all 500+ pages for rapid Google indexing.

## 📂 Project Structure
- `/` : Contains the main landing pages (e.g., `TaxTurboXpress.html`, `UsaTaxReturn.html`).
- `generate.js` : The core script for generating city-specific tax landing pages.
- `generate-sitemap.js` : Script to keep `sitemap.xml` updated as new pages are added.
- `.github/workflows/` : Automated daily updates and deployment tasks.

## 🚀 Getting Started

### Prerequisites
- Node.js (for running generation scripts)

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/brightlane/TurboRefundExpress.git](https://github.com/brightlane/TurboRefundExpress.git)
