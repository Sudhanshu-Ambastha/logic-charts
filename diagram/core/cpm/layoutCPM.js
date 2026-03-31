/**
 * Layout Engine for CPM: Calculates horizontal levels based on dependencies.
 */
export function layoutCPM(model) {
  const positions = {};
  const levels = {};
  const nodeLevels = {};

  // Use the sorted nodes to ensure level 0 is processed before level 1
  const activities = model.getSortedNodes();

  // 1. Assign Levels (Horizontal Rank)
  activities.forEach((node) => {
    let level = 0;
    if (node.predecessors.length > 0) {
      level = Math.max(
        ...node.predecessors.map((p) => (nodeLevels[p] ?? 0) + 1),
      );
    }
    nodeLevels[node.id] = level;
    if (!levels[level]) levels[level] = [];
    levels[level].push(node.id);
  });

  // 2. Constants for the 3-row block size (120x100)
  const xSpacing = 220;
  const ySpacing = 160;
  const marginX = 80;
  const marginY = 80;

  let maxNodesInLevel = 0;

  Object.keys(levels).forEach((levelIdx) => {
    const ids = levels[levelIdx];
    maxNodesInLevel = Math.max(maxNodesInLevel, ids.length);

    ids.forEach((id, i) => {
      positions[id] = {
        x: marginX + levelIdx * xSpacing,
        y: marginY + i * ySpacing,
      };
    });
  });

  return {
    positions,
    width: Object.keys(levels).length * xSpacing + marginX * 2,
    height: maxNodesInLevel * ySpacing + marginY * 2,
  };
}
