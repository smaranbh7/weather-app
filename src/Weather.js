import axios from "axios";
import { useState } from "react";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d161d7b1750ff840a501ba6cca02dd15`);
            const kelvinTemp = response.data.main.temp; // Get temperature in Kelvin
            const celsiusTemp = kelvinTemp - 273.15; // Convert Kelvin to Celsius
            const roundedCelsiusTemp = Math.round(celsiusTemp); // Round to nearest whole number
            setWeather({ ...response.data, celsiusTemp: roundedCelsiusTemp }); // Add roundedTemp to weather data
        } catch (error) {
            console.log("Error fetching weather data", error);
        }
    }

    const handleClick = () => {
        fetchWeather();
    }

    return (
        <div className="weather-container">
            <input type="text" placeholder="Enter City Name" value={city} onChange={handleCityChange} />
            <button onClick={handleClick}>Get Weather</button>
            {weather && (
                <div className="weather-info">
                    <h2>{weather.name}</h2>
                    <p>Temp is {weather.celsiusTemp} °C</p>
                    <p>{weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
