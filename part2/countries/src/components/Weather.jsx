import weatherServices from "../services/weather";
import { useEffect, useState } from "react";
const weatherIconBaseUrl = "https://openweathermap.org/img/wn";

export const Weather = ({ capital, latlang }) => {
  const [weather, setWeather] = useState(null);
  const [lat, lon] = latlang;
  const [error, setError] = useState(null);

  useEffect(() => {
    setWeather(null);
    setError(null);
    weatherServices
      .getWeather(lat, lon)
      .then((data) => setWeather(data))
      .catch(() => setError("Error while loading the weather"));
  }, [lat, lon]);

  if (error) {
    return <p>{error}</p>;
  }
  if (weather === null) {
    return <p>Loading weather...</p>;
  }

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature {weather.main.temp} celsius</p>
      <img
        src={`${weatherIconBaseUrl}/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};
