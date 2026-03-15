import { templates } from "../templates/svgTemplates.js";

export function renderSVG(model, layoutData) {
  const { positions, width, height, systemHeight, systemTop, boundaryWidth } = layoutData;
  const centerX = width / 2;
  const boundaryX = centerX - (boundaryWidth / 2);
  const boundaryY = systemTop;

  let boundary = "";
  let connectors = "";
  let nodes = "";

  if (model.system) {
    boundary += templates.systemBoundary(boundaryX, boundaryY, boundaryWidth, systemHeight, model.system);
  }

  const entityConnectionCount = {};

  model.connections.forEach((conn) => {
    const p1 = positions[conn.from];
    const p2 = positions[conn.to];
    if (!p1 || !p2) return;

    const lineOffset = 0; 
    
    const isLeftToRight = p1.x < p2.x;
    
    const startX = p1.x + (isLeftToRight ? 40 : -40);
    const startY = p1.y + lineOffset;
    
    const endX = p2.x + (isLeftToRight ? -70 : 70);
    const endY = p2.y;

    connectors += templates.connector(startX, startY, endX, endY, conn.type);
  });

  const renderCollection = (collection, type) => {
    Object.keys(collection).forEach(id => {
      const p = positions[id];
      if (!p) return;
      if (type === "usecase") nodes += templates.useCase(p.x, p.y, collection[id]);
      else if (type === "external") nodes += templates.externalSystem(p.x, p.y, collection[id]);
      else if (type === "actor") nodes += templates.actor(p.x, p.y, collection[id]);
    });
  };

  renderCollection(model.usecases, "usecase");
  renderCollection(model.externalSystems, "external");
  renderCollection(model.actors, "actor");

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" fill="black">
        <polygon points="0 0, 10 3.5, 0 7"/>
      </marker>
    </defs>
    ${boundary} ${connectors} ${nodes}
  </svg>`;
}