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
  'Patchy rain possible': <CloudRain size={50} color="#FF6F00" />,
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
  if (!weatherData) return <p>Loading...</p>;

  return (
    <div className="w-full md:w-[280px] h-full bg-gradient-to-b from-orange-500 to-blue-300 rounded-md p-4 text-[#FF6F00] flex flex-col gap-5 justify-between shadow-3xl">
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white font-bold rounded-xl p-2 flex justify-center items-center">
          {day}
        </div>
      </div>

      <div className="flex justify-center items-center px-20">
        <div className="bg-white w-full rounded-lg flex justify-center h-full p-2">
          {weatherIcons[weatherData.condition.text] || (
            <Cloud size={50} color="#FF6F00" />
          )}
        </div>
      </div>
      <div className="bg-white w-full rounded-lg p-2 flex flex-col justify-center pt-7 gap-4">
        <div className="w-full flex justify-center text-2xl font-bold">
          <p> {weatherData.avgtemp_c}°C</p>
        </div>
        <div className="w-full flex justify-center">
          <p>{weatherData.condition.text}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
