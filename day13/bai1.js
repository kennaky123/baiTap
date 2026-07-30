function add(a, b) {
  return a + b;
}
function multiply(a, b) {
  return a * b;
}

function calculate(a, b, c) {
  if (typeof c === "function") {
    if (c === add) {
      return c(a, b);
    }
    if (c === multiply) {
      return c(a, b);
    }
  }
}

calculate(3, 4, add);
calculate(3, 4, multiply);
