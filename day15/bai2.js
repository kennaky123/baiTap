let value = [];
let count = [];

for (let i = 0; i < arr.length; i++) {
  let index = value.indexOf(arr[i]);
  if (index === -1) {
    value.push(arr[i]);
    count.push(1);
  } else {
    count[index]++;
  }
}

console.log(value);
console.log(count);
