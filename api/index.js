export default function handler(req, res) {
    res.setHeader("Content-Type", "text/html");

    res.end(`
        <html>
        <head>
            <title>Steam Search API</title>
            <style>
                body { font-family: Arial; background: #111; color: #fff; padding: 40px; }
                h1 { color: #4CAF50; }
                code { background: #222; padding: 5px; border-radius: 5px; }
                a { color: #00c2ff; }
            </style>
        </head>
        <body>
            <h1>Steam Search API Documentation</h1>
            <p>Welcome to the Steam Account Search API.</p>

            <h2>Endpoints</h2>
            <ul>
                <li><b>/api/search</b> – Search accounts</li>
                <li><b>/api/stats</b> – Get statistics</li>
                <li><b>/api/index</b> – This documentation page</li>
            </ul>

            <h2>Examples</h2>

            <p>Search by username:</p>
            <code>/api/search?username=mpqdv</code>

            <p>Search by game:</p>
            <code>/api/search?game=Rust</code>

            <p>Filter by country:</p>
            <code>/api/search?country=PH</code>

            <p>Sort by total games:</p>
            <code>/api/search?sort=total_games&order=desc</code>

            <p>Stats:</p>
            <code>/api/stats</code>

            <br><br>
            <p>Developed by <b>M2H</b></p>
        </body>
        </html>
    `);
}
