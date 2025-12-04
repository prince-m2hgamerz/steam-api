export default function handler(req, res) {
  res.setHeader("Content-Type", "application/javascript; charset=utf-8");

  res.end(`
// ============================================================
// Lightweight Apple-Style Syntax Highlighter (JS / JSON / Swift)
// ============================================================

(function () {

  const styles = {
    keyword: "color:#ff3b30;",
    string: "color:#34c759;",
    number: "color:#ff9f0a;",
    boolean: "color:#0a84ff;",
    null: "color:#ff375f;",
    property: "color:#bf5af2;",
    comment: "color:#8e8e93;font-style:italic;"
  };

  function escapeHTML(str) {
    return str.replace(/[&<>]/g, function(c){
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
    });
  }

  // JSON Highlighter
  function highlightJSON(code) {
    code = escapeHTML(code);

    return code
      .replace(/"(.*?)"(?=\\s*:)/g, '<span style="' + styles.property + '">"$1"</span>')
      .replace(/"(.*?)"/g, '<span style="' + styles.string + '">"$1"</span>')
      .replace(/\\b(true|false)\\b/g, '<span style="' + styles.boolean + '">$1</span>')
      .replace(/\\b(null)\\b/g, '<span style="' + styles.null + '">$1</span>')
      .replace(/\\b(\\d+(?:\\.\\d+)?)\\b/g, '<span style="' + styles.number + '">$1</span>');
  }

  // JavaScript Highlighter
  function highlightJS(code) {
    code = escapeHTML(code);

    return code
      .replace(/\\/\\/.*$/gm, '<span style="' + styles.comment + '">$&</span>')
      .replace(/"(.*?)"|\\'(.*?)\\'/g, '<span style="' + styles.string + '">$&</span>')
      .replace(/\\b(let|var|const|return|function|async|await|if|else|for|while|class|new|import|export|default|try|catch|throw)\\b/g,
        '<span style="' + styles.keyword + '">$1</span>')
      .replace(/\\b(\\d+(?:\\.\\d+)?)\\b/g, '<span style="' + styles.number + '">$1</span>')
      .replace(/\\b(true|false)\\b/g, '<span style="' + styles.boolean + '">$1</span>');
  }

  // Swift Highlighter
  function highlightSwift(code) {
    code = escapeHTML(code);

    return code
      .replace(/\\b(let|var|func|return|if|else|class|struct|enum|protocol|import|extension|public|private|internal)\\b/g,
        '<span style="' + styles.keyword + '">$1</span>')
      .replace(/"(.*?)"/g, '<span style="' + styles.string + '">$&</span>')
      .replace(/\\b(\\d+(?:\\.\\d+)?)\\b/g, '<span style="' + styles.number + '">$1</span>')
      .replace(/\\b(true|false)\\b/g, '<span style="' + styles.boolean + '">$1</span>');
  }

  // Auto-highlight on <pre data-lang="">
  function applySyntax() {
    document.querySelectorAll("pre[data-lang]").forEach(function(pre){
      const lang = pre.getAttribute("data-lang");
      const code = pre.innerText;

      let highlighted = code;

      if (lang === "json") highlighted = highlightJSON(code);
      else if (lang === "js") highlighted = highlightJS(code);
      else if (lang === "swift") highlighted = highlightSwift(code);

      pre.innerHTML = highlighted;
    });
  }

  window.addEventListener("load", applySyntax);
  window.applySyntaxHighlighting = applySyntax;

})();
`);
}
