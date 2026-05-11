import { cpmTemplates } from "./cpmTemplates.js";

export function renderCPMSVG(model, layoutData) {
  const { positions, width, height } = layoutData;
  const nodes = Object.values(model.activities);

  let connectors = "";
  let nodeGroup = "";

  nodes.forEach((node) => {
    node.successors.forEach((succId) => {
      const start = positions[node.id];
      const end = positions[succId];
      if (!start || !end) return;

      const succNode = model.activities[succId];

      const isCriticalLink =
        node.isCritical &&
        succNode.isCritical &&
        Math.abs(node.ef - succNode.es) < 0.001;

      const strokeColor = isCriticalLink ? "#ff4d4d" : "#4b5563";
      const strokeWidth = isCriticalLink ? "2.5" : "1.5";

      connectors += `
        <g class="connector">
          <path d="M ${start.x + 120} ${start.y + 50} L ${end.x} ${end.y + 50}" 
                stroke="${strokeColor}" 
                stroke-width="${strokeWidth}" 
                fill="none" 
                marker-end="url(#arrowhead-${isCriticalLink ? "critical" : "normal"})" />
        </g>`;
    });
  });

  nodes.forEach((node) => {
    const pos = positions[node.id];
    nodeGroup += cpmTemplates.node(pos.x, pos.y, node);
  });

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowhead-normal" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
        </marker>
        <marker id="arrowhead-critical" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#ff4d4d" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="white" />
      ${connectors}
      ${nodeGroup}
    </svg>`;
}
