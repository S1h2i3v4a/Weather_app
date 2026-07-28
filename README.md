# Nova Forecast Weather App

A simple weather dashboard built with HTML, CSS, and JavaScript. The app fetches live weather data from the OpenWeatherMap API and updates the UI with the current temperature, weather condition, city name, and key weather details.

## Project Structure

- `index.html` – Main structure of the weather app UI
- `style.css` – Styling for the glassmorphism layout, cards, and responsive design
- `script.js` – Handles API calls, search input events, and updating the DOM with weather data

## Features

- Search weather by city name
- Display current temperature and weather condition
- Show humidity, wind speed, pressure, and visibility
- Change the main weather icon based on the API condition
- Show a friendly message when a city is not found

## Challenges Faced

- Connecting the JavaScript logic to the correct HTML elements
- Making sure the weather data updates the UI only after a successful API response
- Handling API errors and invalid city names gracefully
- Showing meaningful fallback content instead of leaving the page blank

## How to Run

1. Open `index.html` in your browser.
2. Enter a city name in the search box.
3. Click the search button or press Enter to fetch weather details.

## Notes

This project uses the OpenWeatherMap API, so an active internet connection and a valid API key are required for live weather data.
