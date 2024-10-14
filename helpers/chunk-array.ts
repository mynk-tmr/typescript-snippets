export function chunk<t>(arr: t[], size: number) {
  let chunks_left = Math.ceil(arr.length / size);
  let res = [],
    chunk = [],
    i = 0;
  while (chunks_left > 0) {
    chunk.push(arr[i++]);
    if (i === arr.length || chunk.length === size) {
      res.push([...chunk]);
      chunk = [];
      --chunks_left;
    }
  }
  return res;
}
