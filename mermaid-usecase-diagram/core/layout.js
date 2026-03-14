export function layoutDiagram(model) {

  const positions = {};

  const actorSpacing = 150;
  const usecaseSpacing = 120;

  let startY = 150;

  /* actors */

  Object.keys(model.actors).forEach((actor, i) => {
    positions[actor] = {
      x: 120,
      y: startY + i * actorSpacing
    };
  });

  /* usecases inside system */

  Object.keys(model.usecases).forEach((uc, i) => {
    positions[uc] = {
      x: 450,
      y: startY + i * usecaseSpacing
    };
  });

  return positions;
}