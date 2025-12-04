export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>M2H Developer Portal – Steam API</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- =============================
  GLOBAL STYLES
============================== -->
<style>
:root {
  --bg:#f5f5f7;
  --text:#1d1d1f;
  --card:rgba(255,255,255,0.5);
  --border:rgba(0,0,0,0.15);
  --shadow:rgba(0,0,0,0.1);
  --hero:linear-gradient(120deg,#007aff,#ff2d55);
}

.dark {
  --bg:#0d0d0f;
  --text:#fafafa;
  --card:rgba(20,20,25,0.55);
  --border:rgba(255,255,255,0.15);
  --shadow:rgba(0,0,0,0.5);
  --hero:linear-gradient(120deg,#0a84ff,#ff375f);
}

body {
  margin:0;
  background:var(--bg);
  color:var(--text);
  font-family:-apple-system,BlinkMacSystemFont,"Inter",sans-serif;
  display:flex;
}

/* SIDEBAR (Apple Developer Docs Style) */
.sidebar {
  width:260px;
  height:100vh;
  position:fixed;
  left:0;
  top:0;
  overflow-y:auto;
  background:var(--card);
  backdrop-filter:blur(20px);
  border-right:1px solid var(--border);
  padding:20px;
}
.sidebar h2 {
  font-size:20px;
  margin-bottom:10px;
  opacity:0.8;
}
.sidebar a {
  display:block;
  padding:10px 8px;
  border-radius:8px;
  text-decoration:none;
  color:var(--text);
  font-size:15px;
  margin-bottom:4px;
}
.sidebar a.active {
  background:#007aff;
  color:white;
}

/* MAIN CONTENT */
.main {
  margin-left:260px;
  padding:30px;
  width:100%;
}

/* HERO */
.hero {
  text-align:center;
  margin-bottom:60px;
}
.hero h1 {
  font-size:58px;
  font-weight:700;
  background:var(--hero);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.hero p {
  font-size:20px;
  opacity:0.7;
}

/* CARDS */
.card {
  max-width:900px;
  margin:25px auto;
  padding:25px;
  border-radius:20px;
  background:var(--card);
  backdrop-filter:blur(20px);
  border:1px solid var(--border);
}

/* INPUTS */
input {
  width:100%;
  padding:12px;
  border-radius:12px;
  margin-top:5px;
  border:1px solid var(--border);
}

/* BUTTON */
button {
  padding:14px;
  width:100%;
  margin-top:15px;
  background:#007aff;
  color:white;
  border:none;
  border-radius:12px;
  font-size:16px;
}

/* PREVIEW */
pre {
  background:#1d1d1f;
  padding:16px;
  border-radius:12px;
  color:white;
  max-height:240px;
  overflow:auto;
  font-size:14px;
}
</style>
</head>

<body>

<div class="sidebar" id="sidebar"></div>

<div class="main">

  <div class="hero">
    <h1>Steam API Suite</h1>
    <p>Apple Developer Docs–style API portal with modular UI & zero lag response rendering.</p>
  </div>

  <!-- CONTENT SECTIONS -->
  <section id="accounts">
    <h2>🔍 Accounts API</h2>
    <div class="card">
      <label>Username</label>
      <input id="acc_username">
      <label>Country</label>
      <input id="acc_country">
      <label>Game</label>
      <input id="acc_game">
      <button onclick="runAccounts()">Run Request</button>
      <pre id="accOut">Ready...</pre>
    </div>
  </section>

  <section id="items">
    <h2>🎒 Items API</h2>
    <div class="card">
      <label>Item Name</label>
      <input id="item_name">
      <label>Item ID</label>
      <input id="item_id">
      <button onclick="runItems()">Run Request</button>
      <pre id="itemOut">Ready...</pre>
    </div>
  </section>

  <section id="sdk">
    <h2>🧩 SDK API</h2>
    <div class="card">
      <label>Name</label>
      <input id="sdk_name">
      <label>Type</label>
      <input id="sdk_type">
      <label>Offset</label>
      <input id="sdk_offset">
      <label>Size</label>
      <input id="sdk_size">
      <button onclick="runSDK()">Run Request</button>
      <pre id="sdkOut">Ready...</pre>
    </div>
  </section>

  <section id="auth">
    <h2>🔐 API Authentication</h2>
    <div class="card">
      <p>Your API key is optional. If provided, responses include <code>"authenticated": true</code></p>
      <button onclick="generateKey()">Generate New API Key</button>
      <pre id="keyOut">No key generated.</pre>
    </div>
  </section>

</div>

<!-- =============================
   LOAD JS MODULES
============================== -->
<script src="/api/sidebar.js"></script>
<script src="/api/syntax.js"></script>
<script src="/api/drawer.js"></script>

<!-- Web Worker -->
<script>
const worker = new Worker("/api/ui-worker.js");

function render(target, json){
  worker.postMessage({ target, json });
}

worker.onmessage = (e)=>{
  const { target, chunk, done } = e.data;
  const el = document.getElementById(target);
  if (!done) el.innerText += chunk;
  else el.innerText = e.data.full;
};
</script>

<!-- PLAYGROUND FUNCTIONS -->
<script>
async function runAccounts(){
  document.getElementById("accOut").innerText = "";
  const res = await fetch(
    \`/api/accounts?username=\${acc_username.value}&country=\${acc_country.value}&game=\${acc_game.value}\`
  ).then(r=>r.json());
  render("accOut", res);
}

async function runItems(){
  document.getElementById("itemOut").innerText = "";
  const res = await fetch(
    \`/api/items?name=\${item_name.value}&id=\${item_id.value}\`
  ).then(r=>r.json());
  render("itemOut", res);
}

async function runSDK(){
  document.getElementById("sdkOut").innerText = "";
  const res = await fetch(
    \`/api/sdk?name=\${sdk_name.value}&type=\${sdk_type.value}&offset=\${sdk_offset.value}&size=\${sdk_size.value}\`
  ).then(r=>r.json());
  render("sdkOut", res);
}

async function generateKey(){
  const res = await fetch("/api/generate-key").then(r=>r.json());
  document.getElementById("keyOut").innerText = res.key;
}
</script>

</body>
</html>
`);
}
