document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskTime = document.getElementById("taskTime");
    const priority = document.getElementById("priority");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") return;

    let task = {
        id: Date.now(),
        text: taskInput.value,
        time: taskTime.value,
        priority: priority.value,
        completed: false
    };

    saveTask(task);
    renderTask(task);
    taskInput.value = "";
    taskTime.value = "";
    updateProgress();
}

function renderTask(task) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.classList.add("task", task.priority.toLowerCase());
    li.dataset.id = task.id;

    li.innerHTML = `
        <span>${task.text} (${task.priority})</span>
        <small>${task.time ? "⏰ " + task.time : ""}</small>
        <button class="complete" onclick="completeTask(${task.id})">✔</button>
        <button class="delete" onclick="deleteTask(${task.id})">❌</button>
    `;

    taskList.appendChild(li);
}

function completeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        if (task.id === id) task.completed = !task.completed;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.querySelector(`[data-id='${id}']`).classList.toggle("completed");
    updateProgress();
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.querySelector(`[data-id='${id}']`).remove();
    updateProgress();
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(renderTask);
    updateProgress();
}

function updateProgress() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = tasks.filter(task => task.completed).length;
    let progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
    document.getElementById("progress").style.width = progress + "%";
    document.getElementById("progress-text").textContent = Math.round(progress) + "%";
}
