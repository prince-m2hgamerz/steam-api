import fs from "fs";
import path from "path";

const accountsPath = path.join(process.cwd(), "data", "accounts.json");
const accounts = JSON.parse(fs.readFileSync(accountsPath, "utf8"));

export default function handler(req, res) {
    const totalAccounts = accounts.length;
    const totalGames = accounts.reduce((sum, acc) => sum + acc.total_games, 0);

    const countries = {};
    accounts.forEach(acc => {
        countries[acc.country] = (countries[acc.country] || 0) + 1;
    });

    res.status(200).json({
        success: true,
        totalAccounts,
        totalGames,
        countries,
        mostGames: accounts.sort((a,b)=>b.total_games - a.total_games)[0]
    });
}
