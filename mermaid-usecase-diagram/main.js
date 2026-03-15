import { initEditor } from "./editor/editor.js";
import { parseUseCaseDiagram } from "./core/parseUseCase.js";
import { layoutDiagram } from "./core/layout.js";
import { renderSVG } from "./core/renderSVG.js";

/**
 * Renders the diagram by orchestrating parsing, layout calculation, and SVG generation.
 * @param {string} text - The DSL code input.
 * @returns {Promise<string>} The generated SVG string.
 */
export async function renderDiagram(text) {
  try {
    const model = parseUseCaseDiagram(text);
    const layout = layoutDiagram(model);
    const svg = renderSVG(model, layout);
    return svg;
  } catch (e) {
    console.error("Diagram Rendering failed:", e);
    return `<svg width="400" height="150" viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8fafc" rx="5"/>
      <text x="200" y="75" fill="#ef4444" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">
        Invalid Diagram Syntax: Check your DSL formatting
      </text>
    </svg>`;
  }
}

initEditor();