const LS_KEY = "tasks";

window.addEventListener("load", () => {
  renderTasks();

  const addButtonElement = document.querySelector(".add-button");

  addButtonElement.addEventListener("click", onClickAddButton);
});

function onClickAddButton() {
  const oldInputElement = document.getElementById("taskInputElement");

  if (!oldInputElement) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("id", "taskInputElement");
    inputElement.placeholder = "What to do...";

    inputField.appendChild(inputElement);

    inputElement.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const inputValue = inputElement.value;

        createTask(inputValue);

        inputElement.value = "";
      }
    });
  }
}

function createControlButtons(onFinishTask, onDeleteTask) {
  const buttonContainer = document.createElement("div");

  const finishedButton = document.createElement("button");
  finishedButton.innerHTML = "✓";
  finishedButton.classList.add("finished-button");
  finishedButton.addEventListener("click", onFinishTask);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "✕";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", onDeleteTask);

  buttonContainer.appendChild(finishedButton);
  buttonContainer.appendChild(deleteButton);

  return buttonContainer;
}

// using .some was learned from https://www.tutorialrepublic.com/faq/how-to-check-if-an-array-includes-an-object-in-javascript.php
function validateInput(inputValue) {
  const allTasks = getAllTasks();
  const alreadyExists = allTasks.some((task) => task.taskName === inputValue);

  if (inputValue.length === 0) return false;
  if (alreadyExists) {
    alert("This task already exists.");
    return false;
  }

  return true;
}

// using LS-KEY as key (as a way of avoiding making mistakes) was learned from Simon Löfquist (my brother)
function getAllTasks() {
  const tasks = localStorage.getItem(LS_KEY);
  return JSON.parse(tasks);
}

function saveAllTasks(allTasks) {
  const allTasksJson = JSON.stringify(allTasks);
  localStorage.setItem(LS_KEY, allTasksJson);
}

function createTask(newTask) {
  const isValid = validateInput(newTask);

  // using !isValid to break the code if the input is inValid was learned from Simon Löfquist (my brother)
  if (!isValid) return;

  let allTasks = getAllTasks();
  const taskObj = { taskName: newTask, isComplete: false };

  if (allTasks === null) {
    allTasks = [];
  }

  allTasks.push(taskObj);
  saveAllTasks(allTasks);
  renderTasks();
}

// using filter when removing task while saving the rest to local storage was learned from https://www.w3schools.com/jsref/jsref_filter.asp
function deleteTask(taskToRemove) {
  const allTasks = getAllTasks();
  const filteredTask = allTasks.filter(
    (task) => task.taskName !== taskToRemove
  );
  saveAllTasks(filteredTask);
  renderTasks();
}

// removing rendered tasks so they do not repeat themselves
function removeRenderedTasks() {
  const oldTaskElements = document.querySelectorAll("tr");
  if (oldTaskElements.length > 0) {
    oldTaskElements.forEach((taskElement) => taskElement.remove());
  }
}

function renderTasks() {
  removeRenderedTasks();
  const allTasks = getAllTasks();

  //if no task, dont render
  if (allTasks === null || allTasks.length === 0) return;

  allTasks.forEach(renderOneTask);
}

function renderOneTask(task) {
  const taskTableRow = document.createElement("tr");
  const taskTableData = document.createElement("td");
  const taskControlButtonTableData = document.createElement("td");

  // Learned this method from Simon Löfquist (my brother :))
  taskTableData.textContent = `• ${task.taskName}`;
  // taskTableData.textContent = "• " + inputValue;

  function onDeleteTask() {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      deleteTask(task.taskName);
    }
  }

  if (task.isComplete) {
    taskTableRow.classList.add("complete-task");
  }

  const controlButtons = createControlButtons(
    () => setTaskAsComplete(task.taskName),
    onDeleteTask
  );

  taskControlButtonTableData.appendChild(controlButtons);
  taskTableRow.appendChild(taskTableData);
  taskTableRow.appendChild(taskControlButtonTableData);

  const todoListTableBody = document.getElementById("todoList");
  todoListTableBody.appendChild(taskTableRow);
}

function setTaskAsComplete(taskName) {
  const allTasks = getAllTasks();
  allTasks.forEach((task) => {
    if (task.taskName === taskName) {
      if (task.isComplete) {
        task.isComplete = false;
      } else {
        task.isComplete = true;
      }
    }
  });
  saveAllTasks(allTasks);
  renderTasks();
}

// function clearTasks() {
//   localStorage.clear(LS_KEY);
// }
