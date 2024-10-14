export class Stack<t> {
  private items: t[];
  constructor(readonly size: number) {
    this.items = Array<t>(size);
  }
  add = (x: t) => this.items.push(x);
  remove = () => this.items.pop();
  peek = () => this.items.at(-1);
  clear = () => {
    this.items = Array<t>();
  };
  get contents() {
    return this.items.toReversed() as readonly t[];
  }
}
