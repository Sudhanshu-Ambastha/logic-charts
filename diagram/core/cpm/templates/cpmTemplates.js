export const cpmTemplates = {
  node(x, y, data) {
    const color = data.isCritical ? "#ff4d4d" : "#61c1ed";
    const textColor = "#000";

    return `
    <g class="cpm-node" transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="40" height="30" fill="#90ee90" stroke="black"/>
      <rect x="40" y="0" width="40" height="30" fill="#32cd32" stroke="black"/>
      <rect x="80" y="0" width="40" height="30" fill="#90ee90" stroke="black"/>
      <text x="20" y="20" text-anchor="middle" font-size="12">${data.es}</text>
      <text x="60" y="20" text-anchor="middle" font-size="12" font-weight="bold">${data.duration}</text>
      <text x="100" y="20" text-anchor="middle" font-size="12">${data.ef}</text>

      <rect x="0" y="30" width="120" height="40" fill="white" stroke="black"/>
      <text x="60" y="55" text-anchor="middle" font-size="14" font-weight="bold">${data.id}</text>

      <rect x="0" y="70" width="40" height="30" fill="#87ceeb" stroke="black"/>
      <rect x="40" y="70" width="40" height="30" fill="#00bfff" stroke="black"/>
      <rect x="80" y="70" width="40" height="30" fill="#87ceeb" stroke="black"/>
      <text x="20" y="90" text-anchor="middle" font-size="12">${data.ls}</text>
      <text x="60" y="90" text-anchor="middle" font-size="12">${data.slack}</text>
      <text x="100" y="90" text-anchor="middle" font-size="12">${data.lf}</text>
    </g>
    `;
  },
};
