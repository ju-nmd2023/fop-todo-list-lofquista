window.addEventListener("load", (event) => {
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

    // Code adapted from https://www.shecodes.io/athena/77658-how-to-get-the-value-of-an-input-in-javascript and https://chat.openai.com/share/1f576f52-c533-4389-a71e-fd24e6f4030f

    const todoList = document.getElementById("todoList");

    inputElement.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const inputValue = inputElement.value;

        const addTask = document.createElement("li");
        addTask.textContent = inputValue;

        todoList.appendChild(addTask);

        inputElement.value = "";
      }
    });
  }
  addButtonElement.addEventListener("click", onClickHandler);
});
