const todos = [
  { task: "Học JavaScript", done: false },
  { task: "Làm bài tập", done: true },
  { task: "Đọc sách", done: false },
];
const undoneTodos = todos.filter((todo) => todo.done === false);
console.log(undoneTodos);
const taskNames = todos.map((todo) => todo.task);
console.log(taskNames);
function countDone(todos) {
  return todos.filter((todo) => todo.done === true).length;
}
console.log("Số công việc đã hoàn thành:", countDone(todos));
function markAsDone(todos, taskName) {
  const todo = todos.find((todo) => todo.task === taskName);
  if (todo) {
    todo.done = true;
  }
}
markAsDone(todos, "Đọc sách");
console.log(todos);
