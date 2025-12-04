module.exports = (req, res) => {
  res.setHeader("Content-Type", "text/html");

  res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>M2H Steam API – Premium Docs & Playground</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #0d0f1a, #111827, #0a0a0f);
    background-size: 300% 300%;
    animation: gradientShift 10s ease infinite;
    color: #fff;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .container {
    width: 92%;
    max-width: 1000px;
    margin: auto;
    padding: 40px 0;
  }

  h1 {
    text-align: center;
    font-size: 42px;
    background: linear-gradient(90deg, #7afcff, #fe7eff, #ffe97a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
  }

  p.center {
    text-align: center;
    opacity: 0.8;
    margin-bottom: 40px;
  }

  .card {
    background: rgba(255,255,255,0.06);
    padding: 25px;
    border-radius: 18px;
    margin-top: 25px;
    border: 1px solid rgba(255,255,255,0.12);
    backdrop-filter: blur(12px);
    box-shadow: 0 0 20px rgba(0,255,255,0.1);
  }

  .endpoint {
    padding: 14px;
    border-left: 4px solid #7afcff;
    background: rgba(255,255,255,0.05);
    border-radius: 8px;
    margin-top: 12px;
  }

  code {
    display: block;
    background: #0e0f18;
    padding: 12px;
    border-radius: 10px;
    margin-top: 8px;
    color: #7afcff;
    overflow-x: auto;
  }

  input, select {
    width: 100%;
    padding: 12px;
    margin-top: 8px;
    border-radius: 10px;
    border: none;
    background: rgba(255,255,255,0.12);
    color: #fff;
  }

  button {
    margin-top: 15px;
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background: linear-gradient(90deg, #7afcff, #fe7eff);
    color: #111;
    font-weight: bold;
  }

  #playgroundResult {
    margin-top: 20px;
    padding: 15px;
    border-radius: 10px;
    background: rgba(0,0,0,0.4);
    white-space: pre-wrap;
    color: #7afcff;
  }

  footer {
    text-align: center;
    margin-top: 40px;
    opacity: 0.6;
  }
</style>
</head>

<body>

<div class="container">

<h1>M2H Steam Search API</h1>
<p class="center">A fast, modern, AI-enhanced Steam account search API with documentation & playground.</p>

<!-- Documentation Section -->
<div class="card">
  <h2>🔌 API Endpoints</h2>

  <div class="endpoint">
    <b>GET /api/search</b>
    <p>Search Steam accounts using powerful filters.</p>
    <code>/api/search?username=mpqdv</code>
    <code>/api/search?game=Rust,Metro</code>
    <code>/api/search?country=PH&min_games=3</code>
    <code>/api/search?random=true</code>
  </div>

  <div class="endpoint">
    <b>GET /api/stats</b>
    <p>Returns total accounts, total game count, country stats.</p>
    <code>/api/stats</code>
  </div>

  <div class="endpoint">
    <b>GET /api/ui</b>
    <p>Full UI search interface.</p>
    <code>/api/ui</code>
  </div>

  <h2>📘 Full Parameter List</h2>
  <ul>
    <li><b>username</b> - search by partial match</li>
    <li><b>game</b> - supports list + fuzzy search</li>
    <li><b>country</b> - filter by country code</li>
    <li><b>status</b> - Verified / Unverified</li>
    <li><b>min_games</b>, <b>max_games</b> - range</li>
    <li><b>min_days</b>, <b>max_days</b> - last online</li>
    <li><b>min_balance</b>, <b>max_balance</b> - currency filter</li>
    <li><b>random=true</b> - returns a random account</li>
  </ul>
</div>

<!-- Code Examples -->
<div class="card">
  <h2>💻 Code Examples</h2>

  <h3>JavaScript (fetch)</h3>
  <code>fetch("/api/search?game=Rust")
  .then(r => r.json())
  .then(console.log);</code>

  <h3>cURL</h3>
  <code>curl "https://YOUR-DOMAIN/api/search?username=mpqdv"</code>
</div>

<!-- Playground -->
<div class="card">
  <h2>🧪 Live API Playground</h2>

  <label>Choose Endpoint</label>
  <select id="endpoint">
    <option value="search">/api/search</option>
    <option value="stats">/api/stats</option>
  </select>

  <label>Query Parameters</label>
  <input id="params" placeholder="username=mpqdv&game=Rust">

  <button onclick="runPlayground()">Run</button>

  <pre id="playgroundResult">Result will appear here...</pre>
</div>

<footer>© 2025 M2H • Built on Vercel</footer>

</div>

<script>
async function runPlayground() {
  const ep = document.getElementById("endpoint").value;
  const params = document.getElementById("params").value.trim();

  const url = params ? \`/api/\${ep}?\${params}\` : \`/api/\${ep}\`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    document.getElementById("playgroundResult").textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    document.getElementById("playgroundResult").textContent = "Error: " + err;
  }
}
</script>

</body>
</html>
  `);
};
