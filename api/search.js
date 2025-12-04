import fs from "fs";
import path from "path";

// Load JSON data
const accountsPath = path.join(process.cwd(), "data", "accounts.json");
const accounts = JSON.parse(fs.readFileSync(accountsPath, "utf8"));

export default function handler(req, res) {
    const { 
        username,
        game,
        country,
        status,
        config_by,
        sort, 
        order = "asc",
        page = 1,
        limit = 10
    } = req.query;

    let result = accounts;

    // ---------- SEARCH FILTERS ---------- //

    if (username) {
        result = result.filter(acc =>
            acc.username.toLowerCase().includes(username.toLowerCase())
        );
    }

    if (country) {
        result = result.filter(acc => 
            acc.country.toLowerCase() === country.toLowerCase()
        );
    }

    if (status) {
        result = result.filter(acc =>
            acc.status.toLowerCase() === status.toLowerCase()
        );
    }

    if (config_by) {
        result = result.filter(acc =>
            acc.config_by.toLowerCase() === config_by.toLowerCase()
        );
    }

    if (game) {
        const g = game.toLowerCase();
        result = result.filter(acc =>
            acc.games.some(x => x.toLowerCase().includes(g))
        );
    }

    // ---------- SORTING ---------- //
    if (sort) {
        result = result.sort((a, b) => {
            let valA = a[sort];
            let valB = b[sort];

            if (sort === "total_games") {
                valA = a.total_games;
                valB = b.total_games;
            }

            if (typeof valA === "string") valA = valA.toLowerCase();
            if (typeof valB === "string") valB = valB.toLowerCase();

            if (order === "desc") return valA > valB ? -1 : 1;
            return valA > valB ? 1 : -1;
        });
    }

    // ---------- PAGINATION ---------- //
    const start = (page - 1) * limit;
    const end = start + parseInt(limit);
    const paginated = result.slice(start, end);

    res.status(200).json({
        success: true,
        total: result.length,
        page: Number(page),
        limit: Number(limit),
        data: paginated
    });
}
