export const templates = {
  actor: (x, y, label) => `
    <g class="actor">
      <circle cx="${x}" cy="${y - 50}" r="6" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <line x1="${x}" y1="${y - 44}" x2="${x}" y2="${y - 20}" stroke="black" stroke-width="1"/>
      <line x1="${x - 15}" y1="${y - 35}" x2="${x + 15}" y2="${y - 35}" stroke="black" stroke-width="1"/>
      <line x1="${x}" y1="${y - 20}" x2="${x - 15}" y2="${y - 5}" stroke="black" stroke-width="1"/>
      <line x1="${x}" y1="${y - 20}" x2="${x + 15}" y2="${y - 5}" stroke="black" stroke-width="1"/>
      <text x="${x}" y="${y + 15}" text-anchor="middle" font-size="12" font-family="Helvetica">${label}</text>
    </g>
  `,

  useCase: (x, y, label) => `
    <g class="usecase">
      <ellipse cx="${x}" cy="${y}" rx="60" ry="25" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <text x="${x}" y="${y + 5}" text-anchor="middle" font-size="12" font-family="Helvetica">${label}</text>
    </g>
  `,

  systemBoundary: (x, y, width, height, label) => `
    <g class="system-boundary">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#61c1ed" stroke="#000000" />
      <text x="${x + 10}" y="${y + 25}" font-size="14" font-family="Helvetica" fill="#000000">
        ${label}
      </text>
    </g>
  `,

  note: (x, y, label) => `
    <g class="note">
      <path d="M ${x} ${y} L ${x + 80} ${y} L ${x + 100} ${y + 20} L ${x + 100} ${y + 60} L ${x} ${y + 60} Z" 
            fill="#61c1ed" stroke="black" stroke-width="1"/>
      <path d="M ${x + 80} ${y} L ${x + 80} ${y + 20} L ${x + 100} ${y + 20} Z" 
            fill="#ffffff" stroke="black" stroke-width="1"/>
      <text x="${x + 50}" y="${y + 35}" text-anchor="middle" font-size="10" font-family="Helvetica">${label}</text>
    </g>
  `,

  dashedOval: (x, y, label) => `
    <g class="dashed-oval">
      <ellipse cx="${x}" cy="${y}" rx="70" ry="30" fill="#61c1ed" stroke="black" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="${x}" y="${y + 5}" text-anchor="middle" font-size="12" font-family="Helvetica">
        ${label}
      </text>
    </g>
  `,

  constraintSign: (x, y) => {
    const r = 5;
    const lineOutLength = 15; 
    
    return `
      <g class="constraint-sign">
        <circle fill="#FFFFFF" stroke="#010101" cx="${x}" cy="${y}" r="${r}"/>
        <line fill="none" stroke="#010101" x1="${x - r}" y1="${y}" x2="${x + r}" y2="${y}"/>
        <line fill="none" stroke="#010101" x1="${x}" y1="${y - r}" x2="${x}" y2="${y + r}"/>
        <line fill="none" stroke="#010101" x1="${x + r}" y1="${y}" x2="${x + r + lineOutLength}" y2="${y}"/>
      </g>
    `;
  },

  connector: (x1, y1, x2, y2, label) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const labelWidth = 57; 
    const startX = midX - labelWidth / 2;
    const endX = midX + labelWidth / 2;
    
    return `
      <defs>
        <marker id="openArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <polyline points="0 0, 8 5, 0 10" fill="none" stroke="black" stroke-width="1.5" />
        </marker>
      </defs>
      <g class="connector">
        <line x1="${x1}" y1="${y1}" x2="${startX}" y2="${y2}" 
              stroke="black" stroke-width="2" stroke-dasharray="5,5"/>
        
        <text x="${midX}" y="${midY}" 
              text-anchor="middle" alignment-baseline="middle" 
              font-size="12" font-family="Helvetica" fill="black">
          &laquo;${label}&raquo;
        </text>
        
        <line x1="${endX}" y1="${y1}" x2="${x2}" y2="${y2}" 
              stroke="black" stroke-width="1" stroke-dasharray="5,5" 
              marker-end="url(#openArrow)"/>
      </g>
    `
  }
};