
const form = document.querySelector("#add-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const filters = document.querySelector("#filters");
const emptyState = document.querySelector("#empty-state");
const itemsLeft = document.querySelector("#items-left");
const clearCompletedBtn = document.querySelector("#clear-completed");
const todayDate = document.querySelector("#today-date");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => todo.completed === false);
  }

  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed === true);
  }

  return todos;
}

function renderToday() {
  const today = new Date();

  const dateString = today.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  todayDate.textContent =
    dateString.charAt(0).toUpperCase() + dateString.slice(1);
}

function render() {
  todoList.innerHTML = "";

  const filteredTodos = getFilteredTodos();

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");

    li.classList.add("todo-item");
    li.dataset.id = todo.id;

    if (todo.completed) {
      li.classList.add("is-completed");
    }

    const checkBtn = document.createElement("button");
    checkBtn.classList.add("todo-item__check");
    checkBtn.setAttribute("aria-label", "Đánh dấu hoàn thành");

    const text = document.createElement("span");
    text.classList.add("todo-item__text");
    text.textContent = todo.text;

    const editBtn = document.createElement("button");
    editBtn.classList.add("todo-item__edit");
    editBtn.setAttribute("aria-label", "Sửa");
    editBtn.textContent = "✎";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todo-item__delete");
    deleteBtn.setAttribute("aria-label", "Xoá");
    deleteBtn.textContent = "✕";

    li.append(checkBtn, text, editBtn, deleteBtn);

    todoList.appendChild(li);
  });

  if (filteredTodos.length === 0) {
    emptyState.classList.add("is-visible");
  } else {
    emptyState.classList.remove("is-visible");
  }

  const activeCount = todos.filter(
    (todo) => todo.completed === false,
  ).length;

  itemsLeft.textContent = `${activeCount} việc còn lại`;

  saveTodos();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = todoInput.value.trim();

  if (text === "") {
    return;
  }

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(newTodo);

  todoInput.value = "";
  todoInput.focus();

  render();
});

todoList.addEventListener("click", (e) => {
  const todoItem = e.target.closest(".todo-item");

  if (!todoItem) {
    return;
  }

  const id = Number(todoItem.dataset.id);

  if (e.target.classList.contains("todo-item__check")) {
    const todo = todos.find((todo) => todo.id === id);

    if (todo) {
      todo.completed = !todo.completed;
    }

    render();
  }

  if (e.target.classList.contains("todo-item__delete")) {
    todos = todos.filter((todo) => todo.id !== id);

    render();
  }

  if (e.target.classList.contains("todo-item__edit")) {
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return;
    }

    const newText = prompt("Nhập nội dung mới:", todo.text);

    if (newText === null) {
      return;
    }

    const trimmedText = newText.trim();

    if (trimmedText === "") {
      return;
    }

    todo.text = trimmedText;

    render();
  }
});

filters.addEventListener("click", (e) => {
  if (!e.target.classList.contains("filters__btn")) {
    return;
  }

  currentFilter = e.target.dataset.filter;

  const filterButtons = document.querySelectorAll(".filters__btn");

  filterButtons.forEach((button) => {
    button.classList.remove("is-active");
  });

  e.target.classList.add("is-active");

  render();
});

clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter((todo) => todo.completed === false);

  render();
});

renderToday();
render();
