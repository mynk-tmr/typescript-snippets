type Dict<T> = {
  key: string;
  value: T;
};

export class Hashtable<T> {
  size = 0;
  private table: Record<string, Array<Dict<T>> | undefined> = {};
  constructor(
    readonly maxsize: number,
    readonly hasher: (k: string) => string,
  ) {}
  get full() {
    return this.size === this.maxsize;
  }
  get(key: string) {
    const list = this.table[this.hasher(key)];
    if (list) return list.find((x) => x.key === key)?.value;
  }
  set(key: string, value: T) {
    const index = this.hasher(key);
    const list = this.table[index] ?? [];
    const dup = list.find((x) => x.key === key);
    if (dup) {
      dup.value = value;
      return this.size;
    } else if (this.size === this.maxsize) return false;
    else {
      list.push({ key, value });
      return ++this.size;
    }
  }
  remove(key: string) {
    const list = this.table[this.hasher(key)];
    const idx = list?.findIndex((x) => x.key === key);
    if (idx === undefined || idx === -1) return false;
    --this.size;
    return list!.splice(idx, 1)[0].value;
  }
}
