const btnAdd = document.getElementById("todoAdd");

const todoInput = document.getElementById("todoInput");

const todoItems = document.getElementById("todoItems");

const btnSave = document.getElementById("todoSave");

const indexSave = document.getElementById("saveIndex");

function addTodo() {
  const newInput = document.getElementById("todoInput").value;
  const newItem = document.createElement("span");
  newItem.innerHTML = newInput;
  const removeIcon = document.createElement("button");
  removeIcon.innerHTML = "Remove";

  if (newInput === "") {
    alert("Please add a todo to continue..");
  } else {
    let todos = localStorage.getItem("item");
    todos = todos ? JSON.parse(todos) : [];
    todos.push(newInput);
    localStorage.setItem("item", JSON.stringify(todos));
    showTodos();
  }
  document.getElementById("todoInput").value = "";
}

function showTodos() {
  let todos = localStorage.getItem("item");
  todos = todos ? JSON.parse(todos) : [];

  document.getElementById("todoItems").innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    const newLi = document.createElement("li");

    let todoItem = todos[i];
    const todoSpan = document.createElement("span");
    todoSpan.innerHTML = `${todoItem}`;
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    newLi.appendChild(todoSpan);
    newLi.appendChild(removeBtn);
    document.getElementById("todoItems").appendChild(newLi);
    removeBtn.addEventListener("click", function () {
      removeTodo(i);
    });

    todoSpan.addEventListener("click", function () {
      todoInput.value = todoSpan.innerText;
      indexSave.value = i;
      btnAdd.style.display = "none";
      btnSave.style.display = "block";
    });
  }
}

showTodos();

function removeTodo(index) {
  let todos = JSON.parse(localStorage.getItem("item"));
  todos.splice(index, 1);
  localStorage.setItem("item", JSON.stringify(todos));
  showTodos();
}

function saveTodo() {
  const newInput = document.getElementById("todoInput").value;

  if (newInput === "") {
    alert("Failed to edit");
  } else {
    let todos = JSON.parse(localStorage.getItem("item"));
    todos[indexSave.value] = todoInput.value;
    localStorage.setItem("item", JSON.stringify(todos));
    todoInput.value = "";
    btnSave.style.display = "none";
    btnAdd.style.display = "block";
    showTodos();
  }
}

// function showUl() {
//   const todoList = document.getElementById("todoList");
//   !todoList.innerText
//     ? (todoList.style.display = "none")
//     : (todoList.style.display = "block");
// }

// showUl();
