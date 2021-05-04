const displayWeather = document.querySelector('.weather');
const displayTemp = document.querySelector('.weather__temp');
const displayIcon = document.querySelector('.weather__icon');
const displayCity = document.querySelector('.weather__city');
const displayHumidity = document.querySelector('.weather__humidity');
const displayDesc = document.querySelector('.weather__desc');

const locations = 'coords';
const API_KEY = 'a4fa961997fb534248cc4d6e3cd4f58b';

// 아이콘 참고 >>>>
//erikflowers.github.io/weather-icons/?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library
//openweathermap.org/weather-conditions#Weather-Condition-Codes-2
// icon 상태코드값 참조해서 아이콘 변경

function paintWeather({ temp, city, humidity, icon, description }) {
    // console.log(temp,city,humidity,icon,description);
    displayTemp.innerHTML = `${temp.toFixed(1)} <i class="wi wi-celsius"></i>`;
    displayIcon.innerHTML = `<i class="wi wi-night-clear"></i>`;
    displayCity.innerText = city;
}

async function getWeather(lat, lng) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`
    );
    const data = await res.json();

    const { main, name, weather } = data;
    const { temp, humidity } = main;
    const { id, description } = weather[0];
    const weatherInfo = {
        city: name,
        icon: id,
        temp,
        humidity,
        description,
    };
    paintWeather(weatherInfo);
}

function getSuccess(position) {
    const { latitude, longitude } = position.coords;
    const coObj = {
        latitude,
        longitude,
    };
    localStorage.setItem(locations, JSON.stringify(coObj));
    getWeather(latitude, longitude);
}
function getError(e) {
    console.log(e.message);
}

function getCoords() {
    navigator.geolocation.getCurrentPosition(getSuccess, getError);
}

function init() {
    const localCoords = localStorage.getItem(locations);
    if (localCoords) {
        const { latitude, longitude } = JSON.parse(localCoords);
        getWeather(latitude, longitude);
    } else {
        getCoords();
    }
}

init();
