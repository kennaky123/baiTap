let n = -3;
if (n > 0 && n % 2 === 0) {
  console.log("n là số dương chẵn");
} else if (n < 0 && n % 2 === 0) {
  console.log("n là số âm chẵn");
} else if (n > 0 && n % 2 === 1) {
  console.log("n là số dương lẻ");
} else if (n < 0 && n % 2 === -1) {
  console.log("n là số âm lẻ");
} else {
  console.log("n = 0");
}
