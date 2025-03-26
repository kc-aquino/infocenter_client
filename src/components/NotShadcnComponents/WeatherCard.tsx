import React, { JSX } from 'react';
import { Sun, CloudSun, Cloud, CloudFog, CloudRain, CloudLightning, Snowflake } from 'lucide-react';

const weatherIcons: { [key: string]: JSX.Element } = {
    "Sunny": <Sun size={50} color="#FF6F00" />,
    "Partly Cloudy": <CloudSun size={50} color="#FF6F00" />,
    "Cloudy": <Cloud size={50} color="#FF6F00" />,
    "Overcast": <Cloud size={50} color="#FF6F00" />,
    "Mist": <CloudFog size={50} color="#FF6F00" />,
    "Patchy rain nearby": <CloudRain size={50} color="#FF6F00" />,
    "Rain": <CloudRain size={50} color="#FF6F00" />,
    "Thunderstorm": <CloudLightning size={50} color="#FF6F00" />,
    "Snow": <Snowflake size={50} color="#FF6F00" />,
    "Fog": <CloudFog size={50} color="#FF6F00" />
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
        <div className={`flex flex-col gap-5 items-center justify-between rounded-md bg-[#FF6F00] text-[#FF6F00]  ${isToday ? 'w-full h-80 p-2' : 'h-64 w-32 pb-6 px-2 pt-4'}`}>
            <div className='bg-white font-bold rounded-full px-4 py-1 flex justify-start items-start text-md'>
                {day}
            </div>
            <div className={`${isToday ? 'w-full px-0' : ''}`}>
                <div className={`flex justify-center items-center w-full bg-white rounded-lg ' ${isToday ? 'w-full p-3' : 'w-full h-[70px] p-[15px]'}`}>
                    <div className='rounded-lg flex justify-center h-full' >
                        {weatherIcons[weatherData.condition.text] || <Cloud size={40} color="#FF6F00" />}
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
