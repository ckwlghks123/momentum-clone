// 사용자 입력
const nameForm = document.querySelector('.greeting__form'),
nameInput = document.querySelector('.greeting__name'),
greeting = document.querySelector('.greeting')
 // 시계
const clock = document.querySelector('.main-clock'),
seconds = document.querySelector('.main-clock__seconds'),
days = document.querySelector('.main-clock__day'),
displayTime = document.querySelector('.time-wrapper'),
clockMessage = document.querySelector('.main-clock__greeting'),
user = 'user'

const displayLeft = document.querySelector('.weather')
const displayRight = document.querySelector('.open-todos')

function saveItem (itemname,item) {
  localStorage.setItem(itemname,item);
}
function getItem (itemname) {
  const item = localStorage.getItem(itemname)
  if (item) {
    if (typeof(item) === 'string'){
      return item
    } else {
      return JSON.parse(item)
    }
  }
}
function paintClocks () {
  greeting.style.display = 'none'
  displayLeft.style.display = 'flex'
  displayTime.style.display = 'flex'
  displayRight.style.display = 'block'
  clockMessage.innerHTML = `Welcome!! How's your day? ${getItem(user)}`
}

function handleInput (e) {
  e.preventDefault()
  saveItem(user,nameInput.value)
  paintClocks()
}



function getTime() {
  const time = new Date()
  const hour = time.getHours()
  const min = time.getMinutes()
  const sec = time.getSeconds()
  const day = time.getDay()
  const dayArr = ['일','월','화','수','목','금','토']

  clock.innerText = `${hour}:${min < 10 ? '0'+min : min}`
  seconds.innerText = `${sec < 10 ? '0'+sec : sec}`
  days.innerText = `${'['+dayArr[day]+']'}`
}

function init () {
  nameForm.addEventListener('submit',handleInput)
  if (getItem(user)) {
    paintClocks()
  }
  getTime()
  setInterval(getTime,500)
}

init()