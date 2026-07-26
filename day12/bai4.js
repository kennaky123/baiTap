// Bài 4: FizzBuzz

// Dùng vòng lặp for in ra các số từ 1 đến 50, với quy tắc:

//     Nếu số chia hết cho cả 3 và 5 → in "FizzBuzz"

//     Nếu số chỉ chia hết cho 3 → in "Fizz"

//     Nếu số chỉ chia hết cho 5 → in "Buzz"

//     Ngược lại → in ra chính số đó

for (let i = 1; i <= 50; i++) {
  if (i % 5 === 0 && i % 3 === 0) {
    console.log("in FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}
