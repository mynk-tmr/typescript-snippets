export class CircularQueue<T> {
  private items: Map<number, T> = new Map();
  private front = 0;
  private rear = 0;
  constructor(readonly maxsize: number) {}
  get size() {
    return this.rear - this.front;
  }
  enqueue(x: T) {
    if (this.size === this.maxsize) return;
    this.items.set(this.rear++, x);
    return this.size;
  }
  deque() {
    if (this.size === 0) return;
    const rm = this.items.get(this.front);
    this.items.delete(this.front++);
    if (this.front === this.rear) this.clear();
    return rm;
  }
  clear() {
    this.items.clear();
    this.front = this.rear = 0;
  }
  peek() {
    return this.items.get(this.front);
  }
}
