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
  }
  addButtonElement.addEventListener("click", onClickHandler);
});
