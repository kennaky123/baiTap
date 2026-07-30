// viết hàm ở đây

function repeatTimes(a, b) {
  for (let i = 0; i < a; i++) {
    b(i);
  }
}

repeatTimes(5, (index) => {
  console.log(`Lần thứ ${index}`);
});
// In ra: Lần thứ 0, Lần thứ 1, ..., Lần thứ 4
