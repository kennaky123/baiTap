
let n = 14;
let isPrime = true;
for (i = 4; i < n; i++) {
  if (n % i === 0) {
    isPrime = false;
  }
}
if (n === 1) {
  isPrime = false;
}
if (isPrime) {
  console.log("n la so nguyen to");
} else {
  console.log("n khong phai la so nguyen to");
}
