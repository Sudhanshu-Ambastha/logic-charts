import { templates } from "../templates/svgTemplates.js";

export function renderSVG(model, positions) {
  let content = "";
  if (model.system) content += templates.systemBoundary(300, 80, 400, 350, model.system);

  Object.keys(model.usecases).forEach(uc => {
    const p = positions[uc];
    if (p) content += templates.useCase(p.x, p.y, model.usecases[uc]);
  });

  Object.keys(model.actors).forEach(actor => {
    const p = positions[actor];
    if (p) content += templates.actor(p.x, p.y, model.actors[actor]);
  });

  model.connections.forEach(conn => {
    const p1 = positions[conn.from];
    const p2 = positions[conn.to];
    if (!p1 || !p2) return;

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const rx = 80;
    const ry = 35;
    
    const startX = p1.x + (dx / dist) * rx;
    const startY = p1.y + (dy / dist) * ry;
    const endX = p2.x - (dx / dist) * rx;
    const endY = p2.y - (dy / dist) * ry;

    content += templates.connector(startX, startY, endX, endY, conn.type);
  });

  Object.keys(model.usecases).forEach(uc => {
    const p = positions[uc];
    if (p) content += templates.useCase(p.x, p.y, model.usecases[uc]);
  });

  Object.keys(model.actors).forEach(actor => {
    const p = positions[actor];
    if (p) content += templates.actor(p.x, p.y, model.actors[actor]);
  });

  return `<svg width="900" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7"/>
      </marker>
    </defs>
    ${content}
  </svg>`;
}