const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "data", "accounts.json");
    const accounts = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const totalAccounts = accounts.length;
    const totalGames = accounts.reduce((sum, acc) => sum + (acc.total_games || 0), 0);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      success: true,
      totalAccounts,
      totalGames,
      countries: accounts.reduce((map, acc) => {
        const c = acc.country || "UNKNOWN";
        map[c] = (map[c] || 0) + 1;
        return map;
      }, {})
    });

  } catch (err) {
    console.error("Stats API Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to load statistics.",
      error: String(err)
    });
  }
};
