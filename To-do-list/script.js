let tasks = [];

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadData() {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();
  let list = document.getElementById("list");
}

//biar bisa pake ENTER
document.getElementById("inputTask").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

document.getElementById("list").addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    let li = e.target.parentElement;
    let index = Array.from(li.parentElement.children).indexOf(li);

    tasks.splice(index, 1);

    renderTasks();
    saveData();
  } else if (e.target.tagName === "LI") {
    let li = e.target;
    let index = Array.from(li.parentElement.children).indexOf(li);

    tasks[index].done = !tasks[index].done;

    renderTasks();
    saveData();
  }
});

function renderTasks() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = createTaskElement(task.text);

    if (task.done) {
      li.classList.add("checked");
    }
    list.appendChild(li);
  });
}

function createTaskElement(taskText) {
  let li = document.createElement("li");
  li.textContent = taskText;

  let btn = document.createElement("button");
  btn.textContent = "X";

  li.appendChild(btn);

  return li;
}

//Edit Task
document.getElementById("list").addEventListener("dblclick", function (e) {
  if (e.target.tagName === "LI") {
    let li = e.target;
    let currentText = li.firstChild.textContent;
    let input = document.createElement("input");
    input.type = "text";
    input.value = currentText;

    li.innerHTML = "";
    li.appendChild(input);

    input.focus();

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        li.textContent = input.value;

        let btn = document.createElement("button");
        btn.textContent = "X";
        li.appendChild(btn);

        saveData();
      }
    });
  }
});

// Add Task!
function addTask() {
  let input = document.getElementById("inputTask");
  let task = input.value;

  if (task === "") return;

  tasks.push({
    text: task,
    done: false,
  });

  renderTasks();
  saveData();

  input.value = "";

  saveData();
}

document.addEventListener("DOMContentLoaded", loadData);
