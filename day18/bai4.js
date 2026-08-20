// layDiemToan() → resolve 8 → delay 1 giây

// layDiemVan() → resolve 7 → delay 2 giây

// layDiemAnh() → resolve 9 → delay 3 giây

const Toan = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(8);
  }, 1000);
});

const Van = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(7);
  }, 2000);
});

const Anh = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(9);
  }, 3000);
});

Promise.all([Toan, Van, Anh]).then((data) => {
  let Sum = (data[0] + data[1] + data[2]) / 3;
  console.log(Sum);
});
