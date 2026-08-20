const Toan = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(8);
  }, 1000);
});

const Van = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(7);
  }, 2000);
});

const Anh = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(9);
  }, 3000);
});

// Promise.all([Toan, Van, Anh])
//   .then((data) => {
//     let Sum = (data[0] + data[1] + data[2]) / 3;
//     console.log(Sum);
//   })
//   .catch((data) => {
//     console.log(data);
//   });
// khi bị reject thì nó sẽ trả về dữ liệu ở promise bị reject thôi, chứ ko trả về mảng như lúc tất cả resolve nữa.

Promise.allSettled([Toan, Van, Anh]).then((data) => {
  console.log(data);
  let Sum = (data[0].value + data[1].reason + data[2].value) / 3;
  console.log(Sum);
});
// khi dùng allSettled thì nó trả về object và trong object có 3 key là status(fulfilled, rejected), value(dữ liệu được trả về khi resolve) và reason(dữ liệu được trả về khi reject)
