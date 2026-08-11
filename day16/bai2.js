const student = {
  name: "Minh",
  scores: [8, 7.5, 9, 6],
  getAverage: function () {
    const total = this.scores.reduce((sum, score) => {
      return sum + score;
    }, 0);
    return total / this.scores.length;
  },
  getStatus: function () {
    const average = this.getAverage();
    if (average >= 8) {
      return "Giỏi";
    } else if (average >= 6.5) {
      return "Khá";
    } else {
      return "Trung bình";
    }
  },
};
console.log(
  `${student.name} đạt loại ${student.getStatus()} với điểm trung bình ${student.getAverage()}`,
);
