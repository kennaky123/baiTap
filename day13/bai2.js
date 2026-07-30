const createCounter = () => {
  let count = 0;
  return function () {
    count++;
    return count;
  };
};

const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3
console.log(counter());
