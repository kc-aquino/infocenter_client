import React, { JSX } from 'react';
import { Sun, CloudSun, Cloud, CloudFog, CloudRain, CloudLightning, Snowflake } from 'lucide-react';

const weatherIcons: { [key: string]: JSX.Element } = {
    "Sunny": <Sun size={50} color="#2a2a92" />,
    "Partly Cloudy": <CloudSun size={50} color="#2a2a92" />,
    "Cloudy": <Cloud size={50} color="#2a2a92" />,
    "Overcast": <Cloud size={50} color="#2a2a92" />,
    "Mist": <CloudFog size={50} color="#2a2a92" />,
    "Patchy rain nearby": <CloudRain size={50} color="#2a2a92" />,
    "Rain": <CloudRain size={50} color="#2a2a92" />,
    "Thunderstorm": <CloudLightning size={50} color="#2a2a92" />,
    "Snow": <Snowflake size={50} color="#2a2a92" />,
    "Fog": <CloudFog size={50} color="#2a2a92" />
};

// Props for WeatherCard
interface WeatherCardProps {
    weatherData: any;
    day: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, day }) => {
    const isToday = day === "Today";
    if (!weatherData) return <p>Loading...</p>;

    console.log(weatherData.condition.text)

    return (
        <div className={`flex flex-col gap-5 mx-2.5  justify-between rounded-md bg-[#2a2a92] text-[#2a2a92]  ${isToday ? 'w-full h-80 p-2' : 'items-center h-64 w-32 pb-6 px-2 pt-4'}`}>
            <div className='bg-white font-bold rounded-lg px-4 py-1 flex justify-center items-start text-md'>
                {day}
            </div>
            <div className={`${isToday ? 'w-full px-0' : ''}`}>
                <div className={`flex justify-center items-center w-full bg-white rounded-lg ' ${isToday ? 'w-full p-3' : 'w-full h-[70px] p-[15px]'}`}>
                    <div className='rounded-lg flex items-center justify-center h-full w-[70px]' >
                        {weatherIcons[weatherData.condition.text] || <Cloud size={40} color="#2a2a92" />}
                    </div>
                </div>
            </div>
            <div className={`bg-white w-full rounded-md p-2 justify-center grid grid-rows-2 ${isToday ? 'h-[163px] pt-14' : 'h-[70px]'}`}>
                <div className={`w-full flex justify-center font-bold ${isToday ? 'text-5xl' : 'text-lg'}`}>
                    <p>{isToday ? weatherData.temp_c : weatherData.avgtemp_c}°C</p>
                </div>
                <div className={`'w-full flex justify-center items-end text-xs' ${isToday ? 'text-lg' : 'text-xs'}`}>
                    <p>{weatherData.condition.text}</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
