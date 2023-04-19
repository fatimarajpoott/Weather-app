const API_KEY = "94f9ddaa10f481344738a3bbb0642a35";

const searchBtn = document.getElementById("searchBtn");
const inputBox = document.querySelector(".input-box");
const locationNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");
const temperature = document.querySelector(".temperature");
const weatherImg = document.querySelector(".weather-img");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

let cachedWeatherData = {};

// Event listener for search button click

searchBtn.addEventListener("click", () => {
  const location = inputBox.value.trim();

  if (location) {
    getWeatherData(location);
  }
});

// Function to get weather data from OpenWeatherMap API

function getWeatherData(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  if (cachedWeatherData[location] !== undefined) {
    console.log("Loading weather data from cache...");
    displayWeatherData(cachedWeatherData[location]);
  } else {
    console.log("Fetching weather data from API...");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === "404") {
          locationNotFound.style.display = "flex";
          weatherBody.style.display = "none";
        } else {
          displayWeatherData(data);
          cachedWeatherData[location] = data;
          localStorage.setItem("cachedWeatherData", JSON.stringify(cachedWeatherData));
        }
      })
      .catch((error) => console.log(error));
  }

}

// Function to display weather data

function displayWeatherData(data) {
  locationNotFound.style.display = "none";

  weatherBody.style.display = "flex";

  temperature.innerHTML = `${Math.round(data.main.temp)} <sup>°C</sup>`;

  weatherImg.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);

  description.innerHTML = data.weather[0].description;

  humidity.innerHTML = `${data.main.humidity}%`;

  windSpeed.innerHTML = `${data.wind.speed} Km/H`;

//   if (data.weather[0].main == "Clouds") {
//     weatherIcon.src = "clouds.png";
//   } else if (data.weather[0].main == "Clear") {
//     weatherIcon.src = "clear.png";
//   } else if (data.weather[0].main == "Rain") {
//     weatherIcon.src = "rain.png";
//   } else if (data.weather[0].main == "Drizzle") {
//     weatherIcon.src = "drizzle.png";
//   } else if (data.weather[0].main == "Mist") {
//     weatherIcon.src = "mist.png";
//   }

  
}

// Load cached weather data on page load

if (localStorage.getItem("cachedWeatherData")) {
  cachedWeatherData = JSON.parse(localStorage.getItem("cachedWeatherData"));
  console.log("Cached weather data loaded.");
}
window.onload = function() {
  getWeatherData("Lahore");
}