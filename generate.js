<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2026 US Tax Refund Status | IRS Authorized E-file Portal</title>
    <style>
        :root { --primary: #1a365d; --accent: #e53e3e; --bg: #f7fafc; --text: #2d3748; }
        body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; margin: 0; background: var(--bg); color: var(--text); line-height: 1.5; }
        
        /* Header & Sticky Mega-Menu */
        .header { background: #fff; padding: 1rem; text-align: center; border-bottom: 1px solid #e2e8f0; }
        .logo { max-width: 180px; transition: transform 0.2s; }
        .logo:hover { transform: scale(1.02); }
        
        .mega-menu { background: #2d3748; color: white; padding: 10px; position: sticky; top: 0; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .mega-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; font-size: 0.85rem; }
        .mega-links a { color: #fbd38d; text-decoration: none; font-weight: bold; }
        .mega-links a:hover { color: #fff; text-decoration: underline; }

        /* Hero & Container */
        .hero { background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; padding: 60px 20px; text-align: center; }
        .hero h1 { margin: 0; font-size: 2.2rem; letter-spacing: -1px; }
        .container { max-width: 900px; margin: -40px auto 50px; padding: 0 20px; position: relative; }
        
        /* Main Content Card */
        .card { background: white; border-radius: 15px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); padding: 40px; }
        .btn { display: block; width: 100%; max-width: 400px; margin: 20px auto; background: var(--accent); color: white; padding: 18px; border-radius: 10px; font-size: 1.3rem; font-weight: 800; text-decoration: none; text-align: center; border: none; box-shadow: 0 4px 14px rgba(229, 62, 62, 0.4); transition: 0.2s; }
        .btn:hover { background: #c53030; transform: translateY(-2px); }

        /* Calculator Section */
        #tax-calculator { background: #f8fafc; border: 2px solid #edf2f7; border-radius: 12px; padding: 25px; margin: 30px 0; }
        .form-group { margin-bottom: 15px; }
        label { display: block; font-weight: 600; margin-bottom: 5px; font-size: 0.9rem; }
        input[type="number"] { width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; box-sizing: border-box; font-size: 1rem; }
        #calc-result { margin-top: 15px; padding: 15px; background: #c6f6d5; color: #22543d; border-radius: 8px; font-weight: bold; display: none; text-align: center; }

        /* Features Grid */
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 30px; }
        .f-item { padding: 15px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.85rem; }
        
        @media (max-width: 600px) { .hero h1 { font-size: 1.6rem; } .card { padding: 20px; } }
    </style>
</head>
<body>

<div class="header">
    <a href="https://www.linkconnector.com/ta.php?lc=007949061588005142&atid=UsaTaxRefunds">
        <img src="turbo.png" alt="Tax Logo" class="logo">
    </a>
</div>

<nav class="mega-menu">
    <div class="mega-links">
        <span>📍 DEADLINE HUBS:</span>
        <a href="1040-nr-e-file-new-york.html">New York</a>
        <a href="1040-nr-e-file-london.html">London</a>
        <a href="1040-nr-e-file-dubai.html">Dubai</a>
        <a href="1040-nr-e-file-sydney.html">Sydney</a>
        <a href="1040-nr-e-file-mumbai.html">Mumbai</a>
        <a href="1040-nr-e-file-manila.html">Manila</a>
    </div>
</nav>

<div class="hero">
    <h1>2026 US Tax Refund Status</h1>
    <p>IRS Authorized E-file Access & OBBBA Credit Recovery</p>
</div>

<div class="container">
    <div class="card">
        <div id="dynamic-content"></div>

        <p><strong>Urgent Notice:</strong> 2026 Tax Regulations now include the <em>Overtime & Tips Tax Exemption</em>. Ensure your return is filed through an authorized portal to claim these automatic credits.</p>

        <a href="https://www.linkconnector.com/ta.php?lc=007949061588005142&atid=UsaTaxRefunds" class="btn">🚀 CLAIM MY REFUND NOW</a>

        <div id="tax-calculator">
            <h3 style="margin-top:0;">OBBBA Credit Estimator</h3>
            <div class="form-group">
                <label>Annual Tip Income ($)</label>
                <input type="number" id="tips" placeholder="Enter amount">
            </div>
            <div class="form-group">
                <label>Annual Overtime Earnings ($)</label>
                <input type="number" id="overtime" placeholder="Enter amount">
            </div>
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
                <input type="checkbox" id="isSenior" style="width:20px; height:20px;"> I am age 65+ ($6,000 Credit)
            </label>
            <button onclick="calculateRefund()" class="btn" style="background:var(--primary); margin-top:20px;">Estimate Savings</button>
            <div id="calc-result"></div>
        </div>

        <div class="features">
            <div class="f-item">✅ <strong>Direct Deposit</strong><br>Get your refund in 8-21 days.</div>
            <div class="f-item">✅ <strong>Maximum Refund</strong><br>OBBBA credits applied instantly.</div>
            <div class="f-item">✅ <strong>IRS Authorized</strong><br>Secure e-file partner portal.</div>
        </div>

        <div id="link-pool" style="margin-top:40px; font-size:0.75rem; color:#a0aec0; text-align:center;"></div>
    </div>
</div>

</body>
</html>
