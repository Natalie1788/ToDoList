import { v4 as uuidv4 } from 'uuid';

interface Task {
    id: string;
    content: string;
    completed: boolean;
}

let tasks: Task[] = [];

// check if there is some todos in local storage efter page loading
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
    tasks = JSON.parse(storedTasks);
}

const taskInput = document.getElementById('todo-input') as HTMLInputElement;
const addTaskBtn = document.getElementById('add-btn') as HTMLButtonElement;
const taskList = document.getElementById('todo-list') as HTMLUListElement;
const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.classList.add("list-item");

        // Checkbox creating
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
        li.appendChild(checkbox);

        // Add task text
        const taskText = document.createElement('span');
        taskText.textContent = task.content;
        taskText.className = task.completed ? 'completed' : '';
        taskText.contentEditable = 'true';
        taskText.addEventListener('input', () => {
            task.content = taskText.textContent || '';
            updateLocalStorage();
        });

        if (task.completed) {
            taskText.classList.add('completed');
        }

        // cross out completed todos
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                taskText.classList.add('completed');
            } else {
                taskText.classList.remove('completed');
            }
            updateLocalStorage();
        });

        li.appendChild(taskText);

        // create importance button
        const importanceBtn = document.createElement('button');
        importanceBtn.classList.add("more-btn-container");
        importanceBtn.textContent = '!';
        importanceBtn.addEventListener('click', () => {
            const currentIndex = tasks.indexOf(task);
            tasks.splice(currentIndex, 1); // Remove the task from its current position
            tasks.unshift(task); // Add the task to the beginning of the array
            renderTasks(); // Render tasks again to reflect changes
            updateLocalStorage();
        });
        li.appendChild(importanceBtn);


        // Delete task button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = 'x';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function addTask(content: string) {
    const newTask: Task = {
        id: uuidv4(),
        content: content,
        completed: false
    };
    tasks.push(newTask);
    renderTasks();
    updateLocalStorage();
    console.log(uuidv4());
}

function toggleTaskCompletion(id: string) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
    updateLocalStorage();
}

function deleteTask(id: string) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    updateLocalStorage();
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', () => {
    const content = taskInput.value.trim();
    if (content !== '') {
        addTask(content);
        taskInput.value = '';
    }
});

clearBtn.addEventListener('click', () => {
    tasks = [];
    renderTasks();
    updateLocalStorage();
});

renderTasks();
