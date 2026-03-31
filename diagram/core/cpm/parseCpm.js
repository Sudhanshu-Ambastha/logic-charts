import { CPMDb } from "./cpmDb.js";

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
    if (line.startsWith("activity:")) {
      activities = line
        .replace("activity:", "")
        .split(",")
        .map((s) => s.trim());
    } else if (line.startsWith("duration:")) {
      durations = line
        .replace("duration:", "")
        .split(",")
        .map((s) => s.trim());
    } else if (line.startsWith("predecessor:")) {
      predecessors = line
        .replace("predecessor:", "")
        .split(",")
        .map((s) => s.trim());
    }
  });

  if (activities.length !== durations.length) {
    throw new Error("Mismatched activity and duration counts!");
  }

  activities.forEach((id, i) => {
    const preds = predecessors[i]
      ? predecessors[i].split(";").map((p) => p.trim())
      : [];
    db.addActivity(id, durations[i], preds);
  });

  db.calculate();
  return db;
}
