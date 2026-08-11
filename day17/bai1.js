function Calc(value) {
  this.value = value;
}
Calc.prototype.add = function (number) {
  this.value += number;
  return this;
};
Calc.prototype.minus = function (number) {
  this.value -= number;
  return this;
};
Calc.prototype.mul = function (number) {
  this.value *= number;
  return this;
};
Calc.prototype.div = function (number) {
  this.value /= number;
  return this;
};
Calc.prototype.get = function () {
  return this.value;
};
Calc.start = function (value) {
  return new Calc(value);
};
const result = new Calc(10).add(15).minus(3).mul(3).div(3).get();
console.log(result);
