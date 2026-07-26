// Cho biến n, dùng vòng lặp for (hoặc while) để kiểm tra xem n
// có phải số nguyên tố hay không, rồi in ra "n là số nguyên tố" hoặc "n không phải số nguyên tố".

// Gợi ý:

//     Số nguyên tố là số lớn hơn 1, chỉ chia hết cho 1 và chính nó.
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
