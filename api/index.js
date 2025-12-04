export default function handler(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>M2H Steam API – Developer Portal</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

/* -------------------------------
   Modern API Section Layout (V8)
--------------------------------*/
.apiSection {
  margin: 50px auto;
  max-width: 850px;
}

.sectionHeader {
  display:flex;
  align-items:center;
  gap:18px;
  margin-bottom:8px;
}

.sectionHeader h2 {
  margin:0;
  font-size:30px;
  font-weight:600;
}

.iconBox {
  width:48px;
  height:48px;
  border-radius:14px;
  background:var(--glass);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:22px;
  border:1px solid var(--border);
  backdrop-filter:blur(16px);
}

.subText {
  opacity:.7;
  margin-top:0;
  margin-bottom:20px;
  font-size:15px;
}

/* Modern Card */
.card {
  background:var(--glass);
  border-radius:20px;
  border:1px solid var(--border);
  box-shadow:0 20px 40px rgba(0,0,0,.05);
  padding:22px;
  backdrop-filter:blur(25px);
}

/* Responsive Inputs */
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

/* Execute Button */
.card button {
  padding:12px;
  width:100%;
  border-radius:14px;
  border:none;
  background:#007aff;
  color:white;
  font-size:16px;
  margin-top:10px;
  cursor:pointer;
  font-weight:600;
  transition:all .2s;
}

.card button:hover {
  background:#0063cc;
}

/* Pretty Output Box */
.card pre {
  background:#111;
  color:#fff;
  padding:15px;
  border-radius:14px;
  margin-top:15px;
  max-height:300px;
  overflow:auto;
  font-size:14px;
  box-shadow:inset 0 0 20px rgba(255,255,255,0.05);
}

/* Responsive Section */
@media (max-width:900px) {
  .apiSection { margin-top:40px; }
  .sectionHeader h2 { font-size:26px; }
}

@media (max-width:500px) {
  .apiSection { margin-top:30px; }
  .sectionHeader { gap:14px; }
  .sectionHeader h2 { font-size:22px; }
  .iconBox { width:40px; height:40px; font-size:18px; }
}



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
    <p>The fastest lightweight API exploration tool with Apple-style design & real-time playground.</p>
  </section>

  <!-- MODERN SECTION: ACCOUNTS -->
  <section class="apiSection" id="accounts">
    <div class="sectionHeader">
      <div class="iconBox">🔍</div>
      <h2>Accounts API</h2>
    </div>

    <p class="subText">Search Steam accounts using username, region, or owned games.</p>

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

  <!-- MODERN SECTION: ITEMS -->
  <section class="apiSection" id="items">
    <div class="sectionHeader">
      <div class="iconBox">🎒</div>
      <h2>Items API</h2>
    </div>

    <p class="subText">Search item metadata from your items.json database.</p>

    <div class="card">
      <label>Item Name</label>
      <input id="item_name">

      <label>Item ID</label>
      <input id="item_id">

      <button onclick="runItems()">Execute</button>
      <pre id="itemOut">Awaiting query...</pre>
    </div>
  </section>

  <!-- MODERN SECTION: SDK -->
  <section class="apiSection" id="sdk">
    <div class="sectionHeader">
      <div class="iconBox">🧩</div>
      <h2>SDK API</h2>
    </div>

    <p class="subText">Search SDK struct properties such as name, type, offset, and size.</p>

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

  <!-- MODERN SECTION: AUTH -->
  <section class="apiSection" id="auth">
    <div class="sectionHeader">
      <div class="iconBox">🔐</div>
      <h2>Authentication</h2>
    </div>

    <p class="subText">Generate API keys for authenticated requests. Key is optional (Mode C).</p>

    <div class="card">
      <button onclick="generateKey()">Generate Key</button>
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
