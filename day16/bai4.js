const product = {
  name: "Bàn phím cơ",
  price: 890000,
  discount: 10,
  getFinalPrice: function () {
    return this.price - (this.price * this.discount) / 100;
  },
  showInfo: function () {
    console.log(
      `${this.name}: giá gốc ${this.price}, giá sau giảm ${this.getFinalPrice()}`,
    );
  },
};
product.showInfo();
product.discount = 20;
product.showInfo();
