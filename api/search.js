const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const file = path.join(process.cwd(), "data", "accounts.json");
  const accounts = JSON.parse(fs.readFileSync(file, "utf8"));

  const username = req.query.username?.toLowerCase() || null;

  let result = accounts;

  if (username) {
    result = result.filter(acc =>
      acc.username.toLowerCase().includes(username)
    );
  }

  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    success: true,
    count: result.length,
    data: result
  });
};
