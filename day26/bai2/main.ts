// ==========================================
// Bài 2 — TypeScript OOP: Tính lương nhân viên
// ==========================================

// 1. Interface Payable
interface Payable {
  calculateSalary(): number;
}

// 2. Abstract class Employee implements Payable
abstract class Employee implements Payable {
  protected id: number;
  protected name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  // Phương thức trừu tượng
  public abstract calculateSalary(): number;

  // Phương thức thường: gọi this.calculateSalary() (tính đa hình polymorphism)
  public getInfo(): string {
    const formattedSalary: string = this.calculateSalary().toLocaleString("en-US");
    return `#${this.id} ${this.name} - Lương: ${formattedSalary} VNĐ`;
  }
}

// 3. Class con FullTimeEmployee
class FullTimeEmployee extends Employee {
  public baseSalary: number;

  constructor(id: number, name: string, baseSalary: number) {
    super(id, name);
    this.baseSalary = baseSalary;
  }

  public override calculateSalary(): number {
    return this.baseSalary;
  }
}

// 4. Class con PartTimeEmployee
class PartTimeEmployee extends Employee {
  public hoursWorked: number;
  public hourlyRate: number;

  constructor(id: number, name: string, hoursWorked: number, hourlyRate: number) {
    super(id, name);
    this.hoursWorked = hoursWorked;
    this.hourlyRate = hourlyRate;
  }

  public override calculateSalary(): number {
    return this.hoursWorked * this.hourlyRate;
  }
}

// 5. Kiểm thử chương trình trong main.ts
const employees: Employee[] = [
  new FullTimeEmployee(1, "Nguyễn Văn An", 15000000),
  new FullTimeEmployee(2, "Trần Thị Bình", 12000000),
  new PartTimeEmployee(3, "Lê Văn Cường", 80, 50000), // 80 * 50,000 = 4,000,000
  new PartTimeEmployee(4, "Phạm Thu Dung", 60, 50000), // 60 * 50,000 = 3,000,000
];

// Dùng vòng lặp in getInfo() của từng người
employees.forEach((employee: Employee): void => {
  console.log(employee.getInfo());
});

// Tính và in tổng quỹ lương bằng reduce
const totalPayroll: number = employees.reduce(
  (sum: number, employee: Employee): number => sum + employee.calculateSalary(),
  0
);

console.log(`Tổng quỹ lương: ${totalPayroll.toLocaleString("en-US")} VNĐ`);
