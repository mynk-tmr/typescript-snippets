export class Graph<T> {
  private list = new Map() as Map<T, Set<T>>;
  readonly undirected: boolean;
  constructor({ undirected }: { undirected: boolean }) {
    this.undirected = undirected;
  }
  add_vertex(x: T) {
    this.list.set(x, new Set<T>());
  }
  has_vertex(x: T) {
    return this.list.has(x);
  }
  add_edge(a: T, b: T) {
    if (!this.list.has(a)) this.add_vertex(a);
    const set = this.list.get(a)!;
    set.add(b);
    if (this.undirected && !this.has_edge(b, a)) this.add_edge(b, a);
  }
  has_edge(a: T, b: T) {
    return this.list.get(a)?.has(b) ? true : false;
  }
  remove_edge(a: T, b: T) {
    const set = this.list.get(a);
    if (!set) return false;
    set.delete(b);
    if (this.undirected && this.has_edge(b, a)) this.remove_edge(b, a);
    return true;
  }
  remove_vertex(a: T) {
    const set = this.list.get(a);
    if (!set) return false;
    set.forEach((b) => {
      this.remove_edge(b, a);
    });
    this.list.delete(a);
  }
  *[Symbol.iterator]() {
    for (const [vtx, set] of this.list) {
      yield `${vtx} -> ${[...set]}`;
    }
  }
}

const g = new Graph<string>({ undirected: true });
g.add_edge('a', 'b');
g.add_edge('a', 'c');
g.add_edge('c', 'b');
g.add_edge('c', 'd');
g.remove_vertex('a');

console.log([...g].join('\n'));
