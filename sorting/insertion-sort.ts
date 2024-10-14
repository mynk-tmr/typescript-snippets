function insertionsort(arr: any[]) {
  for (let i = 1, j = 1; i < arr.length; i++, j = i) {
    const pick = arr[i];
    while (pick < arr[--j] && j >= 0) arr[j + 1] = arr[j];
    arr[j + 1] = pick;
  }
}

const arr = [12, 11, -13, 5, 1, 7, 0];
insertionsort(arr);
console.log(arr.join(' '));