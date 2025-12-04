export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>M2H Developer Portal – Steam API</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
/* -----------------------------------------------------------
   APPLE SONOMA THEME + GLASS UI + THEME TOGGLE
----------------------------------------------------------- */

:root {
  --bg: #f5f5f7;
  --text: #1d1d1f;
  --card: rgba(255,255,255,0.55);
  --border: rgba(0,0,0,0.12);
  --shadow: rgba(0,0,0,0.08);
  --hero: linear-gradient(120deg, #007aff, #ff2d55);
}

.dark {
  --bg: #0d0d0f;
  --text: #fafafa;
  --card: rgba(25,25,30,0.55);
  --border: rgba(255,255,255,0.15);
  --shadow: rgba(0,0,0,0.4);
  --hero: linear-gradient(120deg, #0a84ff, #ff375f);
}

body {
  margin:0;
  background:var(--bg);
  color:var(--text);
  font-family:-apple-system, BlinkMacSystemFont, "Inter", sans-serif;
}

.navbar {
  background:var(--card);
  backdrop-filter:saturate(180%) blur(20px);
  padding:18px;
  text-align:center;
  font-size:22px;
  font-weight:600;
  border-bottom:1px solid var(--border);
  position:sticky;
  top:0;
  z-index:999;
}

/* THEME TOGGLE — Apple Control Center Style */
.toggle-box {
  width:52px;
  height:28px;
  position:absolute;
  top:14px;
  right:14px;
  border-radius:20px;
  border:1px solid var(--border);
  background:rgba(255,255,255,0.35);
  backdrop-filter:blur(10px);
  cursor:pointer;
}
.toggle-btn {
  width:22px;
  height:22px;
  background:white;
  border-radius:50%;
  position:relative;
  top:3px;
  left:3px;
  box-shadow:0 2px 4px rgba(0,0,0,0.3);
  transition:0.3s;
}
.dark .toggle-btn {
  left:27px;
  background:#d0d0d0;
}

/* HERO SECTION */
.hero {
  padding:80px 20px 60px;
  text-align:center;
}
.hero h1 {
  font-size:62px;
  font-weight:700;
  background:var(--hero);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.hero p {
  font-size:20px;
  opacity:0.7;
  margin-top:-10px;
}

/* TABS */
.tabs {
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
  margin-top:40px;
}
.tab {
  padding:14px 24px;
  margin:8px;
  border-radius:18px;
  background:var(--card);
  backdrop-filter:blur(12px);
  border:1px solid var(--border);
  cursor:pointer;
  font-weight:500;
}
.tab.active {
  background:#007aff;
  color:white;
}

/* CARDS / PANELS */
.panel {
  max-width:1100px;
  margin:40px auto;
  padding:30px;
  background:var(--card);
  backdrop-filter:blur(20px);
  border-radius:20px;
  border:1px solid var(--border);
  box-shadow:0 8px 40px var(--shadow);
  display:none;
}
.panel.active { display:block; }

/* INPUTS */
input {
  width:100%;
  padding:12px;
  border-radius:14px;
  border:1px solid var(--border);
  margin-top:8px;
  background:rgba(255,255,255,0.4);
}

/* BUTTON */
button {
  width:100%;
  padding:14px;
  border:none;
  border-radius:14px;
  margin-top:20px;
  background:#007aff;
  color:white;
  font-size:16px;
  cursor:pointer;
}
button:hover { background:#0062d1; }

/* CODE BLOCK */
pre {
  background:#1d1d1f;
  color:white;
  padding:16px;
  border-radius:14px;
  font-size:14px;
  position:relative;
  overflow:auto;
}
.copy {
  position:absolute;
  right:12px;
  top:12px;
  padding:6px 10px;
  background:#444;
  font-size:12px;
  border-radius:6px;
  cursor:pointer;
}

</style>
</head>
<body>

<div class="navbar">
  M2H Developer Portal
  <div class="toggle-box" onclick="toggleTheme()">
    <div class="toggle-btn"></div>
  </div>
</div>

<div class="hero">
  <h1>Steam API Suite</h1>
  <p>Modern Apple-inspired API playground for Accounts, Items, and SDK search.</p>
</div>

<div class="tabs">
  <div class="tab active" onclick="openTab('accounts')">Accounts API</div>
  <div class="tab" onclick="openTab('items')">Items API</div>
  <div class="tab" onclick="openTab('sdk')">SDK API</div>
</div>

<!-- =============================================
     ACCOUNTS API PANEL
=================================================-->
<div id="panel-accounts" class="panel active">
  <h2>🔍 Accounts API</h2>

  <label>Username</label>
  <input id="acc_username">

  <label>Country</label>
  <input id="acc_country">

  <label>Game</label>
  <input id="acc_game">

  <button onclick="runAccounts()">Search Accounts</button>

  <pre id="accResult"><div class="copy" onclick="copyText('accResult')">Copy</div>Results...</pre>
</div>

<!-- =============================================
     ITEMS API PANEL
=================================================-->
<div id="panel-items" class="panel">
  <h2>🎒 Items API</h2>

  <label>Item Name</label>
  <input id="item_name">

  <label>Item ID</label>
  <input id="item_id">

  <button onclick="runItems()">Search Items</button>

  <pre id="itemResult"><div class="copy" onclick="copyText('itemResult')">Copy</div>Results...</pre>
</div>

<!-- =============================================
     SDK API PANEL
=================================================-->
<div id="panel-sdk" class="panel">
  <h2>🧩 SDK API</h2>

  <label>Name</label>
  <input id="sdk_name">

  <label>Type</label>
  <input id="sdk_type">

  <label>Offset</label>
  <input id="sdk_offset">

  <label>Size</label>
  <input id="sdk_size">

  <button onclick="runSDK()">Search SDK</button>

  <pre id="sdkResult"><div class="copy" onclick="copyText('sdkResult')">Copy</div>Results...</pre>
</div>

<script>
function openTab(id){
  document.querySelectorAll('.panel').forEach(p => p.classList.remove("active"));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove("active"));
  document.getElementById("panel-"+id).classList.add("active");
  event.target.classList.add("active");
}

function toggleTheme(){
  document.body.classList.toggle("dark");
}

function copyText(id){
  navigator.clipboard.writeText(document.getElementById(id).innerText);
  alert("Copied!");
}

/* PLAYGROUND FUNCTIONS */

async function runAccounts() {
  let url = "/api/accounts?username=" + acc_username.value +
            "&country=" + acc_country.value +
            "&game=" + acc_game.value;

  const r = await fetch(url);
  accResult.innerText = JSON.stringify(await r.json(), null, 2);
}

async function runItems() {
  let url = "/api/items?name=" + item_name.value +
            "&id=" + item_id.value;

  const r = await fetch(url);
  itemResult.innerText = JSON.stringify(await r.json(), null, 2);
}

async function runSDK() {
  let url = "/api/sdk?name=" + sdk_name.value +
            "&type=" + sdk_type.value +
            "&offset=" + sdk_offset.value +
            "&size=" + sdk_size.value;

  const r = await fetch(url);
  sdkResult.innerText = JSON.stringify(await r.json(), null, 2);
}
</script>

</body>
</html>
`);
}
