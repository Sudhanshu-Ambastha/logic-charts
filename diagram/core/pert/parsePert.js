import { PERTDb } from "./pertDb.js";

export function parsePert(code) {
  const db = new PERTDb();
  const lines = code
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));

  let activities = [],
    to = [],
    tm = [],
    tp = [];

  lines.forEach((line) => {
    const clean = (prefix) =>
      line
        .replace(prefix, "")
        .split(",")
        .map((s) => s.trim());

    if (line.startsWith("activity:")) activities = clean("activity:");
    else if (line.startsWith("optimistic:")) to = clean("optimistic:");
    else if (line.startsWith("likely:")) tm = clean("likely:");
    else if (line.startsWith("pessimistic:")) tp = clean("pessimistic:");
  });

  activities.forEach((act, i) => {
    const parts = act.split("-").map((s) => s.trim());
    if (parts.length === 2) {
      db.addActivity(
        parts[0],
        parts[1],
        parseFloat(to[i] || 0),
        parseFloat(tm[i] || 0),
        parseFloat(tp[i] || 0),
      );
    }
  });

  db.calculate();

  return db;
}
