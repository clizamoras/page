const form = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");

let todos = [];

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("todos");
  if (data) {
    todos = JSON.parse(data);
  }
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.priority.toLowerCase()}`;
    li.innerHTML = `
      <div class="todo-header">
        <span>${todo.title}</span>
        <button class="delete" data-index="${index}">Delete</button>
      </div>
      <p>${todo.description}</p>
      <small>Due: ${todo.dueDate}</small>
    `;
    todoList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodo = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    dueDate: document.getElementById("dueDate").value,
    priority: document.getElementById("priority").value,
    completed: false,
  };
  todos.push(newTodo);
  saveToLocalStorage();
  renderTodos();
  form.reset();
});

todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const index = e.target.getAttribute("data-index");
    todos.splice(index, 1);
    saveToLocalStorage();
    renderTodos();
  }
});

loadFromLocalStorage();
renderTodos();
