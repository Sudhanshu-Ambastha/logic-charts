export class DiagramModel {

  constructor(title = "System") {
    this.title = title;
    this.actors = {};
    this.system = null;
    this.externalSystems = {};
    this.usecases = {};
    this.connections = [];
  }

  addActor(alias, label) {
    this.actors[alias] = label || alias;
  }

  setSystem(label) {
    this.system = label;
  }

  addExternalSystem(alias, label) {
    this.externalSystems[alias] = label || alias;
  }

  addUseCase(alias, label) {
    this.usecases[alias] = label || alias;
  }

  addConnection(from, type, to) {
    this.connections.push({
      from: from.trim(),
      type,
      to: to.trim()
    });
  }

  inferUseCases() {

    const entities = new Set();

    this.connections.forEach(conn => {
      entities.add(conn.from);
      entities.add(conn.to);
    });

    entities.forEach(entity => {

      const isActor = this.actors.hasOwnProperty(entity);
      const isExternal = this.externalSystems.hasOwnProperty(entity);
      const isUsecase = this.usecases.hasOwnProperty(entity);

      if (!isActor && !isExternal && !isUsecase) {
        this.addUseCase(entity, entity);
      }
    });
  }
}