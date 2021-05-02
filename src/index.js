const input = document.querySelector("input");
const unDone = document.querySelector(".not-done");
const done = document.querySelector(".done");
const body = document.querySelector("body");
let unDoneTodos = [];
let doneTodos = [];
let id = 0;
const reUnDone = JSON.parse(localStorage.getItem("unDoneTodos"));
const reDone = JSON.parse(localStorage.getItem("doneTodos"));

function filterArr(arr, li, eq) {
  if (eq) {
    return arr.filter((todo) => todo.id === parseInt(li.id));
  } else {
    return arr.filter((todo) => todo.id !== parseInt(li.id));
  }
}

function addList(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const swBtn = document.createElement("button");
  const temTodo = {
    id: id,
    text: text,
    done: false,
  };
  li.id = id;
  span.innerHTML = text;
  delBtn.innerHTML = "삭제";
  delBtn.addEventListener("click", (e) => {
    const li = e.target.parentNode;
    if (li.parentNode === unDone) {
      unDoneTodos = filterArr(unDoneTodos, li);
      li.parentNode.removeChild(li);
      localStorage.setItem("unDoneTodos", JSON.stringify(unDoneTodos));
    } else {
      doneTodos = filterArr(doneTodos, li);
      li.parentNode.removeChild(li);
      localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
    }
  });
  swBtn.innerHTML = "변환";
  swBtn.addEventListener("click", (e) => {
    const li = e.target.parentNode;
    if (li.parentNode === unDone) {
      console.log(li);
      const task = filterArr(unDoneTodos, li, true);
      unDoneTodos = filterArr(unDoneTodos, li);
      task.forEach((todo) => (todo.done = true));
      done.appendChild(li);
      doneTodos.push(task[0]);
      localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
      localStorage.setItem("unDoneTodos", JSON.stringify(unDoneTodos));
    } else if (li.parentNode === done) {
      const task = filterArr(doneTodos, li, true);
      doneTodos = filterArr(unDoneTodos, li);
      task.forEach((todo) => (todo.done = false));
      unDone.appendChild(li);
      unDoneTodos.push(task[0]);
      localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
      localStorage.setItem("unDoneTodos", JSON.stringify(unDoneTodos));
    }
  });
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(swBtn);
  unDone.appendChild(li);
  unDoneTodos.push(temTodo);
  localStorage.setItem("unDoneTodos", JSON.stringify(unDoneTodos));
}

function onSubmit(e) {
  if (e.keyCode === 13) {
    const inputText = e.target.value;

    if (inputText) {
      id++;
      addList(inputText);
    }
    e.target.value = "";
  }
}

function init() {
  input.addEventListener("keyup", onSubmit);
}

init();
