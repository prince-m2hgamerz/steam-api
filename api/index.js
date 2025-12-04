export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>M2H Steam API – Developer Console</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />

<style>
/* ============================================================
   Global Theme
============================================================ */
:root {
  --bg:#f5f5f7;
  --text:#1d1d1f;
  --glass:rgba(255,255,255,.55);
  --glass-dark:rgba(30,30,35,.35);
  --border:rgba(0,0,0,.15);
}

body {
  margin:0;
  background:var(--bg);
  font-family:-apple-system,BlinkMacSystemFont,"Inter",sans-serif;
  display:flex;
}

/* ============================================================
   Floating Glass Header (Vision Pro Style)
============================================================ */
#topBar {
  width:100%;
  height:60px;
  position:fixed;
  top:0;
  left:0;
  background:var(--glass);
  backdrop-filter:blur(22px);
  border-bottom:1px solid var(--border);
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 22px;
  z-index:2000;
}

#topBar .title {
  font-size:20px;
  font-weight:600;
}

#menuBtn {
  display:none;
  padding:10px 14px;
  background:var(--glass-dark);
  border:none;
  border-radius:12px;
  font-size:20px;
  color:white;
}

/* ============================================================
   Sidebar Navigation
============================================================ */
#sidebar {
  position:fixed;
  left:0;
  top:60px;
  width:260px;
  height:calc(100vh - 60px);
  background:var(--glass);
  border-right:1px solid var(--border);
  backdrop-filter:blur(25px);
  padding:24px 18px;
  overflow-y:auto;
  transition:left .35s ease;
  z-index:1500;
}

#sidebar a {
  display:block;
  padding:10px;
  margin-bottom:6px;
  border-radius:12px;
  text-decoration:none;
  font-size:15px;
  color:var(--text);
}

#sidebar a.active {
  background:#007aff;
  color:white;
}

/* ============================================================
   Main Content Area
============================================================ */
.main {
  margin-left:260px;
  margin-top:60px;
  padding:40px;
  width:100%;
  max-width:1200px;
}

