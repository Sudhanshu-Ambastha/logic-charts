export const pertTemplates = {
  eventNode: (event, pos, radius) => `
    <g class="event-node" transform="translate(${pos.x}, ${pos.y})">
      <circle cx="0" cy="0" r="${radius}" fill="black" stroke="black" stroke-width="2"/>
      <text x="0" y="7" text-anchor="middle" fill="white" font-size="18" font-weight="bold" font-family="sans-serif">${event.id}</text>

      <g transform="translate(-17.5, -85)"> 
        <rect x="0" y="0" width="35" height="25" fill="white" stroke="black" stroke-width="1.5"/>
        <text x="17.5" y="18" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold">${event.e}</text>
        
        <rect x="0" y="25" width="35" height="25" fill="white" stroke="black" stroke-width="1.5"/>
        <text x="17.5" y="43" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold">${event.l}</text>
      </g>
    </g>`,

  activity: (x1, y1, x2, y2, te, isCritical, midX, midY) => {
    const strokeColor = isCritical ? "#ff4d4d" : "#000";
    const strokeWidth = isCritical ? "3" : "1.5";
    const marker = isCritical
      ? "url(#arrow-pert-crit)"
      : "url(#arrow-pert-norm)";

    return `
      <g class="activity">
        <path d="M ${x1} ${y1} L ${x2} ${y2}" 
              stroke="${strokeColor}" 
              stroke-width="${strokeWidth}" 
              fill="none" 
              marker-end="${marker}" />
        <text x="${midX}" y="${midY}" text-anchor="middle" font-size="14" font-weight="bold" font-family="sans-serif">${te.toFixed(1)}</text>
      </g>`;
  },
};
