import { pertTemplates } from "./templates/pertTemplates.js";

export function renderPertSvg(model, layoutData) {
  const { positions, width, height } = layoutData;
  const radius = 30;

  let connectors = "";
  let eventGroup = "";

  model.activities.forEach((act) => {
    const startNode = model.events[act.from];
    const endNode = model.events[act.to];
    const startPos = positions[act.from];
    const endPos = positions[act.to];

    if (!startPos || !endPos) return;

    const isCritical =
      Math.abs(startNode.e - startNode.l) < 0.1 &&
      Math.abs(endNode.e - endNode.l) < 0.1 &&
      Math.abs(startNode.e + act.te - endNode.e) < 0.1;

    const angle = Math.atan2(endPos.y - startPos.y, endPos.x - startPos.x);
    const x1 = startPos.x + radius * Math.cos(angle);
    const y1 = startPos.y + radius * Math.sin(angle);
    const x2 = endPos.x - radius * Math.cos(angle);
    const y2 = endPos.y - radius * Math.sin(angle);

    connectors += pertTemplates.activity(
      x1,
      y1,
      x2,
      y2,
      act.te,
      isCritical,
      (x1 + x2) / 2,
      (y1 + y2) / 2 - 12,
    );
  });

  Object.values(model.events).forEach((event) => {
    eventGroup += pertTemplates.eventNode(event, positions[event.id], radius);
  });

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-pert-norm" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
        <marker id="arrow-pert-crit" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#ff4d4d" />
        </marker>
      </defs>
      <rect width="100%" height="100%" fill="white" />
      ${connectors}
      ${eventGroup}
    </svg>`;
}
