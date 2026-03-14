import { renderDiagram } from "../main.js";

export function initEditor() {
  const container = document.getElementById("diagram");
  const input = document.getElementById("codeInput");

  if (!container || !input) {
    console.error("Editor elements not found");
    return;
  }

  async function render() {
    const code = input.value.trim();
    if (!code.startsWith('useCase')) {
      container.innerHTML = "<div style='color: #666; font-family: sans-serif;'>Waiting for diagram (Start with 'usecaseDiagram')...</div>";
      return;
    }

    try {
      const svg = await renderDiagram(code);
      container.innerHTML = svg;
      const svgElement = container.querySelector('svg');

      if (svgElement) {
        svgElement.style.width = '100%';
        svgElement.style.height = 'auto';
        svgElement.style.maxWidth = '1000px';
      }
    } catch (err) {
    }
  }

  let debounceTimer;
  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(render, 400);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      
      const start = input.selectionStart;
      const end = input.selectionEnd;
      const value = input.value;

      if (e.shiftKey) {
        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
        if (value.substring(lineStart, lineStart + 1) === '\t') {
          input.value = value.substring(0, lineStart) + value.substring(lineStart + 1);
          input.selectionStart = Math.max(lineStart, start - 1);
          input.selectionEnd = Math.max(lineStart, end - 1);
        }
      } else {
        input.value = value.substring(0, start) + "\t" + value.substring(end);
        input.selectionStart = input.selectionEnd = start + 1;
      }
    }
  });

  window.downloadSVG = () => {
    const svgData = container.innerHTML;
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diagram.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  window.downloadPNG = () => {
    const element = document.getElementById("diagram");
    if (typeof html2canvas === 'undefined') {
      alert("html2canvas not loaded");
      return;
    }
    html2canvas(element, { backgroundColor: "#ffffff", scale: 2 }).then(canvas => {
      const link = document.createElement("a");
      link.download = "diagram.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  render();
}