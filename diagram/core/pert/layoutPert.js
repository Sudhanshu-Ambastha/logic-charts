export function layoutPert(model) {
  const positions = {};
  const levels = {};
  const eventLevels = {};

  const eventIds = Object.keys(model.events).sort(
    (a, b) => parseInt(a) - parseInt(b),
  );

  eventIds.forEach((id) => {
    const node = model.events[id];
    let level = 0;

    if (node.predecessors.length > 0) {
      level = Math.max(
        ...node.predecessors.map((p) => (eventLevels[p.from] ?? 0) + 1),
      );
    }

    eventLevels[id] = level;
    if (!levels[level]) levels[level] = [];
    levels[level].push(id);
  });

  const xSpacing = 250;
  const ySpacing = 180;
  const marginX = 100;
  const marginY = 150;

  let maxEventsInLevel = 0;

  Object.keys(levels).forEach((levelIdx) => {
    const ids = levels[levelIdx];
    maxEventsInLevel = Math.max(maxEventsInLevel, ids.length);

    ids.forEach((id, i) => {
      const totalLevelHeight = (ids.length - 1) * ySpacing;
      const startY =
        marginY + (maxEventsInLevel * ySpacing) / 2 - totalLevelHeight / 2;

      positions[id] = {
        x: marginX + levelIdx * xSpacing,
        y:
          ids.length > 1
            ? startY + i * ySpacing
            : marginY + (maxEventsInLevel * ySpacing) / 2,
      };
    });
  });

  return {
    positions,
    width: Object.keys(levels).length * xSpacing + marginX * 2,
    height: maxEventsInLevel * ySpacing + marginY * 2,
  };
}
