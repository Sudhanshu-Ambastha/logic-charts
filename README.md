# 🏗️ Logic-Charts: Modular Diagram Engine

A lightweight, modular SVG rendering engine designed to create professional-grade **UML Use Case** and **CPM (Critical Path Method)** diagrams. This toolkit prioritizes outcome-oriented pragmatism, providing a "one-man army" solution for technical visualization.

---

## ✨ Features

### 📈 CPM (Critical Path Method) Engine
- **Automated Scheduling:** Calculates Early Start (ES), Early Finish (EF), Late Start (LS), Late Finish (LF), and Total Float/Slack automatically.
- **Visual Critical Path:** Automatically identifies the critical path and highlights it with bold red connectors.
- **3-Row AON Layout:** Renders the standard "Activity-on-Node" 9-grid blocks used in professional project management.
```
cpm
  activity: A, B, C, D
  duration: 10, 5, 8, 3
  predecessor: _, A, A, B;C
```

### 🛡️ UML Use Case Engine
- **Dynamic Layout:** Automatically manages actor and use case spacing to prevent overlapping.
- **Standard Adornments:** Supports «include» and «extend» relationship styles with custom constraint markers.
- **Modular Templates:** Clean, scalable SVG components for Actors, Use Cases, and System Boundaries.
```
useCase
  actor: User, Admin
  usecase: Login, ManageUsers
  User -> Login
  Admin -> ManageUsers
```
  

### Modular Architecture
Designed to be **easy to extend**, allowing developers to add:

- New diagram elements
- Custom shapes
- Additional rendering logic

without modifying the core system.

---


## 🚀 Quick Start

To get the project running locally, make sure **Node.js** is installed on your system, then run the following commands in your terminal.

### Clone the repository

```bash
git clone "https://github.com/Sudhanshu-Ambastha/logic-charts.git"
```
### 📦 Install Dependencies

```bash
cd diagram && npm install
```

### ▶️ Run the Development Server
```bash
npm run dev
```

## ⚙️ How It Works
The system uses a **keyword-routing approach** to decide which engine to use:
1. **Detection:** The `editor.js` and `main.js` check if the code starts with `useCase` or `cpm`.
2. **Processing:** * For **CPM**, the system performs a **Topological Sort** to ensure parents are calculated before children, preventing **NaN** math errors.
  - For **UseCase**, it uses a **Center-Out layout** to align actors and external systems around the central system boundary.
3. **Rendering:** The engine generates an optimized SVG string and injects it directly into the DOM for high-performance updates.

This modular architecture keeps the renderer **clean, extensible, and easy to maintain**.
