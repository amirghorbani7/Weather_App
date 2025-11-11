var cityInput = document.getElementById("cityInput");
var addInput  = document.getElementById("add");
var cityOutput = document.getElementById("cityoutput");
var descOutput = document.getElementById("description");
var tempOutput = document.getElementById("temp");
var windOutput = document.getElementById("wind");
const apiKey = "3045dd712ffe6e702e3245525ac7fa38";

function convertToCel(value) {
  return (value - 273.15).toFixed(2);
}

async function GetWeather() {
  const city = cityInput.value.trim();
  if (!city) { alert("Please enter a city name."); return; }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;
  const weatherResult = await (await fetch(url)).json();
  setInfo(weatherResult);
}

function setInfo(data) {
  var cityName    = data.name;
  var description = data.weather[0].description;
  var temp        = data.main.temp;
  var windMs      = data.wind.speed;

  cityOutput.innerHTML = `City : ${cityName}`;
  descOutput.innerHTML = `Description : ${description}`;
  tempOutput.innerHTML = `Temperature : ${convertToCel(temp)} °C`;

  var windKmh = (windMs * 3.6).toFixed(1);
  windOutput.innerHTML = `Wind Speed : ${windKmh} km/h`;
}

addInput.addEventListener("click", GetWeather);
