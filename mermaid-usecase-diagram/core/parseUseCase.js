import { DiagramModel } from "./diagramModel.js";

export function parseUseCaseDiagram(code) {
  const model = new DiagramModel();
  const lines = code.split("\n");
  let mode = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line === "useCase" || line === "usecaseDiagram") continue;

    if (line.startsWith("system")) {
      const match = line.match(/system\s+"(.+?)"/);
      if (match) model.setSystem(match[1]);
      continue;
    }

    if (line === "}") {
      mode = null;
      continue;
    }

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

    if (line.startsWith("external")) {
      const parts = line.replace(/^external/, "").split(";");
      parts.forEach(part => {
        const match = part.trim().match(/"(.+?)"\s+as\s+(\w+)/);
        if (match) model.addExternalSystem(match[2], match[1]);
      });
      continue;
    }

    if (line.includes("..>")) {
      const [from, rest] = line.split("..>");
      const right = rest.split(":");
      const to = right[0].trim();
      let type = "include";
      if (right[1]) type = right[1].replace(/<<|>>/g, "").trim();
      model.addConnection(from.trim(), type, to);
      continue;
    }

    if (line.includes("-->")) {
      const [from, targets] = line.split("-->");
      const targetList = targets.split(";");
      
      targetList.forEach(to => {
        const cleanTo = to.trim();
        if (cleanTo) {
          model.addConnection(from.trim(), "association", cleanTo);
        }
      });
      continue;
    }
  }

  model.inferUseCases();
  return model;
}