export class PERTDb {
  constructor() {
    this.events = {};
    this.activities = [];
  }

  addActivity(from, to, topt, tml, tpess) {
    const te = (topt + 4 * tml + tpess) / 6;
    const variance = Math.pow((tpess - topt) / 6, 2);

    this.activities.push({ from, to, te, variance });

    [from, to].forEach((id) => {
      if (!this.events[id]) {
        this.events[id] = {
          id,
          e: 0,
          l: Infinity,
          successors: [],
          predecessors: [],
        };
      }
    });

    this.events[from].successors.push({ to, te });
    this.events[to].predecessors.push({ from, te });
  }

  calculate() {
    const eventIds = Object.keys(this.events).sort((a, b) => a - b);

    eventIds.forEach((id) => {
      const node = this.events[id];
      if (node.predecessors.length === 0) {
        node.e = 0;
      } else {
        node.e = Math.max(
          ...node.predecessors.map((p) => this.events[p.from].e + p.te),
        );
      }
    });

    const lastId = eventIds[eventIds.length - 1];
    const projectTime = this.events[lastId].e;

    [...eventIds].reverse().forEach((id) => {
      const node = this.events[id];
      if (node.successors.length === 0) {
        node.l = projectTime;
      } else {
        node.l = Math.min(
          ...node.successors.map((s) => this.events[s.to].l - s.te),
        );
      }
    });
  }
}
