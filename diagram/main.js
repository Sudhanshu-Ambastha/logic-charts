import { initEditor } from "./editor/editor.js";

import {
  parseUseCaseDiagram,
  layoutDiagram,
  renderSVG,
} from "./core/usecase/index.js";
import { parseCPM, layoutCPM, renderCPMSVG } from "./core/cpm/index.js";
import { parsePert, layoutPert, renderPertSvg } from "./core/pert/index.js";

export async function renderDiagram(text) {
  const trimmedText = text.trim();

  try {
    if (trimmedText.startsWith("cpm")) {
      const model = parseCPM(trimmedText);
      const layout = layoutCPM(model);
      return renderCPMSVG(model, layout);
    }

    if (trimmedText.startsWith("pert")) {
      const model = parsePert(trimmedText);
      const layout = layoutPert(model);
      return renderPertSvg(model, layout);
    }

    if (trimmedText.toLowerCase().startsWith("usecase")) {
      const model = parseUseCaseDiagram(trimmedText);
      const layout = layoutDiagram(model);
      return renderSVG(model, layout);
    }

    return errorSVG("Supported types: 'useCase', 'cpm', or 'pert'");
  } catch (e) {
    console.error("Rendering failed:", e);
    return errorSVG(`Syntax Error: ${e.message}`);
  }
}

function errorSVG(message) {
  return `
    <svg width="600" height="100" viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fff5f5" stroke="#feb2b2" stroke-width="2" rx="8"/>
      <text x="50%" y="50%" fill="#c53030" font-family="sans-serif" font-size="14" font-weight="600" text-anchor="middle" dominant-baseline="middle">
        ⚠️ ${message}
      </text>
    </svg>`;
}

initEditor();
