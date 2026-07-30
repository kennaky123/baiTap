// viết hàm ở đây

function fetchDataMock(id, callback) {
  setTimeout(() => {
    if (id > 0) {
      callback(null, "some data");
    } else {
      callback("Invalid id", null);
    }
  }, 1000);
}

fetchDataMock(5, (error, data) => {
  if (error) return console.log("Error:", error);
  console.log("Data:", data);
});

fetchDataMock(-1, (error, data) => {
  if (error) return console.log("Error:", error); // phải in ra lỗi
});
