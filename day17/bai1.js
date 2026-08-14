function Product(name, price, quantity) {
  this.name = name;
  this.price = price;
  this.quantity = quantity;
}
Product.prototype.getTotal = function () {
  return this.price * this.quantity;
};
const product1 = new Product("Laptop", 20000000, 2);
const product2 = new Product("Điện thoại", 10000000, 3);
console.log(product1.getTotal());
console.log(product2.getTotal());
console.log(product1.getTotal === product2.getTotal);
