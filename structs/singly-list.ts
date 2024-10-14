export type Item<T> = null | { value: T; next: Item<T>; prev: Item<T>; };

export class SinglyList<T> {
  head = null as Item<T>;
  length = 0;
  protected throwIfBad(at: number, strict = false) {
    if (!Number.isInteger(at) || at < 0 || at > this.length) throw at;
    if (strict && at === this.length) throw at;
  }
  protected walker(at: number) {
    let prev = this.head!, next = prev.next;
    while (--at > 0 && next) {
      prev = next; next = next.next;
    }
    return { prev, next };
  }
  insert(value: T, at: number) {
    this.throwIfBad(at);
    if (at === 0) this.head = { value, next: this.head, prev: null };
    else {
      const { prev, next } = this.walker(at);
      prev.next = { value, next, prev: null };
    }
    return ++this.length;
  }
  prepend(value: T) {
    return this.insert(value, 0);
  }
  append(value: T) {
    return this.insert(value, this.length);
  }
  removeAt(at: number) {
    this.throwIfBad(at, true);
    let tgt = this.head!;
    if (at === 0) this.head = tgt.next;
    else {
      const { prev, next } = this.walker(at);
      prev.next = next?.next ?? null;
    }
    --this.length;
    return tgt;
  }
  removeNode(value: T) {
    if (this.head === null) return false;
    let prev = this.head, next = prev.next;
    if (prev.value === value) this.head = next;
    else {
      while (next && next.value !== value) {
        prev = next; next = next.next;
      }
      if (!next) return false;
      prev.next = next.next;
    }
    return --this.length;
  }
  reverse() {
    let prev = null, curr = this.head, next = null;
    while (curr) {
      next = curr.next; curr.next = prev; prev = curr; curr = next;
    }
    this.head = prev;
  }
  *[Symbol.iterator]() {
    let pt = this.head;
    while (pt) {
      yield pt.value + ' ->'; pt = pt.next;
    }
    yield null; return;
  }
}