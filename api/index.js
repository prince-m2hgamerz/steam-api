export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>M2H Developer Portal – Steam API</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
/* ===========================================================
   APPLE SONOMA DESIGN + GLASS UI + PERFORMANCE OPTIMIZED
=========================================================== */
:root {
  --bg:#f5f5f7;
  --text:#1d1d1f;
  --card:rgba(255,255,255,0.55);
  --border:rgba(0,0,0,0.12);
  --shadow:rgba(0,0,0,0.1);
  --hero:linear-gradient(120deg,#007aff,#ff2d55);
}

.dark {
  --bg:#0d0d0f;
  --text:#fafafa;
  --card:rgba(25,25,30,0.55);
  --border:rgba(255,255,255,0.2);
  --shadow:rgba(0,0,0,0.6);
  --hero:linear-gradient(120deg,#0a84ff,#ff375f);
}

body {
  margin:0;
  background:var(--bg);
  color:var(--text);
  font-family:-apple-system,BlinkMacSystemFont,"Inter",sans-serif;
  transition:background 0.4s;
}

/* NAVIGATION */
.navbar {
  padding:18px;
  font-size:20px;
  font-weight:600;
  text-align:center;
  background:var(--card);
  backdrop-filter:blur(20px);
  border-bottom:1px solid var(--border);
  position:sticky;
  top:0;
  z-index:50;
}

.toggle {
  width:52px;
  height:28px;
  border-radius:20px;
  border:1px solid var(--border);
  background:rgba(255,255,255,0.4);
  backdrop-filter:blur(10px);
  position:absolute;
  top:14px;
  right:16px;
  cursor:pointer;
}
.toggle-btn {
  width:22px;
  height:22px;
  background:white;
  border-radius:50%;
  margin:3px;
  transition:0.3s;
}
.dark .toggle-btn { transform:translateX(24px); }

/* HERO SECTION */
.hero {
  text-align:center;
  padding:90px 20px;
}
.hero h1 {
  font-size:64px;
  font-weight:700;
  background:var(--hero);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.hero p {
  font-size:22px;
  opacity:0.7;
  margin-top:-10px;
  animation:fadeIn 1.2s ease;
}

@keyframes fadeIn {
  from{opacity:0;transform:translateY(10px);}
  to{opacity:1;transform:translateY(0);}
}

/* SECTION TITLES */
.section-title {
  font-size:34px;
  text-align:center;
  margin-top:50px;
  margin-bottom:20px;
  font-weight:600;
}

/* CARDS */
.card {
  max-width:1100px;
  padding:30px;
  margin:25px auto;
  background:var(--card);
  border:1px solid var(--border);
  border-radius:20px;
  backdrop-filter:blur(18px);
  box-shadow:0 8px 40px var(--shadow);
}

/* INPUTS */
input {
  width:100%;
  padding:12px;
  margin-top:8px;
  border-radius:14px;
  border:1px solid var(--border);
}

/* BUTTONS */
button {
  padding:14px;
  width:100%;
  background:#007aff;
  color:white;
  border:none;
  border-radius:14px;
  margin-top:20px;
  font-size:16px;
}
button:hover { background:#0060d1; }

/* LOADING SPINNER */
.loader {
  width:26px;
  height:26px;
  border:3px solid rgba(255,255,255,0.3);
  border-top-color:#fff;
  border-radius:50%;
  animation:spin 0.7s linear infinite;
  margin:auto;
  display:none;
}
@keyframes spin { to{transform:rotate(360deg);} }

/* PRE (Virtualized Output) */
pre {
  background:#1d1d1f;
  padding:16px;
  border-radius:14px;
  color:white;
  max-height:260px;
  overflow:auto;
}
</style>
</head>

<body>

<div class="navbar">
  M2H Developer Portal
  <div class="toggle" onclick="toggleTheme()">
    <div class="toggle-btn"></div>
  </div>
</div>

<div class="hero">
  <h1>Steam API Suite</h1>
  <p>The fastest Apple-inspired API playground with Accounts, Items, and SDK search.</p>
</div>

<!-- ================================
     FEATURES
================================ -->
<h2 class="section-title">✨ Features</h2>
<div class="card">
  <ul>
    <li>⚡ Ultra-fast API responses</li>
    <li>🍏 Apple macOS Sonoma UI</li>
    <li>🎮 Account, Item & SDK search</li>
    <li>🧪 Live playground with async rendering</li>
    <li>📦 Clean JSON output</li>
    <li>🚀 Zero UI lag – virtualized rendering</li>
    <li>📋 Copy-to-clipboard buttons</li>
  </ul>
</div>

<!-- ================================
     ACCOUNTS API PLAYGROUND
================================ -->
<h2 class="section-title">🔍 Accounts API Playground</h2>
<div class="card">
  <label>Username</label>
  <input id="acc_username">

  <label>Country</label>
  <input id="acc_country">

  <label>Game</label>
  <input id="acc_game">

  <button onclick="runAccounts()">Search Accounts</button>

  <div class="loader" id="accLoader"></div>
  <pre id="accOut">Awaiting input...</pre>
</div>

<!-- ================================
     ITEMS API PLAYGROUND
================================ -->
<h2 class="section-title">🎒 Items API Playground</h2>
<div class="card">
  <label>Item Name</label>
  <input id="item_name">

  <label>Item ID</label>
  <input id="item_id">

  <button onclick="runItems()">Search Items</button>

  <div class="loader" id="itemLoader"></div>
  <pre id="itemOut">Awaiting input...</pre>
</div>

<!-- ================================
     SDK API PLAYGROUND
================================ -->
<h2 class="section-title">🧩 SDK API Playground</h2>
<div class="card">
  <label>Name</label>
  <input id="sdk_name">

  <label>Type</label>
  <input id="sdk_type">

  <label>Offset</label>
  <input id="sdk_offset">

  <label>Size</label>
  <input id="sdk_size">

  <button onclick="runSDK()">Search SDK</button>

  <div class="loader" id="sdkLoader"></div>
  <pre id="sdkOut">Awaiting input...</pre>
</div>

<script>
/* THEME TOGGLE */
function toggleTheme(){
  document.body.classList.toggle("dark");
}

/* VIRTUALIZED RENDERING (LAG FIX) */
function renderJSON(target, data){
  const element = document.getElementById(target);
  const str = JSON.stringify(data, null, 2);
  const chunkSize = 600;  
  let index = 0;

  element.innerText = "";

  function appendChunk(){
    if(index < str.length){
      element.innerText += str.slice(index, index + chunkSize);
      index += chunkSize;
      requestAnimationFrame(appendChunk);
    }
  }
  requestAnimationFrame(appendChunk);
}

/* PLAYGROUND FUNCTIONS */
async function runAccounts(){
  accLoader.style.display = "block";
  const url = \`/api/accounts?username=\${acc_username.value}&country=\${acc_country.value}&game=\${acc_game.value}\`;
  const res = await fetch(url).then(r => r.json());
  accLoader.style.display = "none";
  renderJSON("accOut", res);
}

async function runItems(){
  itemLoader.style.display = "block";
  const url = \`/api/items?name=\${item_name.value}&id=\${item_id.value}\`;
  const res = await fetch(url).then(r => r.json());
  itemLoader.style.display = "none";
  renderJSON("itemOut", res);
}

async function runSDK(){
  sdkLoader.style.display = "block";
  const url = \`/api/sdk?name=\${sdk_name.value}&type=\${sdk_type.value}&offset=\${sdk_offset.value}&size=\${sdk_size.value}\`;
  const res = await fetch(url).then(r => r.json());
  sdkLoader.style.display = "none";
  renderJSON("sdkOut", res);
}
</script>

</body>
</html>
`);
}
