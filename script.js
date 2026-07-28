const apiKey = "b2ece683ddcd749651501126c01181dc";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const city = "india";

const searchInput = document.getElementById("city-search");
const searchButton = document.getElementById("search-button");

function handleSearch() {
  const cityName = searchInput?.value?.trim();
  if (cityName) {
    fetchWeatherData(cityName);
  }
}

if (searchButton) {
  searchButton.addEventListener("click", handleSearch);
}

if (searchInput) {
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });
}

console.log("Weather script loaded.");

async function fetchWeatherData(cityName = city) {
  console.log(`Fetching weather for ${cityName}...`);

  try {
    const response = await fetch(
      `${apiUrl}?q=${encodeURIComponent(cityName)}&units=metric&appid=${apiKey}`,
    );

    if (response.status === 404) {
      const tempEl = document.querySelector(".weather-summary .temp");
      const conditionEl = document.querySelector(".weather-summary .condition");
      const cityEl = document.querySelector(".weather-summary h2");
      const feelsLikeEl = document.querySelector(
        ".weather-summary .feels-like",
      );
      const weatherIconEl = document.querySelector(
        ".weather-visual .sun-badge i",
      );

      if (tempEl) tempEl.textContent = "City not found";
      if (conditionEl) conditionEl.textContent = "No data";
      if (cityEl) cityEl.textContent = "Unknown city";
      if (feelsLikeEl) feelsLikeEl.textContent = "";
      if (weatherIconEl) {
        weatherIconEl.className = "fa-solid fa-cloud-sun";
      }

      return;
    }

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("Weather data:", data);

    const tempEl = document.querySelector(".weather-summary .temp");
    const conditionEl = document.querySelector(".weather-summary .condition");
    const cityEl = document.querySelector(".weather-summary h2");
    const feelsLikeEl = document.querySelector(".weather-summary .feels-like");
    const weatherIconEl = document.querySelector(
      ".weather-visual .sun-badge i",
    );

    const mainCondition = data.weather?.[0]?.main?.toLowerCase() || "clear";

    const iconMap = {
      clear: "fa-sun",
      clouds: "fa-cloud",
      rain: "fa-cloud-rain",
      drizzle: "fa-cloud-rain",
      thunderstorm: "fa-bolt",
      snow: "fa-snowflake",
      mist: "fa-smog",
      fog: "fa-smog",
      default: "fa-cloud-sun",
    };

    if (tempEl) {
      tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    }
    if (conditionEl) {
      conditionEl.textContent = data.weather?.[0]?.main || "Unknown";
    }
    if (cityEl) {
      cityEl.textContent = data.name;
    }
    if (feelsLikeEl) {
      feelsLikeEl.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
    }
    if (weatherIconEl) {
      const mappedIcon = iconMap[mainCondition] || iconMap.default;
      weatherIconEl.className = `fa-solid ${mappedIcon}`;
    }

    const humidityEl = document.querySelector(".detail-card:nth-of-type(1) p");
    const windEl = document.querySelector(".detail-card:nth-of-type(2) p");
    const pressureEl = document.querySelector(".detail-card:nth-of-type(3) p");
    const visibilityEl = document.querySelector(
      ".detail-card:nth-of-type(4) p",
    );

    if (humidityEl) {
      humidityEl.textContent = `${data.main.humidity}%`;
    }
    if (windEl) {
      windEl.textContent = `${data.wind.speed.toFixed(1)} km/h`;
    }
    if (pressureEl) {
      pressureEl.textContent = `${data.main.pressure} hPa`;
    }
    if (visibilityEl) {
      visibilityEl.textContent = `${(data.visibility / 1000).toFixed(0)} km`;
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);

    const tempEl = document.querySelector(".weather-summary .temp");
    if (tempEl) {
      tempEl.textContent = "N/A";
    }
  }
}

fetchWeatherData(city);
