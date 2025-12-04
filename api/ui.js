export default function handler(req, res) {
  const module = req.query.module;

  res.setHeader("Content-Type", "application/javascript; charset=utf-8");

  // ===========================
  // SIDEBAR MODULE
  // ===========================
  if (module === "sidebar") {
    return res.end(`
// Sidebar Script (Apple Developer Docs)
(function () {
  const sections = [
    { id: "accounts", label: "Accounts API" },
    { id: "items", label: "Items API" },
    { id: "sdk", label: "SDK API" },
    { id: "auth", label: "Authentication" }
  ];

  const sidebar = document.getElementById("sidebar");

  sections.forEach(sec => {
    const el = document.createElement("a");
    el.href = "#" + sec.id;
    el.innerText = sec.label;
    el.dataset.target = sec.id;

    el.addEventListener("click", e => {
      e.preventDefault();
      document.getElementById(sec.id).scrollIntoView({
        behavior: "smooth"
      });
    });

    sidebar.appendChild(el);
  });

  window.addEventListener("scroll", () => {
    const pos = window.scrollY + 140;

    sections.forEach(sec => {
      const link = sidebar.querySelector("a[data-target='" + sec.id + "']");
      const section = document.getElementById(sec.id);

      if (!link || !section) return;

      const inView =
        section.offsetTop <= pos &&
        section.offsetTop + section.offsetHeight > pos;

      link.classList.toggle("active", inView);
    });
  });
})();
`);
  }

  // ===========================
  // DRAWER MODULE
  // ===========================
  if (module === "drawer") {
    return res.end(`
// Vision Pro Style Drawer Menu
(function () {
  if (window.innerWidth > 900) return;

  const drawer = document.createElement("div");
  drawer.style.cssText =
    "position:fixed;top:0;left:-260px;width:260px;height:100vh;background:rgba(20,20,25,.55);backdrop-filter:blur(25px);" +
    "transition:left .35s;z-index:9999;padding:20px;color:white;";
  drawer.id = "drawerMenu";

  const sidebar = document.getElementById("sidebar");
  drawer.innerHTML = "<h2>Navigation</h2>" + sidebar.innerHTML;

  document.body.appendChild(drawer);

  const btn = document.createElement("button");
  btn.innerText = "☰ Menu";
  btn.style.cssText =
    "position:fixed;top:16px;right:20px;padding:10px 14px;border:none;border-radius:12px;" +
    "background:rgba(255,255,255,.35);backdrop-filter:blur(8px);z-index:10000;";
  document.body.appendChild(btn);

  let open = false;
  btn.onclick = () => {
    open = !open;
    drawer.style.left = open ? "0px" : "-260px";
  };
})();
`);
  }

  // ===========================
  // SYNTAX HIGHLIGHTER MODULE
  // ===========================
  if (module === "syntax") {
    return res.end(`
// Mini Syntax Highlighter (JSON only for performance)
(function () {
  const color = {
    key: "#bf5af2",
    string: "#34c759",
    number: "#ff9f0a",
    boolean: "#0a84ff",
    null: "#ff375f"
  };

  const escapeHTML = s =>
    s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  function highlight(code) {
    code = escapeHTML(code);

    return code
      .replace(/"(.*?)"(?=\\s*:)/g, '<span style="color:' + color.key + '">"$1"</span>')
      .replace(/"(.*?)"/g, '<span style="color:' + color.string + '">"$1"</span>')
      .replace(/\\b(true|false)\\b/g, '<span style="color:' + color.boolean + '">$1</span>')
      .replace(/\\b(null)\\b/g, '<span style="color:' + color.null + '">$1</span>')
      .replace(/\\b(\\d+(?:\\.\\d+)?)\\b/g, '<span style="color:' + color.number + '">$1</span>');
  }

  function apply() {
    document.querySelectorAll("pre[data-lang='json']").forEach(pre => {
      pre.innerHTML = highlight(pre.innerText);
    });
  }

  window.addEventListener("load", apply);
})();
`);
  }

  // ===========================
  // UI WORKER MODULE
  // ===========================
  if (module === "worker") {
    return res.end(`
// Background JSON Renderer
self.onmessage = function(e) {
  const { target, json } = e.data;

  try {
    const text = JSON.stringify(json, null, 2);
    const chunkSize = 800;
    let index = 0;

    function send() {
      if (index < text.length) {
        const part = text.slice(index, index + chunkSize);
        index += chunkSize;
        self.postMessage({ target, chunk: part, done: false });
        setTimeout(send, 5);
      } else {
        self.postMessage({ target, full: text, done: true });
      }
    }

    send();
  } catch (err) {
    self.postMessage({ target, full: "Error: " + err.message, done: true });
  }
};
`);
  }

  // Fallback
  res.end("// Unknown module");
}
