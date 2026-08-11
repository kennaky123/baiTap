const employees = [
  { id: "E01", name: "An", department: "Sales" },
  { id: "E02", name: "Bình", department: "IT" },
  { id: "E03", name: "Chi", department: "IT" },
];
const employeeObject = employees.reduce((result, employee) => {
  result[employee.id] = employee;
  return result;
}, {});
console.log(employeeObject);
const employeeArray = Object.values(employeeObject);
console.log(employeeArray);
const departmentCount = employees.reduce((result, employee) => {
  if (result[employee.department]) {
    result[employee.department]++;
  } else {
    result[employee.department] = 1;
  }
  return result;
}, {});
console.log(departmentCount);
