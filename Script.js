document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const task = taskInput.value.trim();
        const listItem = document.createElement('li');
        listItem.className = 'task-list-item';
        listItem.innerHTML = `
            <span>${task}</span>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(listItem);

        saveTask(task);
        taskInput.value = '';
    }
}

function deleteTask(button) {
    const listItem = button.parentNode;
    const taskList = listItem.parentNode;
    taskList.removeChild(listItem);

    const task = listItem.firstChild.textContent;
    removeTask(task);
}

function saveTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(task) {
    let tasks = getTasks();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    let tasks = getTasks();

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = 'task-list-item';
        listItem.innerHTML = `
            <span>${task}</span>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(listItem);
    });
}

function getTasks() {
    const tasksString = localStorage.getItem('tasks');
    return tasksString ? JSON.parse(tasksString) : [];
}
