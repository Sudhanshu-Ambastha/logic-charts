export const cpmTemplates = {
  node(x, y, data) {
    const borderColor = data.isCritical ? "#ff4d4d" : "#000";
    const borderWidth = data.isCritical ? "2" : "1";
    const slackColor = data.isCritical ? "red" : "black";
    const slackBg = data.isCritical ? "#fee2e2" : "#f1f5f9";

    return `
    <g class="cpm-node" transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <rect x="40" y="0" width="40" height="30" fill="#e2e8f0" stroke="black" stroke-width="1"/>
      <rect x="80" y="0" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <text x="20" y="20" text-anchor="middle" font-size="11" font-family="monospace">${data.es}</text>
      <text x="60" y="20" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold">${data.duration}</text>
      <text x="100" y="20" text-anchor="middle" font-size="11" font-family="monospace">${data.ef}</text>

      <rect x="0" y="30" width="120" height="40" fill="white" stroke="${borderColor}" stroke-width="${borderWidth}"/>
      <text x="60" y="55" text-anchor="middle" font-size="13" font-family="sans-serif" font-weight="800">${data.id}</text>

      <rect x="0" y="70" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <rect x="40" y="70" width="40" height="30" fill="${slackBg}" stroke="black" stroke-width="1"/>
      <rect x="80" y="70" width="40" height="30" fill="#f1f5f9" stroke="black" stroke-width="1"/>
      <text x="20" y="90" text-anchor="middle" font-size="11" font-family="monospace">${data.ls}</text>
      <text x="60" y="90" text-anchor="middle" font-size="11" font-family="monospace" fill="${slackColor}">${data.slack}</text>
      <text x="100" y="90" text-anchor="middle" font-size="11" font-family="monospace">${data.lf}</text>
    </g>`;
  },
};
