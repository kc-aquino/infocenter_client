import React, { useEffect, useState } from "react";
import { fetchWeatherData } from "@/components/data-file";
import WeatherCard from '@/components/NotShadcnComponents/WeatherCard';
import WeatherChart from '@/components/NotShadcnComponents/WeatherChart';

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
    <div className='w-full p-3 md:rounded-xl'>
      <div className='flex flex-row  items-end p-2 gap-3'>
          <span className='bg-[#FFFFFF] text-sm md:text-lg font-extrabold text-[#FF6F00] border-3 border-[#FF6F00] p-3 rounded-md'>Malabon Weather</span>
          <div className='flex gap-3'>
            <span className=' text-sm bg-[#FF6F00] text-white p-3 rounded-md'>
              {weather?.current?.last_updated ? formatDate(weather.current.last_updated.split(" ")[0]) : ""}
            </span>
          </div>
      </div>
      <div className='flex justify-flex items-end md:rounded-xl md:border border-orange-500 bg-no-repeat bg-cover bg-white h-auto p-3 overflow-auto'>
        
        <div className='flex justify-center items-center'>
          <div className="w-[250px] h-full text-md md:text-xl font-bold">
            {weather?.forecast?.forecastday && (
              <WeatherCard weatherData={weather.forecast.forecastday[0].day} day="Today" />
            )}
          </div>
        </div>
        <div className='flex gap-2 mt-2 pl-5 text-xs md:text-md '>
          {weather?.forecast?.forecastday?.slice(1).map((dayData: any, index: number) => (
            <WeatherCard key={index} weatherData={dayData.day} day={weekDays[index + 1]} />
            
          ))}
        </div>
      </div>

      <div className='flex flex-col pt-2 w-full'>
        <h1 className='bg-[#FFFFFF] text-xs md:text-md font-extrabold text-[#FF6F00] border-3 border-[#FF6F00] p-3 rounded-md w-32 md:w-32 flex justify-center '>Weekly Forecast</h1>
        <WeatherChart weatherData={weather?.forecast?.forecastday || []} />
      </div>

      
    </div>
  );
};

export default WeatherPage;
