async function fetchWeather(event) {
    if (event.key === 'Enter') {
        const cityInput = document.getElementById('cityInput');
        const cityName = cityInput.value.trim();

        if (cityName) {
            const apiKey = 'a0694ae62572f7eb0bfb090ffcbf5feb'; // Replace with your OpenWeatherMap API key
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const data = await response.json();
                    updateWeatherInfo(data);
                    cityInput.value = '';
                } else {
                    alert('City not found. Please try again.');
                }
            } catch (error) {
                console.error('Error fetching the weather data:', error);
                alert('There was an error connecting to the server.');
            }
        }
    }
}

function updateWeatherInfo(data) {
    document.getElementById('location').textContent = `Location: ${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
