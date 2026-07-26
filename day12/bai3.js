
let score = 5;

if (!score) {
  console.log("chua co diem");
} else if (score >= 9 && score <= 10) {
  console.log("xuat sac");
} else if (score >= 7 && score < 9) {
  console.log("gioi");
} else if (score >= 5 && score < 7) {
  console.log("trung binh");
} else if (score > 0 && score < 5) {
  console.log("yeu");
} else if (score > 10 || score < 0) {
  console.log("diem khong hop le");
}
