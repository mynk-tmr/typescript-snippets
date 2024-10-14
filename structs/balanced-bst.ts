import { BinarySearchTree } from "./binary-search-tree";
import { Item } from "./binary-search-tree";

export class BalancedTree<T extends number> extends BinarySearchTree<T> {
  private getRoot(sorted_list: T[]) {
    if (sorted_list.length === 0) return null;
    const mid = Math.floor(sorted_list.length / 2);
    const root = new Item<T>(sorted_list.at(mid)!)
    root.left = this.getRoot(sorted_list.slice(0, mid))
    root.right = this.getRoot(sorted_list.slice(mid + 1, sorted_list.length))
    return root;
  }
  build(list: T[]) {
    const uniq = Array.from(new Set(list)).sort()
    this.root = this.getRoot(uniq)
  }
  rebalance() {
    const arr = [] as T[];
    this.dfs('IN', (x) => arr.push(x))
    this.build(arr)
  }
  isBalanced(root = this.root): boolean {
    if (!root) return true;
    const { left, right } = root;
    const diffHt = Math.abs(this.height(left) - this.height(right));
    const bothBal = this.isBalanced(left) && this.isBalanced(right);
    return diffHt < 2 && bothBal;
  }
}