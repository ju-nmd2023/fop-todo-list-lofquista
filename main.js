window.addEventListener("load", () => {
  const addButtonElement = document.querySelector(".add-button");
  const inputField = document.getElementById("inputField");

  function onClickHandler(event) {
    const inputElement = document.createElement("input");
    inputElement.placeholder = "What to do...";

    inputField.appendChild(inputElement);

    const oldInputElement = document.querySelectorAll("input");
    if (oldInputElement.length > 1) {
      oldInputElement[0].remove();
    }

    // Next six rows of code are adapted from https://www.shecodes.io/athena/77658-how-to-get-the-value-of-an-input-in-javascript and https://chat.openai.com/share/1f576f52-c533-4389-a71e-fd24e6f4030f

    const todoList = document.getElementById("todoList");

    inputElement.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const inputValue = inputElement.value;

        const taskTableRow = document.createElement("tr");
        const taskTableData = document.createElement("td");
        const taskControlButtonTableData = document.createElement("td");

        // Learned this method from my brother :)
        taskTableData.textContent = `• ${inputValue}`;
        // taskTableData.textContent = "- " + inputValue;

        const buttonContainer = document.createElement("div");

        const finishedButton = document.createElement("button");
        finishedButton.innerHTML = "✓";
        finishedButton.classList.add("finished-button");
        finishedButton.addEventListener("click", function () {
          taskTableRow.classList.add("add-task");
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "✕";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function () {
          const confirmDelete = confirm(
            "Are you sure you want to delete this task?"
          );
          if (confirmDelete) {
            taskTableRow.remove();
          }
        });

        buttonContainer.appendChild(finishedButton);
        buttonContainer.appendChild(deleteButton);

        taskControlButtonTableData.appendChild(buttonContainer);
        taskTableRow.appendChild(taskTableData);
        taskTableRow.appendChild(taskControlButtonTableData);

        todoList.appendChild(taskTableRow);

        inputElement.value = "";
      }
    });
  }

  addButtonElement.addEventListener("click", onClickHandler);
});
