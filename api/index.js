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
   Global Theme + Variables
============================================================ */
:root {
  --bg:#f5f5f7;
  --text:#1d1d1f;
  --glass:rgba(255,255,255,.55);
  --glass-dark:rgba(40,40,45,.35);
  --border:rgba(0,0,0,.12);
  --radius:20px;
}

body {
  margin:0;
  background:var(--bg);
  color:var(--text);
  font-family:-apple-system,BlinkMacSystemFont,"Inter",sans-serif;
  display:flex;
  flex-direction:row;
  scroll-behavior:smooth;
}

/* ============================================================
   Floating Glass Header (VisionOS)
============================================================ */
#topBar {
  width:100%;
  height:60px;
  position:fixed;
  top:0;
  left:0;
  background:var(--glass);
  backdrop-filter:blur(24px);
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
  border-radius:14px;
  font-size:20px;
  color:white;
  cursor:pointer;
}

/* ============================================================
   Sidebar Navigation (Responsive)
============================================================ */
#sidebar {
  position:fixed;
  top:60px;
  left:0;
  width:260px;
  height:calc(100vh - 60px);
  background:var(--glass);
  border-right:1px solid var(--border);
  backdrop-filter:blur(24px);
  padding:24px 18px;
  overflow-y:auto;
  transition:left .35s ease;
  z-index:1500;
}

#sidebar a {
  display:block;
  padding:12px;
  margin-bottom:6px;
  border-radius:12px;
  text-decoration:none;
  color:var(--text);
  font-size:15px;
  transition:background .2s;
}

#sidebar a:hover {
  background:rgba(0,0,0,.08);
}

#sidebar a.active {
  background:#007aff;
  color:white;
}

/* ============================================================
   MAIN CONTENT AREA
============================================================ */
.main {
  margin-left:260px;
  margin-top:60px;
  padding:40px;
  width:100%;
  max-width:1200px;
}

/* ============================================================
   HERO SECTION (Modern Gradient)
============================================================ */
.hero {
  text-align:center;
  margin-bottom:45px;
}

