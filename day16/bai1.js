const cart = [
  { name: "Áo thun", price: 150000, quantity: 2 },
  { name: "Quần jean", price: 350000, quantity: 1 },
  { name: "Giày", price: 500000, quantity: 1 },
];

const total = cart.reduce((sum, product) => {
  return sum + product.price * product.quantity;
}, 0);
console.log("Tổng tiền:", total);
const maxProduct = cart.reduce((max, product) => {
  const productValue = product.price * product.quantity;
  const maxValue = max.price * max.quantity;
  return productValue > maxValue ? product : max;
});
console.log("Sản phẩm có giá trị cao nhất:", maxProduct);
const products = cart.filter((product) => product.quantity > 1);
console.log("Sản phẩm có số lượng > 1:", products);
