import { initEditor } from "./editor/editor.js";
import { parseUseCaseDiagram } from "./core/parseUseCase.js";
import { layoutDiagram } from "./core/layout.js";
import { renderSVG } from "./core/renderSVG.js";
import { parseCPM } from "./core/parseCpm.js";
import { layoutCPM } from "./core/layoutCPM.js";
import { renderCPMSVG } from "./core/renderCpmSvg.js";

/**
 * Renders the diagram by orchestrating parsing, layout calculation, and SVG generation.
 * Supports both 'useCase' and 'cpm' diagram types.
 * @param {string} text - The DSL code input.
 * @returns {Promise<string>} The generated SVG string.
 */
export async function renderDiagram(text) {
  const trimmedText = text.trim();

  try {
    if (trimmedText.startsWith("cpm")) {
      const model = parseCPM(trimmedText);
      const layout = layoutCPM(model);
      const svg = renderCPMSVG(model, layout);
      return svg;
    }

    if (
      trimmedText.startsWith("useCase") ||
      trimmedText.startsWith("usecase")
    ) {
      const model = parseUseCaseDiagram(trimmedText);
      const layout = layoutDiagram(model);
      const svg = renderSVG(model, layout);
      return svg;
    }

    return errorSVG("Please start your diagram with 'useCase' or 'cpm'");
  } catch (e) {
    console.error("Diagram Rendering failed:", e);
    return errorSVG(`Syntax Error: ${e.message}`);
  }
}

function errorSVG(message) {
  return `
    <svg width="500" height="150" viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fff5f5" stroke="#feb2b2" stroke-width="2" rx="8"/>
      <text x="250" y="75" fill="#c53030" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="600" text-anchor="middle" dominant-baseline="middle">
        ⚠️ ${message}
      </text>
    </svg>`;
}

initEditor();
