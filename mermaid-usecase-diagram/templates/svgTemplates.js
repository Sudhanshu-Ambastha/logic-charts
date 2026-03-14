import { wrapText } from "../utils/textWrap";

export const templates = {
  actor(x, y, label) {
    return `
    <g class="actor">
      <circle cx="${x}" cy="${y - 50}" r="6" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <line x1="${x}" y1="${y - 44}" x2="${x}" y2="${y - 20}" stroke="black" stroke-width="1"/>
      <line x1="${x - 15}" y1="${y - 35}" x2="${x + 15}" y2="${y - 35}" stroke="black" stroke-width="1"/>
      <line x1="${x}" y1="${y - 20}" x2="${x - 15}" y2="${y - 5}" stroke="black" stroke-width="1"/>
      <line x1="${x}" y1="${y - 20}" x2="${x + 15}" y2="${y - 5}" stroke="black" stroke-width="1"/>
      <text x="${x}" y="${y + 15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${label}</text>
    </g>
    `;
  },

  useCase(x, y, label) {
    const width = 120;
    return `
    <g class="usecase">
      <ellipse cx="${x}" cy="${y}" rx="${width / 2 + 20}" ry="35" fill="#61c1ed" stroke="black" stroke-width="1"/>
      <text x="${x}" y="${y + 5}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold" fill="black" style="pointer-events:none;">
        ${label}
      </text>
    </g>
    `;
  },

  systemBoundary(x, y, width, height, label) {
    return `
    <g class="system-boundary">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#61c1ed" stroke="#000"/>
      <text x="${x + width / 2}" y="${y + 25}" text-anchor="middle" font-size="16" font-family="Helvetica" font-weight="bold">${label}</text>
    </g>
    `;
  },

  note(x, y, label) {
    return `
    <g class="note">
      <path d="M ${x} ${y} L ${x + 80} ${y} L ${x + 100} ${y + 20} L ${x + 100} ${y + 60} L ${x} ${y + 60} Z" fill="#61c1ed" stroke="black"/>
      <path d="M ${x + 80} ${y} L ${x + 80} ${y + 20} L ${x + 100} ${y + 20} Z" fill="#ffffff" stroke="black"/>
      <text x="${x + 50}" y="${y + 35}" text-anchor="middle" font-size="10" font-family="Helvetica" font-weight="bold">${label}</text>
    </g>
    `;
  },

  dashedOval(x, y, label) {
    return `
    <g class="dashed-oval">
      <ellipse cx="${x}" cy="${y}" rx="70" ry="30" fill="#61c1ed" stroke="black" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="${x}" y="${y + 5}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${label}</text>
    </g>
    `;
  },

  externalSystem(x, y, label) {
  const lines = wrapText(label, 140);
  const boxHeight = 40 + (lines.length - 1) * 15;

  return `
  <g class="external-system">
    <rect x="${x}" y="${y}" width="160" height="${boxHeight}" fill="#61c1ed" stroke="black"/>
    ${lines.map((line, i) => `<text x="${x + 80}" y="${y + 20 + i * 15}" text-anchor="middle" font-size="12" font-family="Helvetica" font-weight="bold">${line}</text>`).join("")}
    </g>
    `;
  },

  connector(x1, y1, x2, y2, type) {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const offset = 25;
    
    const labelX = midX - (dy / dist) * offset;
    const labelY = midY + (dx / dist) * offset;

    const label = type ? `&laquo;${type}&raquo;` : "";
    const dashed = (type === "include" || type === "extend") ? 'stroke-dasharray="5,5"' : "";

    return `
      <g class="connector">
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2" ${dashed} marker-end="url(#arrowhead)"/>
        ${label ? `<text x="${labelX}" y="${labelY}" text-anchor="middle" font-size="12" font-weight="bold" fill="black">${label}</text>` : ""}
      </g>
    `;
  }
};