const checkAge = (age) => {
  return new Promise((resolve, reject) => {
    if (age >= 18) {
      resolve("Đủ tuổi");
    } else {
      reject("Chưa đủ tuổi");
    }
  });
};

checkAge(18)
  .then((data) => {
    console.log(data);
  })
  .catch((data) => {
    console.log(data);
  });
