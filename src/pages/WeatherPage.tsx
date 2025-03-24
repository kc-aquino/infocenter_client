import React, { useEffect, useState } from "react";
import { fetchWeatherData } from "@/components/data-file";
import WeatherCard from '@/components/NotShadcnComponents/WeatherCard';

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const todayIndex = new Date().getDay();
const weekDays = [...daysOfWeek.slice(todayIndex, 7), ...daysOfWeek.slice(0, todayIndex)];

const WeatherPage = () => {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWeatherData();
      setWeather(data);
    };
    fetchData();
  }, []);

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  // Function to format time
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className='w-full p-0 md:p-10 md:rounded-xl'>
      <div className='grid grid-cols-1 lg:grid-cols-2 md:rounded-xl md:border border-orange-500 bg-no-repeat bg-cover bg-[url(/src/assets/bg-weather.png)] h-auto p-3 md:p-15 '>
        <div className='flex flex-col md:justify-center items-start p-2 md:p-7 gap-3'>
          <span className='bg-[#FFFFFF] text-3xl font-bold text-[#FF6F00] p-3 rounded-xl'>Malabon Weather</span>
          <div className='flex gap-3'>
            <span className='bg-[#FFFFFF] text-xl text-[#FF6F00] p-3 rounded-xl'>
              {weather?.current?.last_updated ? formatDate(weather.current.last_updated.split(" ")[0]) : ""}
            </span>
            <span className='bg-[#FFFFFF] text-xl text-[#FF6F00] p-3 rounded-xl'>
              Updated as of {weather?.current?.last_updated ? formatTime(weather.current.last_updated.split(" ")[1]) : ""}
            </span>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <div className="w-[280px] h-full">
            {weather?.forecast?.forecastday && (
              <WeatherCard weatherData={weather.forecast.forecastday[0].day} day="Today" />
            )}
          </div>
        </div>
      </div>

      <div className='flex flex-col pt-7 w-full'>
        <h1 className='text-xl font-semibold text-[#FF6F00]'>Weekly Forecast</h1>
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-5 mt-2 w-full'>
          {weather?.forecast?.forecastday?.slice(1).map((dayData: any, index: number) => (
            <WeatherCard key={index} weatherData={dayData.day} day={weekDays[index + 1]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
