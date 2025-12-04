export default function handler(req, res) {
  res.setHeader("Content-Type", "application/javascript; charset=utf-8");

  res.end(`
// ===============================================
// Apple Vision-Pro Style Mobile Drawer Navigation
// ===============================================

(function () {
  // Only activate drawer UI if screen < 900px
  if (window.innerWidth > 900) return;

  // Inject Drawer UI
  const drawer = document.createElement("div");
  drawer.id = "drawerMenu";
  drawer.style.cssText = \`
    position: fixed;
    top: 0;
    left: -260px;
    width: 260px;
    height: 100vh;
    background: rgba(30,30,35,0.55);
    backdrop-filter: blur(25px);
    border-right: 1px solid rgba(255,255,255,0.1);
    transition: left 0.35s ease;
    padding: 20px;
    z-index: 9999;
    color: white;
  \`;
  document.body.appendChild(drawer);

  // Menu Button
  const btn = document.createElement("button");
  btn.innerText = "☰ Menu";
  btn.style.cssText = \`
    position: fixed;
    top: 16px;
    right: 20px;
    z-index: 99999;
    padding: 10px 14px;
    border-radius: 12px;
    background: rgba(255,255,255,0.35);
    backdrop-filter: blur(10px);
    color: black;
    border: none;
    font-size: 16px;
  \`;
  document.body.appendChild(btn);

  // Populate Drawer with sidebar links
  const sidebar = document.getElementById("sidebar");
  const cloneLinks = sidebar.cloneNode(true).innerHTML;
  drawer.innerHTML = "<h2 style='color:white'>Navigation</h2>" + cloneLinks;

  // Toggle Drawer
  let open = false;
  btn.onclick = () => {
    open = !open;
    drawer.style.left = open ? "0px" : "-260px";
  };

  // Close when clicking a link
  drawer.querySelectorAll("a").forEach(a => {
    a.onclick = () => {
      open = false;
      drawer.style.left = "-260px";
    };
  });

})();
`);
}
