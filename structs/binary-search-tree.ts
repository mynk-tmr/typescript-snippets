export class Item<T> {
  value: T;
  left: Item<T> | null = null;
  right: Item<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

export class BinarySearchTree<T extends number> {
  root = null as null | Item<T>;

  add(value: T) {
    const node = new Item<T>(value);
    if (!this.root) this.root = node;
    else
      (function travel(root) {
        const side = node.value < root.value ? 'left' : 'right';
        if (!root[side]) root[side] = node;
        else travel(root[side]);
      })(this.root);
    return node;
  }

  search(value: T) {
    return (function travel(root) {
      if (!root) return false;
      if (root.value === value) return root;
      const side = value < root.value ? 'left' : 'right';
      return travel(root[side]);
    })(this.root);
  }

  depth(value: T) {
    return (function travel(root, dist) {
      if (!root) return -1;
      if (root.value === value) return 1 + dist;
      const side = value < root.value ? 'left' : 'right';
      return travel(root[side], 1 + dist);
    })(this.root, -1);
  }

  height(node: Item<T> | null): number {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  dfs(type: 'PRE' | 'IN' | 'POS', callback: (x: T) => unknown) {
    (function travel(root) {
      if (!root) return;
      if (type === 'PRE') callback(root.value);
      travel(root.left);
      if (type === 'IN') callback(root.value);
      travel(root.right);
      if (type === 'POS') callback(root.value);
    })(this.root);
  }

  bfs(callback: Function) {
    if (!this.root) return;
    const queue = [this.root];
    while (queue.length) {
      const curr = queue.shift()!;
      callback(curr.value);
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }
  }

  remove(value: T) { //replace node with its predecessor in INORDER
    const max = (node: Item<T>): T =>
      node.right ? max(node.right) : node.value;

    this.root = (function inner(root, value): null | Item<T> {
      if (!root) return null;
      if (value < root.value) root.left = inner(root.left, value);
      if (value > root.value) root.right = inner(root.right, value);
      else {
        if (!root.left && !root.right) return null;
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        root.value = max(root.left);
        root.left = inner(root.left, root.value); //delete the max value
      }
      return root;
    })(this.root, value);
  }
}