// ()

//SELECTOR

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos)
//Adding
todoButton.addEventListener('click', addTodo);
//Removing
todoList.addEventListener('click', trashTodo);
//filter
filterOption.addEventListener('click', filterTodo);

//FUNCTIONS
//creating and adding
function addTodo(event) {

    //prevent form from submitting
    event.preventDefault();

    //create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create todo li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo); //inserting it into the div

    //add todo to local storage
    saveLocalTodos(todoInput.value)

    //create completed button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    //create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);

    //append to list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = '';

}


//delete todo
function trashTodo(e) {
    //grabbing the item
    const item = e.target;

    //deleting the item
    if (item.classList[0] === 'delete-btn') {
        //rather than removing the item delete-btn we delete the parent element the whole of it
        const todo = item.parentElement;
        //css animation
        todo.classList.add('fall');
        //remove local todos
        removeLocalTodos(todo);
        //wait for animation before deleting
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    //complete todo
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}


//filter Todos
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

//save to local storage
function saveLocalTodos(todo) {

    //check for todos
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//delete from local storage
function getTodos() {
    //check for todos
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function (todo) {

        //create todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create todo li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo); //inserting it into the div

        //create complete button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add('complete-btn');
        todoDiv.appendChild(completeButton);

        //create delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        //append to list
        todoList.appendChild(todoDiv);

    });
}

function removeLocalTodos(todo) {
    //check for todos
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}