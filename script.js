const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const countValue = document.querySelector(".count-value");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fas fa-pen"></i>';
        editButton.classList.add("edit-button");
        li.appendChild(editButton);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        updateTaskCount();
        saveData();
    }
    inputBox.value = '';
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        updateTaskCount();
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        updateTaskCount();
        saveData();
    } else if (e.target.classList.contains("edit-button") || e.target.closest(".edit-button")) {
        const li = e.target.closest("li");
        editTask(li);
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    updateTaskCount();
}

function updateTaskCount() {
    const tasks = listContainer.querySelectorAll("li").length;
    const completedTasks = listContainer.querySelectorAll("li.checked").length;
    const pendingTasks = tasks - completedTasks;
    countValue.textContent = pendingTasks;
}

function editTask(li) {
    const currentText = li.firstChild.textContent;
    const newText = prompt("Edit your task:", currentText);
    if (newText) {
        li.firstChild.textContent = newText;
        saveData();
    }
}

showTask();
