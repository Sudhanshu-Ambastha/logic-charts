import { DiagramModel } from "./diagramModel.js";

export function parseUseCaseDiagram(code) {
  const model = new DiagramModel();
  const lines = code.split("\n");
  let mode = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line === "useCase" || line === "usecaseDiagram" || line.startsWith("#")) continue;

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
      processDefinitions(line.replace(/^actor/, ""), model, "actor");
      continue;
    }

    if (line.startsWith("usecase")) {
      mode = "usecase";
      processDefinitions(line.replace(/^usecase/, ""), model, "usecase");
      continue;
    }

    if (line.startsWith("external")) {
      mode = "external";
      processDefinitions(line.replace(/^external/, ""), model, "external");
      continue;
    }
    
    const relRegex = /^(include|extend|generalization|dependency|realization|anchor|constraint|containment):/i;
    if (line.match(relRegex)) {
      const typeMatch = line.match(relRegex);
      const type = typeMatch[1].toLowerCase();
      const content = line.split(":")[1];
      
      content.split(";").forEach(pair => {
        if (pair.includes("-->")) {
          const [from, to] = pair.split("-->").map(s => s.trim());
          if (from && to) model.addConnection(from, type, to);
        }
      });
      continue;
    }

    if (line.includes("..>")) {
      const parts = line.split("..>");
      const from = parts[0].trim();
      const rest = parts[1].trim();
      let to, type = "include";

      if (rest.includes(":")) {
        const subParts = rest.split(":");
        to = subParts[0].trim();
        const label = subParts[1].toLowerCase();
        if (label.includes("extend")) type = "extend";
      } else {
        const subParts = rest.split(/\s+/);
        to = subParts[0].trim();
        if (subParts[1] && subParts[1].toLowerCase().includes("extend")) type = "extend";
      }
      model.addConnection(from, type, to);
      continue;
    }

    if (line.includes("-->")) {
      const [from, targets] = line.split("-->");
      targets.split(";").forEach(to => {
        const cleanTo = to.trim();
        if (cleanTo) model.addConnection(from.trim(), "association", cleanTo);
      });
      continue;
    }

    if (mode === "usecase" || mode === "actor" || mode === "external") {
      processDefinitions(line, model, mode);
    }
  }

  model.inferUseCases();
  return model;
}

function processDefinitions(content, model, type) {
  content.split(";").forEach(part => {
    const p = part.trim();
    if (!p || p.includes("-->") || p.includes("..>")) return;

    const match = p.match(/"(.+?)"\s+as\s+(\w+)/);
    if (match) {
      const [, label, alias] = match;
      if (type === "actor") model.addActor(alias, label);
      else if (type === "external") model.addExternalSystem(alias, label);
      else model.addUseCase(alias, label);
    } else {
      const alias = p.split(/\s+/)[0];
      if (alias) {
        if (type === "actor") model.addActor(alias, alias);
        else if (type === "external") model.addExternalSystem(alias, alias); 
        else model.addUseCase(alias, alias);
      }
    }
  });
}