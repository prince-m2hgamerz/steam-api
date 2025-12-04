module.exports = (req, res) => {
  res.setHeader("Content-Type", "text/html");

  res.write(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Steam Account Search – M2H UI</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
  body {
    margin: 0;
    background: #11121a;
    font-family: 'Inter', sans-serif;
    color: #fff;
  }

  .container {
    width: 90%;
    max-width: 900px;
    margin: auto;
    padding: 30px 0;
  }

  h1 {
    text-align: center;
    background: linear-gradient(90deg, #7afcff, #fe7eff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 40px;
    margin-bottom: 25px;
  }

  .card {
    background: rgba(255,255,255,0.05);
    padding: 20px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 25px;
  }

  label { display:block; margin-top:10px; font-size:14px; opacity:0.8; }

  input {
    width: 100%;
    padding: 10px;
    margin-top: 4px;
    border-radius: 8px;
    border: none;
    background: rgba(255,255,255,0.1);
    color: #fff;
  }

  button {
    width: 100%;
    padding: 12px;
    margin-top: 15px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    background: linear-gradient(90deg, #7afcff, #fe7eff);
    color: #111;
    font-weight: bold;
  }

  #results {
    margin-top: 30px;
  }

  .result-card {
    background: rgba(255,255,255,0.06);
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 15px;
    border-left: 4px solid #7afcff;
  }

  .result-card h3 {
    margin: 0;
    padding: 0;
    font-size: 20px;
    color: #7afcff;
  }

  .games {
    opacity: 0.8;
    font-size: 14px;
    margin-top: 6px;
  }
</style>

</head>
<body>

<div class="container">

<h1>Steam API Search</h1>

<div class="card">
  <label>Search by Username</label>
  <input type="text" id="username" placeholder="mpqdv, y7orr92j4">

  <label>Search by Game</label>
  <input type="text" id="game" placeholder="Rust, Metro, CS2">

  <label>Country Code</label>
  <input type="text" id="country" placeholder="PH, RU, CN">

  <label>Min Games</label>
  <input type="number" id="min_games" placeholder="0">

  <label>Max Games</label>
  <input type="number" id="max_games" placeholder="50">

  <button onclick="runSearch()">Search</button>
  <button onclick="getRandom()" style="margin-top:10px;background:#7afcff;color:#111;">Get Random Account</button>
</div>

<div id="results"></div>

</div>

<script>
async function runSearch() {
  const username = document.getElementById("username").value.trim();
  const game = document.getElementById("game").value.trim();
  const country = document.getElementById("country").value.trim();
  const min_games = document.getElementById("min_games").value.trim();
  const max_games = document.getElementById("max_games").value.trim();

  let url = "/api/search?";
  if (username) url += "username=" + encodeURIComponent(username) + "&";
  if (game) url += "game=" + encodeURIComponent(game) + "&";
  if (country) url += "country=" + encodeURIComponent(country) + "&";
  if (min_games) url += "min_games=" + min_games + "&";
  if (max_games) url += "max_games=" + max_games + "&";

  const res = await fetch(url);
  const data = await res.json();

  renderResults(data.data || []);
}

async function getRandom() {
  const res = await fetch("/api/search?random=true");
  const data = await res.json();
  renderResults([data.random]);
}

function renderResults(results) {
  const box = document.getElementById("results");
  box.innerHTML = "<h2>Results (" + results.length + ")</h2>";

  if (results.length === 0) {
    box.innerHTML += "<p>No results found.</p>";
    return;
  }

  results.forEach(acc => {
    box.innerHTML +=
      '<div class="result-card">' +
      '<h3>' + acc.username + '</h3>' +
      '<p><b>Country:</b> ' + acc.country + '</p>' +
      '<p><b>Status:</b> ' + acc.status + '</p>' +
      '<p><b>Total Games:</b> ' + acc.total_games + '</p>' +
      '<p><b>Last Online:</b> ' + acc.last_online + '</p>' +
      '<p class="games"><b>Games:</b> ' + acc.games.join(", ") + '</p>' +
      '</div>';
  });
}
</script>

</body>
</html>
  `);

  res.end();
};
