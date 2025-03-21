var input = document.getElementById("todoInput");
var submit = document.getElementById("submit");
var todoSection = document.getElementById("todo");
var doneSection = document.getElementById("done");
var addTodo = function (event) {
    event.preventDefault();
    if (!input.value.trim())
        return;
    var todo = document.createElement("div");
    todo.textContent = input.value.trim();
    todo.classList.add("todo-item");
    todo.dataset.count = "0";
    todo.addEventListener("click", function () {
        if (parseInt(todo.dataset.count) === 0) {
            todo.dataset.count = "1";
            todoSection.removeChild(todo);
            doneSection.appendChild(todo);
        }
        else if (parseInt(todo.dataset.count) === 1) {
            doneSection.removeChild(todo);
        }
    });
    todoSection.appendChild(todo);
    input.value = "";
};
submit.addEventListener("click", addTodo);
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTodo(event);
    }
});
