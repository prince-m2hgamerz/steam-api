module.exports = (req, res) => {
  res.setHeader("Content-Type", "text/html");

  res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Steam API - M2H</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body {
    margin: 0;
    background: #0f0f18;
    font-family: 'Inter', sans-serif;
    color: #fff;
    padding: 20px;
  }

  .container {
    max-width: 900px;
    margin: auto;
  }

  h1 {
    text-align: center;
    background: linear-gradient(90deg,#7afcff,#fe7eff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 40px;
  }

  .card {
    background: rgba(255,255,255,0.05);
    border-radius: 16px;
    padding: 20px;
    margin-top: 20px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.08);
  }

  code {
    background: #1a1a2f;
    padding: 8px 12px;
    border-radius: 6px;
    display: block;
    margin-top: 8px;
    color: #7afcff;
  }

  .endpoint {
    padding: 10px;
    border-left: 4px solid #7afcff;
    margin-top: 15px;
    background: #151525;
    border-radius: 6px;
  }

  .footer {
    text-align: center;
    margin-top: 30px;
    opacity: 0.7;
  }

  @media(max-width: 600px){
    h1 {font-size: 28px;}
  }
</style>
</head>
<body>

<div class="container">

<h1>Steam Search API</h1>

<div class="card">
  <h2>Available Endpoints</h2>

  <div class="endpoint">
    <b>/api/search</b>
    <code>?username=mpqdv</code>
    <code>?game=Rust,Metro&min_games=3</code>
    <code>?random=true</code>
  </div>

  <div class="endpoint">
    <b>/api/stats</b>
  </div>

  <h3>Features</h3>
  <ul>
    <li>Fuzzy game search</li>
    <li>Game count filters</li>
    <li>Last online filters</li>
    <li>Balance filters</li>
    <li>Random account generator</li>
    <li>Search scoring (smart ranking)</li>
    <li>Pagination + metadata</li>
  </ul>

</div>


<div class="footer">Created by <b>M2H</b> • Powered by Vercel</div>

</div>

</body>
</html>
  `);
};