/* HERO */
.hero {
  text-align:center;
  margin-bottom:40px;
}
.hero h1 {
  font-size:48px;
  background:linear-gradient(120deg,#007aff,#ff2d55);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  font-weight:700;
}
.hero p {
  opacity:.7;
  font-size:18px;
}

/* ============================================================
   API Sections (Modern UI V8)
============================================================ */
.apiSection {
  margin:50px auto;
  max-width:850px;
}

.sectionHeader {
  display:flex;
  align-items:center;
  gap:18px;
  margin-bottom:10px;
}

.iconBox {
  width:48px;
  height:48px;
  border-radius:14px;
  background:var(--glass);
  border:1px solid var(--border);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:22px;
  backdrop-filter:blur(16px);
}

.sectionHeader h2 {
  font-size:30px;
  margin:0;
}

.subText {
  opacity:.7;
  margin-bottom:20px;
}

/* Card */
.card {
  background:var(--glass);
  border-radius:20px;
  border:1px solid var(--border);
  backdrop-filter:blur(25px);
  padding:22px;
  box-shadow:0 20px 40px rgba(0,0,0,.05);
}

/* Inputs */
.card label {
  font-weight:600;
  font-size:14px;
  display:block;
  margin-top:12px;
}
.card input {
  width:100%;
  padding:12px;
  border-radius:12px;
  border:1px solid var(--border);
  margin-bottom:10px;
  font-size:15px;
}

/* Button */
.card button {
  width:100%;
  padding:12px;
  margin-top:10px;
  border:none;
  border-radius:14px;
  background:#007aff;
  color:white;
  font-size:16px;
  font-weight:600;
  cursor:pointer;
  transition:background .2s;
}
.card button:hover {
  background:#0063cc;
}

/* Output */
.card pre {
  background:#111;
  padding:15px;
  margin-top:15px;
  border-radius:14px;
  max-height:300px;
  overflow:auto;
  font-size:14px;
}

/* ============================================================
   RESPONSIVE
============================================================ */
@media(max-width:900px) {
  #sidebar { left:-300px; }
  #menuBtn { display:block; }
  .main { margin-left:0; padding:28px; }
}
@media(max-width:600px) {
  .hero h1 { font-size:36px; }
  .hero p { font-size:16px; }
}
</style>

</head>

<body>

<header id="topBar">
  <div class="title">M2H Steam API</div>
  <button id="menuBtn" onclick="toggleSidebar()">☰</button>
</header>

<div id="sidebar"></div>

<div class="main">

<!-- HERO -->
<section class="hero">
  <h1>Steam API Developer Console</h1>
  <p>Premium VisionOS-style interface with real-time API testing.</p>
</section>

<!-- ACCOUNTS API -->
<section class="apiSection" id="accounts">
  <div class="sectionHeader">
    <div class="iconBox">🔍</div>
    <h2>Accounts API</h2>
  </div>
  <p class="subText">Search Steam accounts by username, region and owned games.</p>

  <div class="card">
    <label>Username</label>
    <input id="acc_username">

    <label>Country</label>
    <input id="acc_country">

    <label>Game</label>
    <input id="acc_game">

    <button onclick="runAccounts()">Execute</button>
    <pre id="accOut">Awaiting query...</pre>
  </div>
</section>

<!-- ITEMS API -->
<section class="apiSection" id="items">
  <div class="sectionHeader">
    <div class="iconBox">🎒</div>
    <h2>Items API</h2>
  </div>
  <p class="subText">Search game item definitions from items.json.</p>

  <div class="card">
    <label>Item Name</label>
    <input id="item_name">

    <label>Item ID</label>
    <input id="item_id">

    <button onclick="runItems()">Execute</button>
    <pre id="itemOut">Awaiting query...</pre>
  </div>
</section>

<!-- SDK API -->
<section class="apiSection" id="sdk">
  <div class="sectionHeader">
    <div class="iconBox">🧩</div>
    <h2>SDK API</h2>
  </div>
  <p class="subText">Search SDK fields by type, offset, size, or name.</p>

  <div class="card">
    <label>Name</label>
    <input id="sdk_name">

    <label>Type</label>
    <input id="sdk_type">

    <label>Offset</label>
    <input id="sdk_offset">

    <label>Size</label>
    <input id="sdk_size">

    <button onclick="runSDK()">Execute</button>
    <pre id="sdkOut">Awaiting query...</pre>
  </div>
</section>

<!-- AUTH API -->
<section class="apiSection" id="auth">
  <div class="sectionHeader">
    <div class="iconBox">🔐</div>
    <h2>Authentication</h2>
  </div>
  <p class="subText">Generate optional API keys for authenticated access (Mode C).</p>

  <div class="card">
    <button onclick="generateKey()">Generate Key</button>
    <pre id="keyOut">No key generated yet.</pre>
  </div>
</section>

</div>

<!-- Load combined UI -->
<script src="/api/ui?module=sidebar"></script>
<script src="/api/ui?module=drawer"></script>
<script src="/api/ui?module=syntax"></script>

<!-- Worker -->
<script>
const worker = new Worker("/api/ui?module=worker");

function streamRender(target, json) {
  document.getElementById(target).innerHTML = "";
  worker.postMessage({ target, json });
}

worker.onmessage = e => {
  const { target, chunk, full, done } = e.data;
  const box = document.getElementById(target);

  if (!done) box.innerText += chunk;
  else box.innerText = full;
};
</script>

<!-- PLAYGROUND -->
<script>
async function runAccounts() {
  streamRender("accOut", { loading:true });
  const res = await fetch(
    \`/api/accounts?username=\${acc_username.value}&country=\${acc_country.value}&game=\${acc_game.value}\`
  ).then(r=>r.json());
  streamRender("accOut", res);
}

async function runItems() {
  streamRender("itemOut", { loading:true });
  const res = await fetch(
    \`/api/items?name=\${item_name.value}&id=\${item_id.value}\`
  ).then(r=>r.json());
  streamRender("itemOut", res);
}

async function runSDK() {
  streamRender("sdkOut", { loading:true });
  const res = await fetch(
    \`/api/sdk?name=\${sdk_name.value}&type=\${sdk_type.value}&offset=\${sdk_offset.value}&size=\${sdk_size.value}\`
  ).then(r=>r.json());
  streamRender("sdkOut", res);
}

async function generateKey() {
  const res = await fetch("/api/generate-key").then(r=>r.json());
  streamRender("keyOut", res);
}

function toggleSidebar() {
  const sb = document.getElementById("sidebar");
  sb.style.left = sb.style.left === "0px" ? "-260px" : "0px";
}
</script>

</body>
</html>
`);
}
