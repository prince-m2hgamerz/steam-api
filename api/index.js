export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>M2H Steam API – Developer Portal</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
:root {
  --bg:#f5f5f7;
  --text:#1d1d1f;
  --glass:rgba(255,255,255,.55);
  --glass-dark:rgba(30,30,35,.35);
  --border:rgba(0,0,0,.15);
}

/* -------------------------------
     BODY LAYOUT
--------------------------------*/
body {
  margin:0;
  font-family:-apple-system,BlinkMacSystemFont,"Inter",sans-serif;
  background:var(--bg);
  display:flex;
  flex-direction:row;
}

/* -------------------------------
     HEADER (VisionOS style)
--------------------------------*/
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
  color:var(--text);
}

#menuBtn {
  display:none;
  padding:10px 14px;
  font-size:20px;
  background:var(--glass-dark);
  border:none;
  border-radius:12px;
  color:white;
}

/* -------------------------------
     SIDEBAR (Floating Vision UI)
--------------------------------*/
#sidebar {
  position:fixed;
  left:0;
  top:60px;
  width:260px;
  height:calc(100vh - 60px);
  background:var(--glass);
  border-right:1px solid var(--border);
  backdrop-filter:blur(25px);
  padding:25px 18px;
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

/* -------------------------------
     MAIN CONTENT
--------------------------------*/
.main {
  margin-left:260px;
  margin-top:60px;
  padding:40px;
  width:100%;
  max-width:1200px;
}

/* HERO */
.hero h1 {
  font-size:48px;
  font-weight:700;
  text-align:center;
  background:linear-gradient(120deg,#007aff,#ff2d55);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.hero p {
  text-align:center;
  opacity:.7;
  font-size:18px;
}

/* CARDS */
.card {
  background:var(--glass);
  border-radius:18px;
  border:1px solid var(--border);
  backdrop-filter:blur(22px);
  padding:20px;
  margin:25px auto;
  max-width:850px;
}

/* RESPONSIVENESS */
@media(max-width:900px) {
  #sidebar {
    left:-260px;
  }
  #menuBtn {
    display:block;
  }
  .main {
    margin-left:0;
    padding:28px;
  }
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
  <div class="hero">
    <h1>Steam API Developer Portal</h1>
    <p>Apple Developer–style interactive playground for your Accounts, Items & SDK APIs.</p>
  </div>

  <!-- ACCOUNTS -->
  <section id="accounts">
    <h2>🔍 Accounts API</h2>
    <div class="card">
      <label>Username</label>
      <input id="acc_username">

      <label>Country</label>
      <input id="acc_country">

      <label>Game</label>
      <input id="acc_game">

      <button onclick="runAccounts()">Run</button>
      <pre id="accOut">Waiting...</pre>
    </div>
  </section>

  <!-- ITEMS -->
  <section id="items">
    <h2>🎒 Items API</h2>
    <div class="card">
      <label>Item Name</label>
      <input id="item_name">

      <label>Item ID</label>
      <input id="item_id">

      <button onclick="runItems()">Run</button>
      <pre id="itemOut">Waiting...</pre>
    </div>
  </section>

  <!-- SDK -->
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

      <button onclick="runSDK()">Run</button>
      <pre id="sdkOut">Waiting...</pre>
    </div>
  </section>

  <!-- AUTH -->
  <section id="auth">
    <h2>🔐 Authentication</h2>
    <div class="card">
      <p>API Key is optional (Mode C). If used, responses show <code>"authenticated": true</code>.</p>
      <button onclick="generateKey()">Generate API Key</button>
      <pre id="keyOut">No key yet.</pre>
    </div>
  </section>
</div>

<!-- Load Combined UI Scripts -->
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

<!-- Playground Functions -->
<script>
async function runAccounts() {
  streamRender("accOut", { loading: true });

  const res = await fetch(
    \`/api/accounts?username=\${acc_username.value}&country=\${acc_country.value}&game=\${acc_game.value}\`
  ).then(r => r.json());

  streamRender("accOut", res);
}

async function runItems() {
  streamRender("itemOut", { loading: true });

  const res = await fetch(
    \`/api/items?name=\${item_name.value}&id=\${item_id.value}\`
  ).then(r => r.json());

  streamRender("itemOut", res);
}

async function runSDK() {
  streamRender("sdkOut", { loading: true });

  const res = await fetch(
    \`/api/sdk?name=\${sdk_name.value}&type=\${sdk_type.value}&offset=\${sdk_offset.value}&size=\${sdk_size.value}\`
  ).then(r => r.json());

  streamRender("sdkOut", res);
}

async function generateKey() {
  const res = await fetch("/api/generate-key").then(r => r.json());
  streamRender("keyOut", res);
}
</script>
<script>
function toggleSidebar() {
  const sb = document.getElementById("sidebar");
  sb.style.left = (sb.style.left === "0px") ? "-260px" : "0px";
}
</script>

</body>
</html>
`);
}
