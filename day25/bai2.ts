// ==========================================
// Bài 2: Quản lý danh sách học viên
// ==========================================

// 1. Tạo interface Student gồm các thông tin: Họ tên, Tuổi, Điểm trung bình, Số điện thoại (optional)
interface Student {
  name: string;
  age: number;
  gpa: number;
  phone?: string;
}

// 2. Tạo một mảng chứa ít nhất 5 học viên, có ít nhất 1 học viên không có số điện thoại
const students: Student[] = [
  {
    name: "Trần Thị Bình",
    age: 20,
    gpa: 8.5,
    phone: "0901234567",
  },
  {
    name: "Lê Văn Cường",
    age: 21,
    gpa: 4.5,
  },
  {
    name: "Nguyễn Văn Dũng",
    age: 20,
    gpa: 7.0,
    phone: "0912345678",
  },
  {
    name: "Phạm Thị Hoa",
    age: 22,
    gpa: 6.5,
    phone: "0987654321",
  },
  {
    name: "Hoàng Văn Nam",
    age: 19,
    gpa: 5.0,
  },
];

/**
 * Hàm in thông tin một học viên.
 * Nếu không có số điện thoại thì in "Chưa cập nhật".
 */
function printStudent(student: Student): void {
  const phoneDisplay: string = student.phone ?? "Chưa cập nhật";
  console.log(
    `Họ tên: ${student.name} | Tuổi: ${student.age} | Điểm: ${student.gpa} | SĐT: ${phoneDisplay}`
  );
}

/**
 * Hàm tìm và trả về học viên có điểm trung bình cao nhất.
 */
function getTopStudent(studentsList: Student[]): Student | undefined {
  if (studentsList.length === 0) {
    return undefined;
  }

  let topStudent: Student = studentsList[0]!;

  for (let i: number = 1; i < studentsList.length; i++) {
    const currentStudent: Student = studentsList[i]!;
    if (currentStudent.gpa > topStudent.gpa) {
      topStudent = currentStudent;
    }
  }

  return topStudent;
}

/**
 * Hàm lấy danh sách các học viên có điểm từ 5 trở lên.
 */
function getPassedStudents(studentsList: Student[]): Student[] {
  return studentsList.filter((student: Student): boolean => student.gpa >= 5);
}

/**
 * Hàm đếm số lượng học viên theo một độ tuổi cụ thể.
 */
function countByAge(studentsList: Student[], targetAge: number): number {
  return studentsList.filter(
    (student: Student): boolean => student.age === targetAge
  ).length;
}

// 3. Thực thi và in kết quả ra màn hình
students.forEach((student: Student): void => {
  printStudent(student);
});

const topStudent: Student | undefined = getTopStudent(students);
if (topStudent) {
  console.log(`Học viên điểm cao nhất: ${topStudent.name} (${topStudent.gpa})`);
}

const passedStudents: Student[] = getPassedStudents(students);
console.log(`Số học viên đạt: ${passedStudents.length}`);

const targetAge: number = 20;
const countAge20: number = countByAge(students, targetAge);
console.log(`Số học viên ${targetAge} tuổi: ${countAge20}`);

