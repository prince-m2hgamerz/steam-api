const fs = require("fs");
const path = require("path");

function loadAccounts() {
  const file = path.join(process.cwd(), "data", "accounts.json");
  try {
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

// convert "X days ago" or "online now" strings into days number (0 if now)
function lastOnlineToDays(s) {
  if (!s) return null;
  s = String(s).trim().toLowerCase();
  if (s.includes("now") || s.includes("online")) return 0;
  const m = s.match(/(\d+)\s*day/);
  if (m) return Number(m[1]);
  const mh = s.match(/(\d+)\s*hour/);
  if (mh) return Math.ceil(Number(mh[1]) / 24);
  return null;
}

module.exports = function (req, res) {
  const accounts = loadAccounts();
  const totalAccounts = accounts.length;
  const totalGames = accounts.reduce((sum, a) => sum + (Number(a.total_games) || 0), 0);

  const countries = {};
  accounts.forEach((a) => {
    const c = (a.country || "UNKNOWN").toUpperCase();
    countries[c] = (countries[c] || 0) + 1;
  });

  const withDays = accounts.map((a) => {
    return Object.assign({}, a, { last_online_days: lastOnlineToDays(a.last_online) });
  });

  const mostGames = accounts.slice().sort((x, y) => (Number(y.total_games) || 0) - (Number(x.total_games) || 0))[0] || null;

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify({
    success: true,
    totalAccounts,
    totalGames,
    countries,
    mostGames
  }, null, 2));
};
