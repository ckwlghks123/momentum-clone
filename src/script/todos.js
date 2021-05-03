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
let todos = [];

const localTodo = 'todos';

function saveTodo(obj) {
    localStorage.setItem(localTodo, JSON.stringify(obj));
}
function getTodo() {
    return JSON.parse(localStorage.getItem(localTodo));
}
function getCompBtn(e) {
    const todoSelf = e.target.parentElement;
    const liText = todoSelf.childNodes[0];
    todos.map((todo) =>
        todo.id === parseInt(todoSelf.id) ? (todo.done = !todo.done) : todo.done
    );
    saveTodo(todos);
    liText.classList.toggle('done');
}
function getDelBtn(e) {
    const todoSelf = e.target.parentElement;
    todos = todos.filter((todo) => todo.id !== parseInt(todoSelf.id));
    todoSelf.remove();
    saveTodo(todos);
}
function textTodo(id, text, done) {
    const todoDiv = document.createElement('div');
    const li = document.createElement('li');
    todoDiv.id = id;
    todoDiv.classList.add('todo');
    li.innerText = text;
    li.classList.add('todo-item');
    if (done) {
        li.classList.add('done');
    }
    todoDiv.appendChild(li);
    return todoDiv;
}
function btnTodo(id, text, done) {
    const frontDiv = textTodo(id, text, done);
    const compBtn = document.createElement('span');
    const delBtn = document.createElement('span');

    compBtn.innerHTML = '<i class="fas fa-check"></i>';
    compBtn.addEventListener('click', getCompBtn);
    delBtn.innerHTML = '<i class="fas fa-times"></i>';
    delBtn.addEventListener('click', getDelBtn);

    frontDiv.appendChild(compBtn);
    frontDiv.appendChild(delBtn);
    todoUl.appendChild(frontDiv);
}
function objTodo(id, text) {
    const todoObj = {
        id,
        text,
        done: false,
    };
    todos.push(todoObj);
}
function handleSubmit(e) {
    e.preventDefault();
    const id = Date.now();
    const text = todoInput.value;
    objTodo(id, text);
    btnTodo(id, text, false);
    saveTodo(todos);
    todoInput.value = '';
}

function init() {
    openTodo.addEventListener('click', toggleTodo);
    closeTodo.addEventListener('click', toggleTodo);
    todoForm.addEventListener('submit', handleSubmit);
    const getTodos = getTodo() || [];
    if (getTodos) {
        getTodos.forEach((todo) => {
            btnTodo(todo.id, todo.text, todo.done);
        });
        todos = getTodos;
        saveTodo(todos);
    }
}

init();
