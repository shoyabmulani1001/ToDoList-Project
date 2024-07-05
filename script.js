document.addEventListener('DOMContentLoaded', loadTasks);

document.querySelector('#task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
});

document.querySelector('#task-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        deleteTask(e.target.parentElement);
    } else if (e.target.classList.contains('edit')) {
        editTask(e.target.parentElement);
    } else if (e.target.tagName === 'LI') {
        toggleTaskCompleted(e.target);
    }
});

function addTask() {
    const taskInput = document.querySelector('#task-input');
    const task = taskInput.value.trim();

    if (task === '') {
        alert('Please enter a task');
        return;
    }

    const li = document.createElement('li');
    li.appendChild(document.createTextNode(task));
    li.innerHTML += ' <button class="edit">Edit</button><button class="delete">Delete</button>';
    document.querySelector('#task-list').appendChild(li);

    storeTaskInLocalStorage(task);

    taskInput.value = '';
}

function deleteTask(taskItem) {
    if (confirm('Are you sure you want to delete this task?')) {
        taskItem.remove();
        removeTaskFromLocalStorage(taskItem);
    }
}

function editTask(taskItem) {
    const newTask = prompt('Edit task', taskItem.firstChild.textContent);
    if (newTask !== null && newTask.trim() !== '') {
        removeTaskFromLocalStorage(taskItem);
        taskItem.firstChild.textContent = newTask;
        taskItem.innerHTML += ' <button class="edit">Edit</button><button class="delete">Delete</button>';
        storeTaskInLocalStorage(newTask);
    }
}

function toggleTaskCompleted(taskItem) {
    taskItem.classList.toggle('completed');
}

function loadTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(task));
        li.innerHTML += ' <button class="edit">Edit</button><button class="delete">Delete</button>';
        document.querySelector('#task-list').appendChild(li);
    });
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.firstChild.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}