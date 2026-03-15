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
      container.innerHTML = "<div style='color: #666; font-family: sans-serif; padding: 20px;'>Waiting for valid input (Start with 'useCase')...</div>";
      return;
    }

    try {
      const svg = await renderDiagram(code);
      container.innerHTML = svg;
      
      const svgElement = container.querySelector('svg');

      if (svgElement) {
        svgElement.style.width = '100%';
        svgElement.style.height = 'auto';
        svgElement.style.display = 'block';
      }
    } catch (err) {
      console.error("Render error:", err);
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
      input.value = value.substring(0, start) + "\t" + value.substring(end);
      input.selectionStart = input.selectionEnd = start + 1;
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
    html2canvas(element, { 
      backgroundColor: "#ffffff", 
      scale: 2,
      scrollX: 0,
      scrollY: 0
    }).then(canvas => {
      const link = document.createElement("a");
      link.download = "diagram.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  render();
}