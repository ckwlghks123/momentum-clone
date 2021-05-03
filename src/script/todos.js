const openTodo = document.querySelector('.open-todos'),
    closeTodo = document.querySelector('.todo-container__close'),
    todoContainer = document.querySelector('.todo-container');

function toggleTodo() {
    const toggle = todoContainer.classList;
    if (toggle.contains('hide')) {
        toggle.remove('hide');
        toggle.add('show');
        openTodo.style.right = '-20vh';
    } else {
        toggle.remove('show');
        toggle.add('hide');
        openTodo.style.right = '60px';
    }
}

// 기능
const todoForm = document.querySelector('.todo-list__submit'),
    todoInput = document.querySelector('.todo-list__input'),
    todoUl = document.querySelector('.todo-list__ul');
let id = 0;
let todos = [];

const localTodo = 'todos';

function saveTodo(obj) {
    localStorage.setItem(localTodo, JSON.stringify(obj));
}
function getTodo() {
    return JSON.parse(localStorage.getItem(localTodo));
}

function paintTodo(text) {
    const todoDiv = document.createElement('div');
    const li = document.createElement('li');
    const compBtn = document.createElement('span');
    const delBtn = document.createElement('span');
    const todoObj = {
        id,
        text,
        done: false,
    };
    todoDiv.id = id;
    todoDiv.classList.add('todo');
    li.innerText = text;
    li.classList.add('todo-item');
    compBtn.innerHTML = '<i class="fas fa-check"></i>';
    compBtn.addEventListener('click', (e) => {
        const todoSelf = e.target.parentElement;
        const liText = todoSelf.childNodes[0];
        todos.map((todo) =>
            todo.id === parseInt(todoSelf.id)
                ? (todo.done = !todo.done)
                : todo.done
        );
        saveTodo(todos);
        liText.classList.toggle('done');
    });
    delBtn.innerHTML = '<i class="fas fa-times"></i>';
    delBtn.addEventListener('click', (e) => {
        const todoSelf = e.target.parentElement;
        todos = todos.filter((todo) => todo.id !== parseInt(todoSelf.id));
        todoSelf.remove();
        saveTodo(todos);
    });
    todoDiv.appendChild(li);
    todoDiv.appendChild(compBtn);
    todoDiv.appendChild(delBtn);
    todoUl.appendChild(todoDiv);
    todos.push(todoObj);
}

function handleSubmit(e) {
    e.preventDefault();
    id++;
    paintTodo(todoInput.value);
    saveTodo(todos);
    todoInput.value = '';
}

function init() {
    openTodo.addEventListener('click', toggleTodo);
    closeTodo.addEventListener('click', toggleTodo);
    todoForm.addEventListener('submit', handleSubmit);
}

init();
