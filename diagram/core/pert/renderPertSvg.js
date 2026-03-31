import { pertTemplates } from "./templates/pertTemplates.js";

export function renderPertSvg(model, layoutData) {
  const { positions, width, height } = layoutData;
  const radius = 30;

  let connectors = "";
  let eventGroup = "";

  model.activities.forEach((act) => {
    const start = positions[act.from];
    const end = positions[act.to];
    if (!start || !end) return;

    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const x1 = start.x + radius * Math.cos(angle);
    const y1 = start.y + radius * Math.sin(angle);
    const x2 = end.x - radius * Math.cos(angle);
    const y2 = end.y - radius * Math.sin(angle);

    const isCritical =
      Math.abs(model.events[act.from].e + act.te - model.events[act.to].e) <
        0.1 &&
      Math.abs(model.events[act.from].l + act.te - model.events[act.to].l) <
        0.1;

    connectors += pertTemplates.activity(
      x1,
      y1,
      x2,
      y2,
      act.te,
      isCritical,
      (x1 + x2) / 2,
      (y1 + y2) / 2 - 10,
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
