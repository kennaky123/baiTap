const arr = [3, 7, 2, 9, 9, 5];

let max1 = arr[0];
let max2 = 0;

for (let index in arr) {
  if (index == 0) continue;
  if (max1 < arr[index]) {
    max1 = arr[index];
  }
}
for (let index in arr) {
  if (arr[index] !== max1 && arr[index] > max2) {
    max2 = arr[index];
  }
}
console.log(max2);
