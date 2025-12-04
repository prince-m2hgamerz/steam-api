import accounts from "../data/accounts.json";

export default function handler(req, res) {
  const { username, country, game } = req.query;

  let results = accounts.filter(acc => {
    let ok = true;

    if (username)
      ok = ok && acc.username.toLowerCase().includes(username.toLowerCase());

    if (country)
      ok = ok && acc.country.toLowerCase() === country.toLowerCase();

    if (game)
      ok = ok && acc.games.some(g => g.toLowerCase().includes(game.toLowerCase()));

    return ok;
  });

  res.status(200).json({
    success: true,
    total: results.length,
    accounts: results
  });
}
