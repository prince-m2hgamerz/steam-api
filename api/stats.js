const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const file = path.join(process.cwd(), "data", "accounts.json");
  const accounts = JSON.parse(fs.readFileSync(file, "utf8"));

  const totalAccounts = accounts.length;
  const totalGames = accounts.reduce((a, b) => a + b.total_games, 0);

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    success: true,
    totalAccounts,
    totalGames
  });
};
