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
    const isUseCase = code.toLowerCase().startsWith("usecase");
    const isCPM = code.startsWith("cpm");
    const isPERT = code.startsWith("pert");

    if (!isUseCase && !isCPM && !isPERT) {
      container.innerHTML = `
        <div style='color: #8b949e; font-family: "Plus Jakarta Sans", sans-serif; padding: 40px; text-align: center;'>
          <p style='font-weight: 800; font-size: 1.2rem; margin-bottom: 8px;'>🏗️ Sovereign Architect Editor</p>
          <p style='font-size: 0.9em; opacity: 0.7;'>Waiting for valid input (Start with <code>useCase</code>, <code>cpm</code>, or <code>pert</code>)...</p>
        </div>`;
      return;
    }

    try {
      const svg = await renderDiagram(code);
      container.innerHTML = svg;

      const svgElement = container.querySelector("svg");

      if (svgElement) {
        svgElement.style.width = "100%";
        svgElement.style.height = "auto";
        svgElement.style.display = "block";
      }
    } catch (err) {
      console.error("Render error:", err);
      container.innerHTML = `
        <div style="color: #ff4d4d; padding: 20px; font-family: monospace; background: rgba(255,0,0,0.05); border-radius: 8px;">
          <strong>⚠️ Render Error:</strong><br/>
          ${err.message}
        </div>`;
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
    if (!svgData.includes("<svg")) return;

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
    if (!element.innerHTML.includes("<svg")) return;

    html2canvas(element, {
      backgroundColor: "#ffffff",
      scale: 2,
      scrollX: 0,
      scrollY: 0,
      useCORS: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "diagram.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  render();
}
