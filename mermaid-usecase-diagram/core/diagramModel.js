export class DiagramModel {
  constructor(title = "System") {
    this.title = title;
    this.actors = {};
    this.system = null;
    this.usecases = {};
    this.connections = [];
  }

  addActor(alias, label) {
    this.actors[alias] = label || alias;
  }

  setSystem(label) {
    this.system = label;
  }

  addUseCase(alias, label) {
    this.usecases[alias] = label || alias;
  }

  addConnection(from, type, to) {
    this.connections.push({ from, type, to });
  }

  inferUseCases() {
    const entities = new Set();

    this.connections.forEach(c => {
      entities.add(c.from);
      entities.add(c.to);
    });

    entities.forEach(entity => {
      if (!this.actors[entity]) {
        if (!this.usecases[entity]) {
          this.addUseCase(entity, entity);
        }
      }
    });
  }
}