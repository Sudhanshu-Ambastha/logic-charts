# Mermaid UseCase Diagram Renderer

A lightweight, modular SVG rendering engine designed to create **professional-grade UML Use Case diagrams** with support for custom constraints and relationship types.

---

## ✨ Features

### Dynamic Layout
Automatically manages **Use Case spacing and connector paths**, helping diagrams remain readable even as complexity grows.

### Custom Templates
Provides **clean, scalable SVG components** for:
- Actors
- Use Cases
- Notes
- System Boundaries

### Professional UML Adornments
Supports standard UML relationship styles including:

- `«include»`
- `«extend»`

along with **open-arrow connectors** and **custom constraint markers**.

### Modular Architecture
Designed to be **easy to extend**, allowing developers to add:

- New diagram elements
- Custom shapes
- Additional rendering logic

without modifying the core system.

---

## 📁 Project Structure

- **template.js:** Contains all **SVG generation functions** and reusable visual components used across the renderer.  
This file defines templates for elements such as **Actors, Use Cases, Notes, System Boundaries, and connectors**.

- **usecaseRenderer.js:** Responsible for **layout calculation and diagram assembly**.  
It interprets parsed diagram data and uses the SVG templates to construct the final diagram structure.

- **usecasediagram.js:** Handles **parsing of the diagram text syntax**.  
This module reads relationships and elements from the diagram definition and converts them into structured data that the renderer can use.

- **main.js:** Acts as the **entry point of the application**.  
It loads the diagram definition, invokes the parser and renderer modules, and injects the generated **SVG output into the DOM**.

---

## 🚀 Quick Start

To get the project running locally, make sure **Node.js** is installed on your system, then run the following commands in your terminal.

### Clone the repository

```bash
git clone "https://github.com/Sudhanshu-Ambastha/usecase.git"
```
### 📦 Install Dependencies

```bash
cd mermaid-usecase-diagram && npm install
```

### ▶️ Run the Development Server
```bash
npx vite
```

## ⚙️ How It Works

The system uses a **template-based rendering approach** to generate diagrams.

- The **parser (`usecasediagram.js`)** reads the diagram text and extracts **actors, use cases, and relationships**.
- The **renderer (`usecaseRenderer.js`)** processes this structured data and determines the **layout of the diagram**.
- The **template module (`template.js`)** provides reusable **SVG components** for drawing diagram elements.
- Finally, **`main.js` renders the generated SVG into the DOM**, displaying the diagram in the browser.

This modular architecture keeps the renderer **clean, extensible, and easy to maintain**.
