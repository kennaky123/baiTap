class Employee {
  constructor(name, baseSalary) {
    this.name = name;
    this.baseSalary = baseSalary;
  }
  getSalary() {
    return this.baseSalary;
  }
}
class Manager extends Employee {
  constructor(name, baseSalary, bonus) {
    super(name, baseSalary);
    this.bonus = bonus;
  }
  getSalary() {
    return this.baseSalary + this.bonus;
  }
}
const manager = new Manager("An", 15000000, 5000000);
console.log(manager.getSalary());
