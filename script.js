const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Set the icon based on weather condition
    const weatherMain = data.weather[0].main;
    if (weatherMain === "Clouds") {
      weatherIcon.src = "img/clouds.jpg";
    } else if (weatherMain === "Clear") {
      weatherIcon.src = "img/clear.jpg";
    } else if (weatherMain === "Rain") {
      weatherIcon.src = "img/rain.jpg";
    } else if (weatherMain === "Drizzle") {
      weatherIcon.src = "img/drizzle.jpg";
    } else if (weatherMain === "Mist") {
      weatherIcon.src = "img/mist.jpg";
    } else {
      weatherIcon.src = "img/default.jpg"; // fallback image
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (error) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  } else {
    alert("Please enter a city or village name.");
  }
});