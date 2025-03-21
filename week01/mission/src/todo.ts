const input = document.getElementById("todoInput") as HTMLInputElement;
const submit = document.getElementById("submit") as HTMLButtonElement;
const todoSection = document.getElementById("todo") as HTMLElement;
const doneSection = document.getElementById("done") as HTMLElement;

const addTodo = (event) => {
  event.preventDefault();
  if (!input.value.trim()) return;

  const todo = document.createElement("div");
  todo.textContent = input.value.trim();
  todo.classList.add("todo-item");
  todo.dataset.count = "0";

  todo.addEventListener("click", () => {
    if (parseInt(todo.dataset.count as string) === 0) {
      todo.dataset.count = "1";
      todoSection.removeChild(todo);
      doneSection.appendChild(todo);
    } else if (parseInt(todo.dataset.count as string) === 1) {
      doneSection.removeChild(todo);
    }
  });

  todoSection.appendChild(todo);
  input.value = "";
};

submit.addEventListener("click", addTodo);
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodo(event);
  }
});
