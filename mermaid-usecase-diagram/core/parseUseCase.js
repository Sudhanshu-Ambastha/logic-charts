import { DiagramModel } from "./diagramModel.js";

export function parseUseCaseDiagram(code) {
  const model = new DiagramModel();
  const lines = code.split("\n");
  let mode = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line === "useCase" || line === "usecaseDiagram") continue;

    // system
    if (line.startsWith("system")) {
      const match = line.match(/system\s+"(.+?)"/);
      if (match) model.setSystem(match[1]);
      continue;
    }

    if (line === "}") {
      mode = null;
      continue;
    }

    // actors
    if (line.startsWith("actor")) {
      mode = "actor";
      const parts = line.replace(/^actor/, "").split(";");
      for (const part of parts) {
        const p = part.trim();
        if (!p) continue;
        const match = p.match(/"(.+?)"\s+as\s+(\w+)/);
        if (match) {
          const [, label, alias] = match;
          model.addActor(alias, label);
        }
      }
      continue;
    }

    // usecases
    if (line.startsWith("usecase")) {
      mode = "usecase";
      const parts = line.replace(/^usecase/, "").split(";");
      for (const part of parts) {
        const p = part.trim();
        if (!p) continue;
        const match = p.match(/"(.+?)"\s+as\s+(\w+)/);
        if (match) {
          const [, label, alias] = match;
          model.addUseCase(alias, label);
        }
      }
      continue;
    }

    // multiline usecases
    if (mode === "usecase") {
      const parts = line.split(";");
      for (const part of parts) {
        const p = part.trim();
        if (!p) continue;
        const match = p.match(/"(.+?)"\s+as\s+(\w+)/);
        if (match) {
          const [, label, alias] = match;
          model.addUseCase(alias, label);
        }
      }
      continue;
    }

    // include
    if (line.includes("..>")) {
      const [from, rest] = line.split("..>");
      const right = rest.split(":");
      const to = right[0].trim();
      let type = "include";
      if (right[1]) type = right[1].replace(/<<|>>/g, "").trim();
      model.addConnection(from.trim(), type, to);
      continue;
    }

    // association
    if (line.includes("-->")) {
      const [from, to] = line.split("-->");
      model.addConnection(from.trim(), "association", to.trim());
      continue;
    }
  }

  model.inferUseCases();
  return model;
}