import { SinglyList } from './singly-list';

export class DoublyList<T> extends SinglyList<T> {
  tail = null as typeof this.head;

  prepend(value: T) {
    const phead = this.head;
    this.head = { value, prev: null, next: phead };
    if (phead) phead.prev = this.head;
    this.tail ??= this.head;
    return ++this.length;
  }

  append(value: T) {
    const ptail = this.tail;
    this.tail = { value, prev: ptail, next: null };
    if (ptail) ptail.next = this.tail;
    this.head ??= this.tail;
    return ++this.length;
  }

  insert(value: T, at: number) {
    this.throwIfBad(at);
    if (at === 0) return this.prepend(value);
    if (at === this.length) return this.append(value);
    else {
      let { prev, next } = this.walker(at);
      prev.next = next!.prev = { value, prev, next };
    }
    return ++this.length;
  }

  removeHead() {
    if (!this.head) throw 'NOT_PRESENT';
    const phead = this.head;
    this.head = phead.next;
    if (this.head) this.head.prev = null;
    else this.tail = null;
    --this.length;
    return phead;
  }

  removeTail() {
    if (!this.tail) throw 'NOT_PRESENT';
    const ptail = this.tail;
    this.tail = ptail.prev!;
    if (this.tail) this.tail.next = null;
    else this.head = null;
    --this.length;
    return ptail;
  }

  removeAt(at: number) {
    this.throwIfBad(at, true);
    let tgt: typeof this.head;
    if (at === 0) tgt = this.removeHead();
    else if (at === this.length - 1) tgt = this.removeTail();
    else {
      const { prev, next } = this.walker(at);
      tgt = next!;
      prev.next = tgt.next;
    }
    --this.length;
    return tgt;
  }

  reverse() {
    if (!this.head) return;
    let prev = null, curr = this.head, next = curr.next;
    while (next) {
      next = curr.next; curr.next = prev; curr.prev = next;
      prev = curr; curr = next!;
    }
    this.tail = this.head;
    this.head = prev;
  }
}