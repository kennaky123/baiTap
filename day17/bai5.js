const user = {
  id: 1,
  name: "Bình",
  contact: {
    email: "binh@example.com",
    phone: "0909123456",
  },
  hobbies: ["reading", "coding", "gaming"],
};
const {
  name,
  contact: { email, phone },
} = user;
const { age = 18 } = user;
const [hobby1, hobby2, ...restHobbies] = user.hobbies;
console.log(name);
console.log(email);
console.log(phone);
console.log(age);
console.log(hobby1);
console.log(hobby2);
console.log(restHobbies);
