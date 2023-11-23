"use strict";

const input = document.querySelector("#input");
const btn = document.querySelector(".btn-input");
const listContainer = document.querySelector(".list-container");

function saveData() {
    const tasks = Array.from(listContainer.querySelectorAll(".task__item")).map(
        (task) => task.textContent
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(task) {
    task.addEventListener("click", function () {
        setTimeout(() => {
            this.parentElement.remove();
            saveData();
        }, 3000);
    });
}

listContainer.addEventListener("click", (e) => {
    const taskItem = e.target.closest(".task__item");
    if (!taskItem) return;
    else {
        taskItem.classList.toggle("checked");
    }
});

btn.addEventListener("click", (e) => {
    e.preventDefault();
    const inputValue = input.value;

    if (!inputValue) return;

    const taskItemContainer = document.createElement("li");
    taskItemContainer.classList.add("task__item__container");

    taskItemContainer.innerHTML = `
        <span class="task__item">${inputValue}</span>
    `;

    listContainer.insertAdjacentElement("afterbegin", taskItemContainer);
    deleteTask(taskItemContainer.querySelector(".task__item"));
    input.value = "";
    saveData();
});
