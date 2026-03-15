export function layoutDiagram(model) {
  const ucIds = Object.keys(model.usecases);
  const actors = Object.keys(model.actors);
  const exts = Object.keys(model.externalSystems);

  // Reduced total width and offset to pull everything closer to the center
  const width = 800; 
  const centerX = width / 2;
  const sideOffset = 220; 
  const actorX = centerX - sideOffset;
  const extX = centerX + sideOffset;

  const systemTop = 80;
  const headerHeight = 70;
  const spacing = 70; 
  const startY = systemTop + headerHeight;

  const positions = {};

  ucIds.forEach((id, i) => {
    positions[id] = { x: centerX, y: startY + (i * spacing) };
  });

  const placeEntities = (entities, xPos) => {
    entities.forEach((id, index) => {
      const connections = model.connections.filter(c => c.from === id || c.to === id);
      const connectedY = connections
        .map(c => positions[c.from === id ? c.to : c.from]?.y)
        .filter(y => y !== undefined);

      let y = connectedY.length > 0 
        ? connectedY.reduce((a, b) => a + b, 0) / connectedY.length 
        : startY + index * spacing;
        
      positions[id] = { x: xPos, y };
    });
  };

  placeEntities(actors, actorX);
  placeEntities(exts, extX);

  const systemHeight = (ucIds.length * spacing) + headerHeight;
  const height = Math.max(systemTop + systemHeight + 60, 600);

  return { positions, width, height, systemHeight, systemTop, boundaryWidth: 280 };
}