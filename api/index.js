module.exports = function (req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>Steam Search API — Documentation</title>
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <style>
        body{font-family:Inter,system-ui,Arial;line-height:1.6;padding:28px;background:#0b1020;color:#e6eef8}
        .card{background:linear-gradient(180deg,#0f1724 0%, #071024 100%);border-radius:12px;padding:20px;box-shadow:0 4px 20px rgba(0,0,0,.5)}
        code{background:#071024;padding:4px 8px;border-radius:6px;color:#9be7ff}
        h1{color:#9be7ff}
        a{color:#6fe7b1}
        table{width:100%;border-collapse:collapse;margin-top:10px}
        th,td{padding:8px;text-align:left;border-bottom:1px solid rgba(255,255,255,.04)}
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Steam Search API</h1>
        <p>Lightweight search API for your steam accounts JSON.</p>

        <h3>Endpoints</h3>
        <ul>
          <li><code>/api/search</code> — Search & filter accounts</li>
          <li><code>/api/stats</code> — Aggregated statistics</li>
          <li><code>/api/index</code> — This page</li>
        </ul>

        <h3>Search Query Parameters</h3>
        <table>
          <thead><tr><th>param</th><th>type</th><th>description</th></tr></thead>
          <tbody>
            <tr><td><code>username</code></td><td>string</td><td>Find by username (contains, case-insensitive)</td></tr>
            <tr><td><code>game</code></td><td>string</td><td>Find accounts that own a game (contains). Use <code>fuzzy=true</code> for fuzzy matching.</td></tr>
            <tr><td><code>country</code></td><td>string</td><td>Filter by country code (exact)</td></tr>
            <tr><td><code>status</code></td><td>string</td><td>Filter by status (exact)</td></tr>
            <tr><td><code>config_by</code></td><td>string</td><td>Filter by config_by (exact)</td></tr>
            <tr><td><code>min_games</code></td><td>number</td><td>Minimum total_games</td></tr>
            <tr><td><code>max_games</code></td><td>number</td><td>Maximum total_games</td></tr>
            <tr><td><code>sort</code></td><td>string</td><td>Sort field: <code>username</code> | <code>total_games</code> | <code>last_online_days</code></td></tr>
            <tr><td><code>order</code></td><td>string</td><td><code>asc</code> or <code>desc</code> (default asc)</td></tr>
            <tr><td><code>page</code></td><td>number</td><td>Pagination page (default 1)</td></tr>
            <tr><td><code>limit</code></td><td>number</td><td>Pagination limit (default 10)</td></tr>
            <tr><td><code>fuzzy</code></td><td>boolean</td><td>When searching games, enables fuzzy matching (default false)</td></tr>
            <tr><td><code>key</code></td><td>string</td><td>If an API_KEY is set on the server, pass <code>?key=YOURKEY</code> or header <code>x-api-key</code></td></tr>
          </tbody>
        </table>

        <h3>Examples</h3>
        <ul>
          <li><code>/api/search?username=mpqdv</code></li>
          <li><code>/api/search?game=Rust</code></li>
          <li><code>/api/search?country=PH&min_games=2&sort=total_games&order=desc</code></li>
          <li><code>/api/stats</code></li>
        </ul>

        <p>Tip: Set <code>API_KEY</code> in Vercel Environment Variables for protection. If set, all requests must include header <code>x-api-key</code> or query param <code>key</code>.</p>

        <hr/>
        <p>Built for <b>M2H</b> — deploy on Vercel and enjoy.</p>
      </div>
    </body>
  </html>
  `;
  res.statusCode = 200;
  res.end(html);
};
