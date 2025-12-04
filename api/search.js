const fs = require("fs");
const path = require("path");

// Utility: Load JSON from /data
function loadJSON(fileName) {
  const file = path.join(process.cwd(), "data", fileName);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// Utility: Convert "15 days ago" → 15
function parseDays(str) {
  if (!str) return null;
  const d = str.match(/(\d+)\s*day/);
  if (d) return Number(d[1]);
  return null;
}

// Utility: Parse balance like "¥ 0.00" → 0.00
function parseBalance(bal) {
  if (!bal) return null;
  const cleaned = bal.replace(/[^0-9.,-]/g, "").replace(",", ".");
  const num = Number(cleaned);
  return isNaN(num) ? null : num;
}

// Fuzzy search helper
function fuzzy(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  return a.includes(b) || b.includes(a);
}

module.exports = (req, res) => {
  const t0 = Date.now();

  // Load all JSON files
  const accounts = loadJSON("accounts.json");
  const sdk = loadJSON("sdk.json");
  const items = loadJSON("item.json");

  // Query params
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
    page = 1,
    
    // NEW filters
    sdk: sdkQuery,
    sdk_type,
    sdk_offset,
    sdk_size,

    item: itemQuery,
    item_id
  } = req.query;

  limit = Math.min(Number(limit) || 20, 100);
  page = Number(page) || 1;

  // ---------------------------
  // ⭐ SEARCH STEAM ACCOUNTS
  // ---------------------------
  let result = accounts.map(acc => ({
    ...acc,
    days: parseDays(acc.last_online),
    balance_num: parseBalance(acc.balance)
  }));

  if (username) {
    result = result.filter(acc => fuzzy(acc.username, username));
  }

  if (game) {
    const list = game.toLowerCase().split(",");
    result = result.filter(acc =>
      acc.games.some(g => list.some(q => fuzzy(g, q)))
    );
  }

  if (country) result = result.filter(acc => acc.country.toLowerCase() === country.toLowerCase());
  if (status) result = result.filter(acc => acc.status.toLowerCase() === status.toLowerCase());
  if (config_by) result = result.filter(acc => acc.config_by.toLowerCase() === config_by.toLowerCase());

  if (min_games) result = result.filter(acc => acc.total_games >= Number(min_games));
  if (max_games) result = result.filter(acc => acc.total_games <= Number(max_games));

  if (min_days) result = result.filter(acc => acc.days >= Number(min_days));
  if (max_days) result = result.filter(acc => acc.days <= Number(max_days));

  if (min_balance) result = result.filter(acc => acc.balance_num >= Number(min_balance));
  if (max_balance) result = result.filter(acc => acc.balance_num <= Number(max_balance));

  // Random account selector
  if (random === "true") {
    const picked = result[Math.floor(Math.random() * result.length)];
    return res.status(200).json({ success: true, random: picked });
  }

  // Pagination
  const total_accounts = result.length;
  const start = (page - 1) * limit;
  const paginated_accounts = result.slice(start, start + limit);

  // ---------------------------
  // ⭐ SEARCH SDK.JSON
  // ---------------------------
  let sdkMatches = [];

  if (sdkQuery || sdk_type || sdk_offset || sdk_size) {
    const props = sdk.Object.properties;

    sdkMatches = props.filter(prop => {
      let ok = true;

      if (sdkQuery) ok = ok && fuzzy(prop.name, sdkQuery);
      if (sdk_type) ok = ok && fuzzy(prop.type, sdk_type);
      if (sdk_offset) ok = ok && prop.offset == sdk_offset;
      if (sdk_size) ok = ok && prop.size == sdk_size;

      return ok;
    });
  }

  // ---------------------------
  // ⭐ SEARCH ITEM.JSON
  // ---------------------------
  let itemMatches = [];

  if (itemQuery || item_id) {
    itemMatches = Object.values(items).filter(item => {
      let ok = true;

      if (itemQuery) ok = ok && fuzzy(item.name || "", itemQuery);
      if (item_id) ok = ok && item.id == item_id;

      return ok;
    });
  }

  const t1 = Date.now();

  // ---------------------------
  // ⭐ FINAL RESPONSE
  // ---------------------------
  res.status(200).json({
    success: true,
    execution_ms: t1 - t0,

    steam_accounts: {
      total: total_accounts,
      page,
      limit,
      results: paginated_accounts
    },

    sdk_properties: sdkMatches,
    item_data: itemMatches
  });
};
