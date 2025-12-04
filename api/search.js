const fs = require("fs");
const path = require("path");

// Utility Functions
function loadAccounts() {
  const file = path.join(process.cwd(), "data", "accounts.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function parseDays(str) {
  if (!str) return null;
  const s = str.toLowerCase();

  if (s.includes("now")) return 0;

  const d = s.match(/(\d+)\s*day/);
  if (d) return Number(d[1]);

  const h = s.match(/(\d+)\s*hour/);
  if (h) return Math.ceil(Number(h[1]) / 24);

  return null;
}

function parseBalance(bal) {
  if (!bal) return null;
  const cleaned = bal.replace(/[^0-9.,-]/g, "").replace(",", ".");
  const num = Number(cleaned);
  return isNaN(num) ? null : num;
}

function levenshtein(a, b) {
  if (!a) return b.length;
  if (!b) return a.length;

  a = a.toLowerCase();
  b = b.toLowerCase();

  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[m][n];
}

module.exports = (req, res) => {
  const t0 = Date.now();
  const accounts = loadAccounts();

  let {
    username,
    game,
    country,
    status,
    config_by,
    min_games,
    max_games,
    min_days,
    max_days,
    min_balance,
    max_balance,
    random,
    limit = 20,
    page = 1
  } = req.query;

  limit = Math.min(Number(limit) || 20, 100);
  page = Number(page) || 1;

  let result = accounts.map(acc => ({
    ...acc,
    days: parseDays(acc.last_online),
    balance_num: parseBalance(acc.balance)
  }));

  // Username Search (fuzzy + exact)
  if (username) {
    result = result.filter(acc => acc.username.toLowerCase().includes(username.toLowerCase()));
  }

  // Games filter (support multiple)
  if (game) {
    const gameList = game.toLowerCase().split(",");

    result = result.filter(acc => {
      const lowerGames = acc.games.map(g => g.toLowerCase());
      return gameList.some(g =>
        lowerGames.some(x => x.includes(g) || levenshtein(x, g) <= 3)
      );
    });
  }

  // Country
  if (country) {
    result = result.filter(acc => acc.country.toLowerCase() === country.toLowerCase());
  }

  // Status
  if (status) {
    result = result.filter(acc => acc.status.toLowerCase() === status.toLowerCase());
  }

  // Config by
  if (config_by) {
    result = result.filter(acc => acc.config_by.toLowerCase() === config_by.toLowerCase());
  }

  // Game count range
  if (min_games) result = result.filter(acc => acc.total_games >= Number(min_games));
  if (max_games) result = result.filter(acc => acc.total_games <= Number(max_games));

  // Days range
  if (min_days) result = result.filter(acc => acc.days >= Number(min_days));
  if (max_days) result = result.filter(acc => acc.days <= Number(max_days));

  // Balance filter
  if (min_balance) result = result.filter(acc => acc.balance_num >= Number(min_balance));
  if (max_balance) result = result.filter(acc => acc.balance_num <= Number(max_balance));

  // Random mode
  if (random === "true") {
    const picked = result[Math.floor(Math.random() * result.length)];
    return res.status(200).json({
      success: true,
      random: picked
    });
  }

  // Pagination
  const total = result.length;
  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + limit);

  const t1 = Date.now();

  res.status(200).json({
    success: true,
    total,
    page,
    limit,
    time_ms: t1 - t0,
    data: paginated
  });
};
