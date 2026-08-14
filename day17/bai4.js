const original = {
  name: "Alice",
  address: {
    city: "Hanoi",
    zip: "10000",
  },
};
const shallowCopy = { ...original };
shallowCopy.address.city = "Danang";
console.log(shallowCopy);
console.log(original);
