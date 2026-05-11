export class CPMDb {
  constructor() {
    this.activities = {};
  }

  addActivity(id, duration, predecessors = []) {
    this.activities[id] = {
      id,
      duration: parseFloat(duration) || 0,
      predecessors: predecessors.filter((p) => p && p !== "_" && p !== ""),
      successors: [],
      es: 0,
      ef: 0,
      ls: 0,
      lf: 0,
      slack: 0,
      isCritical: false,
    };
  }

  getSortedNodes() {
    const nodes = Object.values(this.activities);
    const sorted = [];
    const visited = new Set();
    const permanent = new Set();

    const visit = (id) => {
      if (permanent.has(id)) return;
      if (visited.has(id)) {
        throw new Error(`Cycle detected at activity: ${id}`);
      }

      const node = this.activities[id];
      if (!node) return;

      visited.add(id);

      node.predecessors.forEach((p) => {
        visit(p);
      });

      visited.delete(id);
      permanent.add(id);
      sorted.push(node);
    };

    nodes.forEach((n) => {
      if (!permanent.has(n.id)) visit(n.id);
    });

    return sorted;
  }

  calculate() {
    const nodes = this.getSortedNodes();

    Object.values(this.activities).forEach((n) => (n.successors = []));

    nodes.forEach((node) => {
      node.predecessors.forEach((predId) => {
        if (this.activities[predId]) {
          if (!this.activities[predId].successors.includes(node.id)) {
            this.activities[predId].successors.push(node.id);
          }
        }
      });
    });

    nodes.forEach((node) => {
      if (node.predecessors.length === 0) {
        node.es = 0;
      } else {
        node.es = Math.max(
          ...node.predecessors.map((p) => this.activities[p]?.ef || 0)
        );
      }
      node.ef = node.es + node.duration;
    });

    const projectFinishTime =
      nodes.length > 0 ? Math.max(...nodes.map((n) => n.ef)) : 0;

    [...nodes].reverse().forEach((node) => {
      if (node.successors.length === 0) {
        node.lf = projectFinishTime;
      } else {
        node.lf = Math.min(
          ...node.successors.map(
            (s) => this.activities[s]?.ls ?? projectFinishTime
          )
        );
      }
      node.ls = node.lf - node.duration;
      node.slack = node.lf - node.ef;
      node.isCritical = Math.abs(node.slack) < 0.001;
    });
  }
}

export function parseCPM(code) {
  const db = new CPMDb();
  const lines = code
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));

  let activities = [],
    durations = [],
    predecessors = [];

  lines.forEach((line) => {
    const clean = (prefix) =>
      line
        .replace(prefix, "")
        .split(",")
        .map((s) => s.trim());
    if (line.startsWith("activity:")) activities = clean("activity:");
    else if (line.startsWith("duration:")) durations = clean("duration:");
    else if (line.startsWith("predecessor:"))
      predecessors = clean("predecessor:");
  });

  if (activities.length === 0) throw new Error("No activities defined!");
  if (activities.length !== durations.length)
    throw new Error("Mismatched activity and duration counts!");

  activities.forEach((id, i) => {
    const preds = predecessors[i]
      ? predecessors[i].split(";").map((p) => p.trim())
      : [];
    db.addActivity(id, durations[i], preds);
  });

  db.calculate();
  return db;
}
