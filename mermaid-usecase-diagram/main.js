import { initEditor } from "./editor/editor.js";
import { parseUseCaseDiagram } from "./core/parseUseCase.js";
import { layoutDiagram } from "./core/layout.js";
import { renderSVG } from "./core/renderSVG.js";

export async function renderDiagram(text) {
  try {
    const model = parseUseCaseDiagram(text);
    const positions = layoutDiagram(model);
    const svg = renderSVG(model, positions);
    return svg;
  } catch (e) {
    console.error("Diagram Rendering failed:", e);
    return `<svg width="300" height="100">
      <text x="10" y="50" fill="red" font-family="sans-serif">
      Invalid Diagram Syntax
      </text>
    </svg>`;
  }
}

initEditor();