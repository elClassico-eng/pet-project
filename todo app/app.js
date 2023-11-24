"use strict";

const input = document.querySelector("#input");
const btn = document.querySelector(".btn-input");
const listContainer = document.querySelector(".list-container");
const recycleBin = document.querySelector(".recycle-container");
const recycleBtn = document.querySelector(".recycle-img");
const recycledTasksList = document.querySelector(".recycled-tasks");

function saveData() {
    const tasks = Array.from(listContainer.querySelectorAll(".task__item")).map(
        (task) => task.textContent
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(task) {
    task.addEventListener("click", function () {
        const parentElement = this.parentElement; //task__item
        setTimeout(() => {
            recycledTasksList.insertAdjacentHTML(
                "afterbegin",
                `
				<li class="task__item__container">
					<span class="task__item">${this.textContent}</span>
				</li>
			`
            );
            parentElement.remove();
            saveData();
        }, 3000);
    });
}

function restoreTask(taskText) {
    const taskItemContainer = document.createElement("li");
    taskItemContainer.classList.add("task__item__container");

    taskItemContainer.innerHTML = `
        <span class="task__item">${taskText}</span>
    `;

    listContainer.insertAdjacentElement("afterbegin", taskItemContainer);
}

recycledTasksList.addEventListener("click", (e) => {
    const taskItem = e.target.closest(".task__item");

    if (taskItem) {
        restoreTask(taskItem.textContent);
        taskItem.parentElement.remove();
        saveData();
    }
});

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
