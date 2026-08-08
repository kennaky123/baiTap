const arr = [1, 2, 2, 3, 4, 1, 5, 6, 7];
let count = 1;
let max = 1;

for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
        count++;
        if (count > max) {
            max = count;
        }
    } else {
        count = 1;
    }
}
console.log(max);