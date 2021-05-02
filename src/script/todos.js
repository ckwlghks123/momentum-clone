const openTodo = document.querySelector('.open-todos'),
closeTodo = document.querySelector('.todo-container__close'),
todoContainer = document.querySelector('.todo-container')

function toggleTodo() {
  const toggle =  todoContainer.classList
  if (toggle.contains('hide')) {
    toggle.remove('hide');
    toggle.add('show')
    openTodo.style.right = '-20vh';
  } else {
    toggle.remove('show')
    toggle.add('hide')
    openTodo.style.right = '60px';
  }
}

// 기능
const todoForm = document.querySelector('.todo-list__submit'),
todoInput = document.querySelector('.todo-list__input'),
todoUl = document.querySelector('.todo-list__ul')
let id = 0


function paintTodo(text) {
  const todoDiv = document.createElement('div')
  const li = document.createElement('li');
  const compBtn = document.createElement('button')
  const delBtn = document.createElement('button')
  todoDiv.classList.add('todo')
  todoDiv.id = id
  li.innerText = text
  li.classList.add('todo-item')
  compBtn.innerHTML = '<i class="fas fa-check"></i>'
  compBtn.addEventListener('click',(e)=>{
    // e.
  })
  delBtn.innerHTML = '<i class="fas fa-times"></i>'
  todoDiv.appendChild(li)
  todoDiv.appendChild(compBtn)
  todoDiv.appendChild(delBtn)
  todoUl.appendChild(todoDiv)
}

function handleSubmit(e) {
  e.preventDefault()
  id++
  paintTodo(todoInput.value)
}

function init() {
  openTodo.addEventListener('click', toggleTodo)
  closeTodo.addEventListener('click', toggleTodo)
  todoForm.addEventListener('submit',handleSubmit)
}

init()