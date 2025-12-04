export default function handler(req, res) {
  res.setHeader("Content-Type", "application/javascript; charset=utf-8");

  res.end(`
// =======================================================
// Web Worker for Lag-Free JSON Rendering (Pro Version)
// =======================================================

self.onmessage = function (event) {
  const { target, json } = event.data;

  try {
    const full = JSON.stringify(json, null, 2);
    const chunkSize = 800; // small chunks for smooth UI
    let index = 0;

    // Stream chunks back to UI
    function sendChunk() {
      if (index < full.length) {
        const chunk = full.slice(index, index + chunkSize);
        index += chunkSize;

        self.postMessage({
          target,
          chunk,
          done: false
        });

        setTimeout(sendChunk, 5); // tiny delay avoids blocking worker
      } else {
        // Finished
        self.postMessage({
          target,
          full,
          done: true
        });
      }
    }

    sendChunk();

  } catch (err) {
    self.postMessage({
      target,
      full: "Error rendering JSON: " + err.message,
      done: true
    });
  }
};
`);
}
