function merge(arr: any[], left: number, mid: number, right: number) {
  const $left = arr.slice(left, mid + 1);
  const $right = arr.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;

  while (i < $left.length && j < $right.length) {
    arr[k++] = $left[i] < $right[j] ? $left[i++] : $right[j++];
  }
  while (i < $left.length) {
    arr[k++] = $left[i++];
  }
  while (j < $right.length) {
    arr[k++] = $right[j++];
  }
}

function mergeSort(arr: any[], left = 0, right = arr.length - 1) {
  if (left >= right) return;
  const mid = (left + right) >>> 1;
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
}

const arr = [12, 11, -13, 5, 1, 7, 0];
mergeSort(arr);
console.log(arr.join(' '));
