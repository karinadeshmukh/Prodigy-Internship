const apiKey = "4a739256611ef7653ea295336ae6a9ba";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById("weatherData").innerHTML = `<p>${error.message}</p>`;
  }
}

function displayWeather(data) {
  const weatherHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}" />
    <p><strong>${data.weather[0].main}</strong>: ${data.weather[0].description}</p>
    <p>🌡️ Temperature: ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
  `;
  document.getElementById("weatherData").innerHTML = weatherHTML;
}
