import React, { JSX } from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudRain,
  CloudLightning,
  Snowflake,
} from 'lucide-react';

const weatherIcons: { [key: string]: JSX.Element } = {
  Sunny: <Sun size={50} color="#FF6F00" />,
  'Partly cloudy': <CloudSun size={50} color="#FF6F00" />,
  Cloudy: <Cloud size={50} color="#FF6F00" />,
  Overcast: <Cloud size={50} color="#FF6F00" />,
  Mist: <CloudFog size={50} color="#FF6F00" />,
  'Patchy rain': <CloudRain size={50} color="#FF6F00" />,
  Rain: <CloudRain size={50} color="#FF6F00" />,
  Thunderstorm: <CloudLightning size={50} color="#FF6F00" />,
  Snow: <Snowflake size={50} color="#FF6F00" />,
  Fog: <CloudFog size={50} color="#FF6F00" />,
};

// Props for WeatherCard
interface WeatherCardProps {
  weatherData: any;
  day: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, day }) => {
  const isToday = day === 'Today';
  if (!weatherData) return <p>Loading...</p>;

  return (
    <div
      className={`flex flex-col gap-5 p-2 items-center justify-center rounded-xl bg-[#FF6F00] text-[#FF6F00] ${
        isToday ? 'w-full h-80' : 'h-64 w-32'
      }`}
    >
      <div className="bg-white font-bold rounded-xl px-4 py-1 flex justify-start items-start">
        {day}
      </div>
      <div className="flex justify-center items-center w-full bg-white rounded-md">
        <div className="rounded-lg flex justify-center h-full p-2">
          {weatherIcons[weatherData.condition.text] || (
            <Cloud size={40} color="#FF6F00" />
          )}
        </div>
      </div>
      <div className="bg-white w-full rounded-md p-2 flex flex-col justify-center pt-7 gap-4">
        <div
          className={`w-full flex justify-center font-bold'${
            isToday ? 'text-3xl' : 'text-sm'
          }`}
        >
          <p>{weatherData.avgtemp_c}°C</p>
        </div>
        <div className="w-full flex justify-center">
          <p>{weatherData.condition.text}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
