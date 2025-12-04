module.exports = (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>M2H Steam API – Pro UI V3</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
/* -----------------------------------------------------------
   APPLE SONOMA THEME + GLASS + DARK/LIGHT TOGGLE
----------------------------------------------------------- */

:root {
  --bg: #f5f5f7;
  --text: #1d1d1f;
  --card-bg: rgba(255,255,255,0.65);
  --border: rgba(0,0,0,0.12);
  --shadow: rgba(0,0,0,0.08);
  --hero-text: linear-gradient(120deg, #007aff, #ff2d55);
}
.dark {
  --bg: #0d0d0f;
  --text: #fafafa;
  --card-bg: rgba(25,25,30,0.55);
  --border: rgba(255,255,255,0.15);
  --shadow: rgba(0,0,0,0.45);
  --hero-text: linear-gradient(120deg, #0a84ff, #ff375f);
}

body {
  margin:0;
  background:var(--bg);
  color:var(--text);
  font-family:-apple-system, BlinkMacSystemFont, "Inter", sans-serif;
}

/* NAVBAR */
.nav {
  width:100%;
  padding:18px;
  text-align:center;
  font-size:22px;
  font-weight:600;
  background:var(--card-bg);
  backdrop-filter:saturate(180%) blur(20px);
  position:sticky;
  top:0;
  z-index:999;
  border-bottom:1px solid var(--border);
}

/* THEME TOGGLE – APPLE CONTROL CENTER STYLE */
.toggle-outer {
  width:52px;
  height:28px;
  border-radius:20px;
  background:rgba(255,255,255,0.35);
  backdrop-filter:blur(10px);
  border:1px solid var(--border);
  position:absolute;
  top:16px;
  right:16px;
  cursor:pointer;
  transition:0.3s;
}
.toggle-inner {
  width:22px;
  height:22px;
  background:white;
  border-radius:50%;
  margin:3px;
  transition:0.3s;
  box-shadow:0 2px 6px rgba(0,0,0,0.3);
}
.dark .toggle-inner {
  transform:translateX(24px);
  background:#d0d0d0;
}

/* HERO SECTION – APPLE PRODUCT PAGE STYLE */
.hero {
  text-align:center;
  padding:80px 20px 60px;
}
.hero h1 {
  font-size:62px;
  font-weight:700;
  background:var(--hero-text);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.hero p {
  font-size:20px;
  opacity:0.65;
  margin-top:-10px;
}

/* TABS */
.tabs {
  display:flex;
  justify-content:center;
  margin-top:40px;
  flex-wrap:wrap;
}
.tab {
  padding:14px 24px;
  margin:8px;
  border-radius:18px;
  background:var(--card-bg);
  border:1px solid var(--border);
  backdrop-filter:blur(12px);
  cursor:pointer;
  font-weight:500;
  transition:0.25s;
}
.tab.active {
  background:#007aff;
  color:#fff;
}

/* PANELS */
.panel {
  display:none;
  background:var(--card-bg);
  padding:30px;
  border-radius:20px;
  margin:30px auto;
  max-width:1100px;
  border:1px solid var(--border);
  box-shadow:0 8px 40px var(--shadow);
}
.panel.active {
  display:block;
}

/* INPUTS */
label {
  font-size:14px;
  opacity:0.75;
  margin-top:14px;
}
input {
  width:100%;
  padding:12px;
  border-radius:14px;
  border:1px solid var(--border);
  margin-top:6px;
  font-size:15px;
  background:rgba(255,255,255,0.4);
}

/* BUTTON */
button {
  width:100%;
  padding:14px;
  border:none;
  border-radius:14px;
  background:#007aff;
  color:#fff;
  margin-top:20px;
  font-size:16px;
  font-weight:500;
  cursor:pointer;
}
button:hover { background:#0062cc; }

/* CODE + COPY BUTTON */
pre {
  background:#1d1d1f;
  color:#fff;
  border-radius:14px;
  padding:15px;
  margin-top:20px;
  font-size:14px;
  position:relative;
}
.copy-btn {
  position:absolute;
  top:10px;
  right:10px;
  background:#444;
  color:white;
  padding:6px 10px;
  font-size:12px;
  border-radius:8px;
  cursor:pointer;
  opacity:0.8;
}
.copy-btn:hover { opacity:1; }

/* MOBILE */
@media (max-width:600px){
  .hero h1 { font-size:48px; }
}
</style>

</head>
<body>

<div class="nav">
  M2H Steam API – Developer Portal
  <div class="toggle-outer" onclick="toggleTheme()">
    <div class="toggle-inner"></div>
  </div>
</div>

<div class="hero">
  <h1>Build Smarter with Steam API</h1>
  <p>Modern macOS-style developer portal, SDK search, item search & live playground.</p>
</div>

<div class="tabs">
  <div class="tab active" onclick="openTab('search')">Search API</div>
  <div class="tab" onclick="openTab('stats')">Stats API</div>
  <div class="tab" onclick="openTab('sdk')">SDK Search</div>
  <div class="tab" onclick="openTab('item')">Item Search</div>
  <div class="tab" onclick="openTab('ui')">UI Preview</div>
</div>

<!-- PANELS (Search, Stats, SDK, Items, UI) -->
<div id="panel-search" class="panel active">
  <h2>🔍 Steam Account Search API</h2>

  <label>Username</label>
  <input id="s_username">

  <label>Game</label>
  <input id="s_game">

  <label>Country</label>
  <input id="s_country">

  <button onclick="runSearchAPI()">Run Search</button>

  <pre id="searchResult"><span class="copy-btn" onclick="copy('searchResult')">Copy</span>Results...</pre>
</div>

<div id="panel-stats" class="panel">
  <h2>📊 Stats API</h2>
  <button onclick="runStatsAPI()">Get Stats</button>
  <pre id="statsResult"><span class="copy-btn" onclick="copy('statsResult')">Copy</span></pre>
</div>

<div id="panel-sdk" class="panel">
  <h2>🧩 SDK Property Search</h2>

  <label>SDK Property Name</label>
  <input id="sdk_name">

  <label>Type</label>
  <input id="sdk_type">

  <button onclick="runSDK()">Search SDK</button>

  <pre id="sdkResult"><span class="copy-btn" onclick="copy('sdkResult')">Copy</span></pre>
</div>

<div id="panel-item" class="panel">
  <h2>🎒 Item Search</h2>

  <label>Item Name</label>
  <input id="item_name">

  <button onclick="runItem()">Search Item</button>

  <pre id="itemResult"><span class="copy-btn" onclick="copy('itemResult')">Copy</span></pre>
</div>

<div id="panel-ui" class="panel">
  <h2>🖥 UI Preview Page</h2>
  <a href="/api/ui"><button>Open UI</button></a>
</div>

<script>
function openTab(id){
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
  event.target.classList.add('active');
}

function toggleTheme(){
  document.body.classList.toggle('dark');
}

function copy(id){
  navigator.clipboard.writeText(document.getElementById(id).innerText);
  alert("Copied!");
}

/* PLAYGROUND FUNCTIONS -------------------------- */

async function runSearchAPI(){
  let url = "/api/search?username=" + encodeURIComponent(s_username.value) +
            "&game=" + encodeURIComponent(s_game.value) +
            "&country=" + encodeURIComponent(s_country.value);

  const r = await fetch(url);
  searchResult.innerText = JSON.stringify(await r.json(), null, 2);
}

async function runStatsAPI(){
  const r = await fetch("/api/stats");
  statsResult.innerText = JSON.stringify(await r.json(), null, 2);
}

async function runSDK(){
  let url = "/api/search?sdk=" + encodeURIComponent(sdk_name.value) +
            "&sdk_type=" + encodeURIComponent(sdk_type.value);

  const r = await fetch(url);
  sdkResult.innerText = JSON.stringify(await r.json(), null, 2);
}

async function runItem(){
  let url = "/api/search?item=" + encodeURIComponent(item_name.value);

  const r = await fetch(url);
  itemResult.innerText = JSON.stringify(await r.json(), null, 2);
}
</script>

</body>
</html>
`);
};
