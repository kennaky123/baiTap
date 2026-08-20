const getUser = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = [
        {
          id: 1,
          name: "User 1",
          salary: 10000,
        },
        {
          id: 2,
          name: "User 2",
          salary: 1000,
        },
        {
          id: 3,
          name: "User 3",
          salary: 3000,
        },
      ];
      resolve(users.find((user) => user.id === userId));
    }, Math.random() * 2000);
  });
};
const ids = [1, 2, 3];
const calculateTotalSalary = async () => {
  let totalSalary = 0;
  for (const id of ids) {
    const user = await getUser(id);
    totalSalary += user.salary;
  }
  console.log("salary:", totalSalary);
};
calculateTotalSalary();
