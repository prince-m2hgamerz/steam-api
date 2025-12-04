module.exports = (req, res) => {
  res.setHeader("Content-Type", "text/html");

  res.end(`
    <html>
    <head><title>Steam API Docs</title></head>
    <body style="font-family: Arial; background: #111; color: #fff; padding: 20px;">
      <h1>Steam Search API</h1>
      <p>Welcome. Your API is running correctly.</p>

      <h2>Endpoints</h2>
      <ul>
        <li>/api/search</li>
        <li>/api/stats</li>
        <li>/api/index</li>
      </ul>

      <h2>Examples</h2>
      <p><code>/api/search?username=mpqdv</code></p>
      <p><code>/api/stats</code></p>
    </body>
    </html>
  `);
};
