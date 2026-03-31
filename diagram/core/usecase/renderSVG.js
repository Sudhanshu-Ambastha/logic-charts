import { templates } from "./templates/usecaseTemplates.js";

export function renderSVG(model, layoutData) {
  const { positions, width, height, systemHeight, systemTop, boundaryWidth } =
    layoutData;
  const centerX = width / 2;
  const boundaryX = centerX - boundaryWidth / 2;
  const boundaryY = systemTop;

  let boundary = "";
  let connectors = "";
  let nodes = "";

  if (model.system) {
    boundary += templates.systemBoundary(
      boundaryX,
      boundaryY,
      boundaryWidth,
      systemHeight,
      model.system,
    );
  }

  model.connections.forEach((conn) => {
    const p1 = positions[conn.from];
    const p2 = positions[conn.to];
    if (!p1 || !p2) return;
    connectors += templates.connector(
      p1.x,
      p1.y,
      p2.x,
      p2.y,
      conn.type,
      conn.from,
      conn.to,
      model,
    );
  });

  const renderCollection = (collection, type) => {
    Object.keys(collection).forEach((id) => {
      const p = positions[id];
      if (!p) return;
      if (type === "usecase")
        nodes += templates.useCase(p.x, p.y, collection[id]);
      else if (type === "external")
        nodes += templates.externalSystem(p.x, p.y, collection[id]);
      else if (type === "actor")
        nodes += templates.actor(p.x, p.y, collection[id]);
    });
  };

  renderCollection(model.usecases, "usecase");
  renderCollection(model.externalSystems, "external");
  renderCollection(model.actors, "actor");

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow-open" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="black" stroke-width="1.2"/>
      </marker>
      
      <marker id="arrow-hollow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
        <path d="M 10 5 L 0 0 L 0 10 Z" fill="white" stroke="black" stroke-width="1"/>
      </marker>

      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" fill="black">
        <polygon points="0 0, 10 3.5, 0 7"/>
      </marker>

      <marker id="arrow-diamond" markerWidth="12" markerHeight="12" refX="12" refY="6" orient="auto">
        <path d="M 0 6 L 6 0 L 12 6 L 6 12 Z" fill="white" stroke="black" stroke-width="1"/>
      </marker>
    </defs>
    ${boundary} ${connectors} ${nodes}
  </svg>`;
}
