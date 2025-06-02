import { useEffect, useState } from "react";
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

    return (
        <div className='w-full p-3 md:rounded-xl'>
            <div className='flex flex-row items-center py-2 gap-3'>
                <span className='bg-[#FFFFFF] text-sm md:text-lg font-extrabold text-[#2a2a92] border-3 border-[#2a2a92] p-3 rounded-md'>Malabon Weather</span>
                <div className='flex gap-3'>
                    <span className=' text-sm bg-[#2a2a92] text-white p-3 rounded-md'>
                        {weather?.current?.last_updated ? formatDate(weather.current.last_updated.split(" ")[0]) : ""}
                    </span>
                </div>
            </div>
            <div className='flex justify-flex items-end md:rounded-xl md:border border-[#2a2a92] bg-no-repeat bg-cover bg-white w-full h-auto p-3 overflow-x-auto'>

                <div className='flex justify-center items-center'>
                    <div className="w-[250px] h-full">
                        {weather?.current && (
                            <WeatherCard weatherData={weather.current} day="Today" />
                        )}
                    </div>
                </div>
                <div className='flex gap-2 mt-2 pl-5 '>
                    {weather?.forecast?.forecastday.slice(1).map((dayData: any, index: number) => (
                        <WeatherCard key={index} weatherData={dayData.day} day={weekDays[index + 1]} />

                    ))}
                </div>
            </div>

            <span className="bg-[#FFFFFF] text-sm md:text-lg font-extrabold text-[#2a2a92] border-3 border-[#2a2a92] rounded-md inline-block p-3 mt-3">
                Weekly Forecast
            </span>
            <div className='flex flex-col pt-2 w-full gap-3'>
                <WeatherChart
                weatherData={weather?.forecast?.forecastday || []}
                />
            </div>


        </div>
    );
};

export default WeatherPage;
