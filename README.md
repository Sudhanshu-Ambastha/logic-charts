# 🏗️ Logic-Charts: Modular Diagram Engine

A lightweight, modular SVG rendering engine designed to create professional-grade **UML Use Case**, **CPM (Critical Path Method)**, and **PERT (Program Evaluation Review Technique)** diagrams. This toolkit prioritizes outcome-oriented pragmatism, providing a solution for technical visualization.

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
usecaseDiagram
    actor "Customer" as C
    actor "Technician" as T
    external "Bank Server" as S
    system "ATM System" {
        usecase "Withdraw Cash" as UC1
        usecase "Check Balance" as UC2
        usecase "Login" as UC3
    }
    C --> UC1; UC2
    T --> UC3
    include: UC1 --> UC3
    dependency: UC1 --> S
```

### 🏹 PERT (Program Evaluation Review Technique) Engine

- **Three-Time Estimate Logic:** Automatically calculates Expected Time ($t_e$) using Optimistic ($t_o$), Most Likely ($t_m$), and Pessimistic ($t_p$) inputs.
- **Event-Oriented (AOA):** Renders professional Activity-on-Arrow diagrams with dual-timed event nodes.
- **Float Management:** Displays Earliest and Latest occurrence times in specialized "floating" metadata boxes above each node.

```
pert
  activity: 1-2, 2-3, 2-4, 3-5, 4-5
  optimistic: 2, 5, 1, 8, 3
  likely: 4, 7, 2, 10, 4
  pessimistic: 6, 9, 3, 12, 5
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

1. **Detection:** The `editor.js` and `main.js` check if the code starts with `useCase`, `cpm` or `pert`.
2. **Processing:**
   - **PERT/CPM**, the system performs a **Topological Sort** to ensure predecessors are calculated before successors, preventing math errors during the forward and backward pass.

   - For **UseCase**, it uses a **Center-Out layout** to align actors and external systems around the central system boundary.

3. **Rendering:** The engine utilizes a **Template-Based Architecture**, generating optimized SVG strings injected directly into the DOM for high-performance updates.

This modular architecture keeps the renderer **clean, extensible, and easy to maintain**.
