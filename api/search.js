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

// Safe lowercase includes
function includesCI(haystack, needle) {
  if (!haystack || !needle) return false;
  return String(haystack).toLowerCase().includes(String(needle).toLowerCase());
}

// Simple Levenshtein distance for fuzzy matching (small, pure-js)
function levenshtein(a, b) {
  if (!a) a = "";
  if (!b) b = "";
  a = String(a);
  b = String(b);
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
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

// parse last_online strings like "15 days ago" => number of days
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

// Attempt to parse a numeric value from balance string (best-effort)
function parseBalanceNumber(bal) {
  if (bal === undefined || bal === null) return null;
  const s = String(bal).replace(/\s+/g, "");
  // remove currency symbols and letters, keep digits, dot and comma
  const cleaned = s.replace(/[^0-9.,-]/g, "");
  // If comma used as decimal (common), convert to dot if there is exactly one comma and no dot
  const commaCount = (cleaned.match(/,/g) || []).length;
  const dotCount = (cleaned.match(/\./g) || []).length;
  let normalized = cleaned;
  if (commaCount === 1 && dotCount === 0) {
    normalized = cleaned.replace(",", ".");
  } else {
    // remove commas as thousand separators
    normalized = cleaned.replace(/,/g, "");
  }
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

// API key protect (if API_KEY env var set)
function checkApiKey(req) {
  const envKey = process.env.API_KEY;
  if (!envKey) return { ok: true };
  const qk = (req.query && req.query.key) || null;
  const header = req.headers && (req.headers['x-api-key'] || req.headers['X-API-KEY'] || req.headers['x-api_key']);
  if (qk === envKey || header === envKey) return { ok: true };
  return { ok: false, message: "Invalid or missing API key" };
}

module.exports = function (req, res) {
  // parse query params
  const q = Object.assign({}, req.query || {});
  // Normalize types
  const username = q.username || null;
  const game = q.game || null;
  const country = q.country || null;
  const status = q.status || null;
  const config_by = q.config_by || q.configBy || null;
  const min_games = q.min_games ? Number(q.min_games) : (q.minGames ? Number(q.minGames) : null);
  const max_games = q.max_games ? Number(q.max_games) : (q.maxGames ? Number(q.maxGames) : null);
  const sort = q.sort || null; // username | total_games | last_online_days
  const order = (q.order || "asc").toLowerCase() === "desc" ? "desc" : "asc";
  const page = Math.max(1, Number(q.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(q.limit) || 10)); // limit to 100 max
  const fuzzy = (q.fuzzy === "true" || q.fuzzy === "1" || q.fuzzy === true);

  // API key check
  const keyCheck = checkApiKey(req);
  if (!keyCheck.ok) {
    res.statusCode = 403;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: false, error: keyCheck.message }));
    return;
  }

  const accounts = loadAccounts();

  // start filtering
  let result = accounts.slice();

  // username filter
  if (username) {
    const u = String(username).toLowerCase();
    result = result.filter(acc => (acc.username || "").toLowerCase().includes(u));
  }

  // country filter
  if (country) {
    const c = String(country).toUpperCase();
    result = result.filter(acc => ((acc.country || "").toUpperCase()) === c);
  }

  // status filter
  if (status) {
    const s = String(status).toLowerCase();
    result = result.filter(acc => ((acc.status || "").toLowerCase()) === s);
  }

  // config_by filter
  if (config_by) {
    const cb = String(config_by).toLowerCase();
    result = result.filter(acc => ((acc.config_by || "").toLowerCase()) === cb);
  }

  // game filter (contains or fuzzy)
  if (game) {
    const g = String(game).toLowerCase();
    if (!fuzzy) {
      result = result.filter(acc =>
        Array.isArray(acc.games) && acc.games.some(gg => String(gg).toLowerCase().includes(g))
      );
    } else {
      // fuzzy: accept game if any game name has a small levenshtein distance to query
      result = result.filter(acc => {
        if (!Array.isArray(acc.games)) return false;
        for (let gg of acc.games) {
          const name = String(gg).toLowerCase();
          if (name.includes(g)) return true; // exact substring quick pass
          // allow matches if distance is small relative to length
          const dist = levenshtein(name, g);
          const threshold = Math.max(1, Math.floor(Math.min(name.length, g.length) * 0.35));
          if (dist <= threshold) return true;
        }
        return false;
      });
    }
  }

  // min/max games filter
  if (!Number.isNaN(min_games) && min_games !== null) {
    result = result.filter(acc => (Number(acc.total_games) || 0) >= min_games);
  }
  if (!Number.isNaN(max_games) && max_games !== null) {
    result = result.filter(acc => (Number(acc.total_games) || 0) <= max_games);
  }

  // optional balance range filter (min_balance, max_balance)
  const min_balance = (q.min_balance !== undefined) ? parseFloat(q.min_balance) : null;
  const max_balance = (q.max_balance !== undefined) ? parseFloat(q.max_balance) : null;
  if ((min_balance !== null && !Number.isNaN(min_balance)) || (max_balance !== null && !Number.isNaN(max_balance))) {
    result = result.filter(acc => {
      const n = parseBalanceNumber(acc.balance);
      if (n === null) return false;
      if (min_balance !== null && !Number.isNaN(min_balance) && n < min_balance) return false;
      if (max_balance !== null && !Number.isNaN(max_balance) && n > max_balance) return false;
      return true;
    });
  }

  // add last_online_days field for sorting if needed
  result = result.map(acc => {
    const last_online_days = lastOnlineToDays(acc.last_online);
    return Object.assign({}, acc, { last_online_days });
  });

  // sorting
  if (sort) {
    const s = String(sort);
    result.sort((a, b) => {
      let va = a[s];
      let vb = b[s];

      // special handling for total_games and last_online_days
      if (s === "total_games") {
        va = Number(a.total_games) || 0;
        vb = Number(b.total_games) || 0;
      }
      if (s === "last_online_days") {
        va = (a.last_online_days === null || a.last_online_days === undefined) ? Infinity : a.last_online_days;
        vb = (b.last_online_days === null || b.last_online_days === undefined) ? Infinity : b.last_online_days;
      }
      // fallback string compare
      if (typeof va === "string") va = va.toLowerCase();
      if (typeof vb === "string") vb = vb.toLowerCase();

      if (va < vb) return order === "asc" ? -1 : 1;
      if (va > vb) return order === "asc" ? 1 : -1;
      return 0;
    });
  }

  // pagination
  const total = result.length;
  const start = (page - 1) * limit;
  const paged = result.slice(start, start + limit);

  // build response
  const response = {
    success: true,
    total,
    page,
    limit,
    returned: paged.length,
    data: paged
  };

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.statusCode = 200;
  res.end(JSON.stringify(response, null, 2));
};