.hero h1 {
  font-size:48px;
  font-weight:700;
  background:linear-gradient(140deg,#007aff,#ff2d55);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.hero p {
  opacity:.65;
  font-size:18px;
  max-width:620px;
  margin:0 auto;
}

/* ============================================================
   API SECTION V9 (Premium Modern Design)
============================================================ */
.apiSection {
  margin:55px auto;
  max-width:850px;
}

.sectionHeader {
  display:flex;
  align-items:center;
  gap:16px;
}

.iconBox {
  width:48px;
  height:48px;
  border-radius:14px;
  border:1px solid var(--border);
  background:var(--glass);
  backdrop-filter:blur(20px);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:22px;
}

.sectionHeader h2 {
  margin:0;
  font-size:30px;
}

.subText {
  opacity:.7;
  margin:6px 0 20px;
  font-size:15px;
}

/* ============================================================
   CARD BOX
============================================================ */
.card {
  background:var(--glass);
  border-radius:var(--radius);
  border:1px solid var(--border);
  backdrop-filter:blur(30px);
  padding:22px;
  box-shadow:0 8px 30px rgba(0,0,0,.06);
}

/* Label + Input */
.card label {
  font-weight:600;
  font-size:14px;
  margin-top:12px;
  display:block;
}
.card input {
  width:100%;
  padding:12px;
  border-radius:12px;
  border:1px solid var(--border);
  margin-bottom:10px;
  font-size:15px;
  background:white;
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
  transition:0.2s;
}
.card button:hover {
  background:#0062d1;
}

/* Output Box */
.card pre {
  background:#111;
  color:white !important;
  padding:15px;
  border-radius:14px;
  max-height:300px;
  overflow:auto;
  margin-top:15px;
  font-size:14px;
}

/* ============================================================
   RESPONSIVE FIXES
============================================================ */
@media(max-width:900px) {
  #sidebar { left:-260px; }
  #menuBtn { display:block; }
  .main { margin-left:0; padding:28px; }
  .hero h1 { font-size:38px; }
}

@media(max-width:500px) {
  .hero h1 { font-size:32px; }
  .sectionHeader h2 { font-size:24px; }
  .iconBox { width:40px; height:40px; font-size:18px; }
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
  <p>A premium VisionOS-style developer playground for real-time API exploration.</p>
</section>

<!-- ACCOUNTS SECTION -->
<section class="apiSection" id="accounts">
  <div class="sectionHeader">
    <div class="iconBox">🔍</div>
    <h2>Accounts API</h2>
  </div>
  <p class="subText">Search accounts using username, region, or owned games.</p>

  <div class="card">
    <label>Username</label><input id="acc_username">
    <label>Country</label><input id="acc_country">
    <label>Game</label><input id="acc_game">

    <button onclick="runAccounts()">Execute</button>
    <pre id="accOut">Awaiting query...</pre>
  </div>
</section>

<!-- ITEMS SECTION -->
<section class="apiSection" id="items">
  <div class="sectionHeader">
    <div class="iconBox">🎒</div>
    <h2>Items API</h2>
  </div>
  <p class="subText">Search item details from items.json database.</p>

  <div class="card">
    <label>Item Name</label><input id="item_name">
    <label>Item ID</label><input id="item_id">

    <button onclick="runItems()">Execute</button>
    <pre id="itemOut">Awaiting query...</pre>
  </div>
</section>

<!-- SDK SECTION -->
<section class="apiSection" id="sdk">
  <div class="sectionHeader">
    <div class="iconBox">🧩</div>
    <h2>SDK API</h2>
  </div>
  <p class="subText">Search SDK field metadata by name, type, offset, and size.</p>

  <div class="card">
    <label>Name</label><input id="sdk_name">
    <label>Type</label><input id="sdk_type">
    <label>Offset</label><input id="sdk_offset">
    <label>Size</label><input id="sdk_size">

    <button onclick="runSDK()">Execute</button>
    <pre id="sdkOut">Awaiting query...</pre>
  </div>
</section>

<!-- AUTH SECTION -->
<section class="apiSection" id="auth">
  <div class="sectionHeader">
    <div class="iconBox">🔐</div>
    <h2>Authentication</h2>
  </div>
  <p class="subText">Generate optional API keys for authenticated access (Mode C).</p>

  <div class="card">
    <button onclick="generateKey()">Generate Key</button>
    <pre id="keyOut">Awaiting query...</pre>
  </div>
</section>

</div>

<!-- Load UI Modules -->
<script src="/api/ui?module=sidebar"></script>
<script src="/api/ui?module=drawer"></script>
<script src="/api/ui?module=syntax"></script>

<!-- Worker -->
<script>
const worker = new Worker("/api/ui?module=worker");

function streamRender(target, json) {
  document.getElementById(target).innerText = "";
  worker.postMessage({ target, json });
}

worker.onmessage = e => {
  const { target, chunk, full, done } = e.data;
  const box = document.getElementById(target);
  if (!done) box.innerText += chunk;
  else box.innerText = full;
};
</script>

<!-- PLAYGROUND FUNCTIONS -->
<script>
async function runAccounts() {
  streamRender("accOut", {loading:true});
  const res = await fetch(\`/api/accounts?username=\${acc_username.value}&country=\${acc_country.value}&game=\${acc_game.value}\`).then(r=>r.json());
  streamRender("accOut", res);
}

async function runItems() {
  streamRender("itemOut", {loading:true});
  const res = await fetch(\`/api/items?name=\${item_name.value}&id=\${item_id.value}\`).then(r=>r.json());
  streamRender("itemOut", res);
}

async function runSDK() {
  streamRender("sdkOut", {loading:true});
  const res = await fetch(\`/api/sdk?name=\${sdk_name.value}&type=\${sdk_type.value}&offset=\${sdk_offset.value}&size=\${sdk_size.value}\`).then(r=>r.json());
  streamRender("sdkOut", res);
}

async function generateKey() {
  const res = await fetch("/api/generate-key").then(r=>r.json());
  streamRender("keyOut", res);
}

function toggleSidebar() {
  const sb = document.getElementById("sidebar");
  sb.style.left = (sb.style.left === "0px") ? "-260px" : "0px";
}
</script>

</body>
</html>
`);
}
