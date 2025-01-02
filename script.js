const apiKey = "0b6866dba26b6c3adc3ca7abb039d512";
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
let recentCities = [];

document.addEventListener('DOMContentLoaded', () => {
    displayRecentCities();
});

function errori() {
    let city = document.getElementById("cityInput");
    try {
        if (!city.value) {
            city.style.border = "2px solid red";
            throw new Error("Inserire una città");
        }
        getWeather();
    } catch (error) {
        console.error("Errore catturato:", error.message);
    }
}

function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) return alert('Inserisci il nome di una città.');

    fetch(apiUrl + "?q=" + city + "&appid=" + apiKey + "&units=metric")
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            storeRecentCity(city);
        })
        .catch(err => alert('Errore nella richiesta API'));
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('temperature').textContent = "Temperature: " + data.main.temp + " °C";
    document.getElementById('humidity').textContent = "Humidity " + data.main.humidity + " %";
    document.getElementById('description').textContent = data.weather[0].description;
    let imgTemp = document.getElementById("imgContainer");
    imgTemp.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">`;
}

function storeRecentCity(city) {
    if (!recentCities.includes(city)) {
        recentCities.push(city);
    }
    displayRecentCities();
}

function displayRecentCities() {
    const cityList = document.getElementById('cityList');
    cityList.innerHTML = '';
    recentCities.forEach(city => {
        const listItem = document.createElement('li');
        listItem.style.listStyle = "none";
        listItem.textContent = city;
        listItem.onclick = () => {
            document.getElementById('cityInput').value = city;
            getWeather();
        };
        cityList.appendChild(listItem);
    });
}
