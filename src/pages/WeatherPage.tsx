import React from 'react';
import { useEffect, useState } from "react";
import { fetchWeatherData } from "@/components/data-file";

const WeatherPage = () => {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeatherData();
      setWeather(data);
    };
    getWeather();
  }, []);


  return (
    <div>
      <h1>Weather in Malabon</h1>
      {weather ? (
        <p>Temperature: {weather.current.temp_c}°C</p>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherPage;
