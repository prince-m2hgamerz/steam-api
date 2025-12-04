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
  --card:rgba(255,255,255,.55);
  --border:rgba(0,0,0,.15);
  --shadow:rgba(0,0,0,.1);
}

body {
  margin:0;
  background:var(--bg);
  color:var(--text);
  font-family:-apple-system,BlinkMacSystemFont,"Inter",sans-serif;
  display:flex;
}

/* Sidebar */
#sidebar {
  width:260px;
  height:100vh;
  position:fixed;
  left:0;
  top:0;
  overflow-y:auto;
  background:var(--card);
  backdrop-filter:blur(22px);
  border-right:1px solid var(--border);
  padding:25px 18px;
}
#sidebar a {
  display:block;
  padding:10px;
  margin-bottom:4px;
  border-radius:10px;
  text-decoration:none;
  color:var(--text);
  font-size:15px;
}
#sidebar a.active {
  background:#007aff;
  color:white;
}

/* Main */
.main {
  margin-left:260px;
  padding:40px;
  width:100%;
}

/* Hero */
.hero {
  text-align:center;
  margin-bottom:50px;
}
.hero h1 {
  font-size:52px;
  font-weight:700;
  background:linear-gradient(120deg,#007aff,#ff2d55);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.hero p {
  opacity:.7;
  font-size:20px;
}

/* Cards */
.card {
  background:var(--card);
  backdrop-filter:blur(20px);
  border:1px solid var(--border);
  border-radius:18px;
  padding:20px;
  margin:25px auto;
  max-width:850px;
}

/* Inputs */
input {
  width:100%;
  padding:12px;
  border-radius:12px;
  border:1px solid var(--border);
  margin:6px 0 14px;
  font-size:15px;
}

/* Button */
button {
  padding:12px;
  width:100%;
  border-radius:12px;
  border:none;
  background:#007aff;
  color:#fff;
  font-size:16px;
  cursor:pointer;
}
button:hover { opacity:.9; }

/* Output */
pre {
  background:#1d1d1f;
  color:#fff;
  padding:14px;
  border-radius:12px;
  overflow:auto;
  max-height:280px;
  font-size:14px;
  margin-top:15px;
}
</style>
</head>

<body>

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

</body>
</html>
`);
}
