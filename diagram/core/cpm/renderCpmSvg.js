/**
 * Renders the CPM Diagram into an SVG string.
 */
export function renderCPMSVG(model, layoutData) {
  const { positions, width, height } = layoutData;
  const nodes = Object.values(model.activities);

  let connectors = "";
  let nodeGroup = "";

  // 1. Draw Connectors (Arrows)
  nodes.forEach((node) => {
    node.successors.forEach((succId) => {
      const start = positions[node.id];
      const end = positions[succId];
      if (!start || !end) return;

      // Logic: Connect Right-Middle of parent to Left-Middle of child
      const x1 = start.x + 120; // Width of block is 120
      const y1 = start.y + 50; // Height of block is 100, so middle is 50
      const x2 = end.x;
      const y2 = end.y + 50;

      // Determine if this is a Critical Path connection
      const isCritical = node.isCritical && model.activities[succId].isCritical;
      const strokeColor = isCritical ? "#ff4d4d" : "#4b5563";
      const strokeWidth = isCritical ? "2.5" : "1.5";

      connectors += `
        <g class="connector">
          <path d="M ${x1} ${y1} L ${x2} ${y2}" 
                stroke="${strokeColor}" 
                stroke-width="${strokeWidth}" 
                fill="none" 
                marker-end="url(#arrowhead-${isCritical ? "critical" : "normal"})" />
        </g>`;
    });
  });

  // 2. Draw Nodes (The 3-Row Blocks)
  nodes.forEach((node) => {
    const pos = positions[node.id];
    const borderColor = node.isCritical ? "#ff4d4d" : "#000";
    const borderWidth = node.isCritical ? "2" : "1";

    nodeGroup += `
    <g class="cpm-node" transform="translate(${pos.x}, ${pos.y})">
      <rect x="0" y="0" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <rect x="40" y="0" width="40" height="30" fill="#e2e8f0" stroke="black" stroke-width="1"/>
      <rect x="80" y="0" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <text x="20" y="20" text-anchor="middle" font-size="11" font-family="monospace">${node.es}</text>
      <text x="60" y="20" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold">${node.duration}</text>
      <text x="100" y="20" text-anchor="middle" font-size="11" font-family="monospace">${node.ef}</text>

      <rect x="0" y="30" width="120" height="40" fill="white" stroke="${borderColor}" stroke-width="${borderWidth}"/>
      <text x="60" y="55" text-anchor="middle" font-size="13" font-family="sans-serif" font-weight="800">${node.id}</text>

      <rect x="0" y="70" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <rect x="40" y="70" width="40" height="30" fill="${node.isCritical ? "#fee2e2" : "#f1f5f9"}" stroke="black" stroke-width="1"/>
      <rect x="80" y="70" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <text x="20" y="90" text-anchor="middle" font-size="11" font-family="monospace">${node.ls}</text>
      <text x="60" y="90" text-anchor="middle" font-size="11" font-family="monospace" fill="${node.isCritical ? "red" : "black"}">${node.slack}</text>
      <text x="100" y="90" text-anchor="middle" font-size="11" font-family="monospace">${node.lf}</text>
    </g>`;
  });

  // 3. Assemble final SVG
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
