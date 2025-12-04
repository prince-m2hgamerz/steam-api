export default function handler(req, res) {
  res.setHeader("Content-Type", "application/javascript; charset=utf-8");

  res.end(`
// ============================
// Apple Developer Docs Sidebar
// ============================

const sections = [
  { id: "accounts", label: "Accounts API" },
  { id: "items", label: "Items API" },
  { id: "sdk", label: "SDK API" },
  { id: "auth", label: "Authentication" }
];

// Build sidebar dynamically
const sidebar = document.getElementById("sidebar");

sections.forEach(sec => {
  const link = document.createElement("a");
  link.href = "#" + sec.id;
  link.innerText = sec.label;
  link.dataset.target = sec.id;

  link.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById(sec.id).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });

  sidebar.appendChild(link);
});

// Scrollspy – highlight active section
window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 120;

  sections.forEach(sec => {
    const sectionEl = document.getElementById(sec.id);
    const linkEl = sidebar.querySelector(\`a[data-target="\${sec.id}"]\`);

    if (
      sectionEl.offsetTop <= fromTop &&
      sectionEl.offsetTop + sectionEl.offsetHeight > fromTop
    ) {
      linkEl.classList.add("active");
    } else {
      linkEl.classList.remove("active");
    }
  });
});
`);
}
