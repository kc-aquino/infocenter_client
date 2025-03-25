import React from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define props for WeatherChart
interface WeatherChartProps {
  weatherData: any[];
}

const chartConfig = {
  temp: {
    label: "Avg Temperature (°C)",
    color: "#FF6F00", // Orange
  },
} satisfies ChartConfig;

const WeatherChart: React.FC<WeatherChartProps> = ({ weatherData }) => {
  if (!Array.isArray(weatherData) || weatherData.length === 0) {
    return <p className="text-center text-red-500">No data available</p>;
  }

  // Map weather forecast data to a format suitable for Recharts
  const chartData = weatherData.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }),
    temp: day.day?.avgtemp_c || 0, // Ensure valid temperature data
  }));

  // Get the last day's data to display in a "fixed tooltip"
  const latestData = chartData[chartData.length - 7];

  return (
    <Card className="lg:px-20 border-0">
      <CardHeader>
      </CardHeader>
      <CardContent className="relative">
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{ left: 12, right: 12, top: 10, bottom: 10 }}
            width={500}
            height={250}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              stroke="#FF6F00"
            />
            <YAxis domain={["auto", "auto"]} tickMargin={8} stroke="#FF6F00" />
            <Area
              dataKey="temp"
              type="monotone"
              fill="#FF6F00"
              fillOpacity={0.6}
              stroke="#FF6F00"
              strokeWidth={3}
              dot={{ fill: "#FF6F00", r: 5 }} // Show points
            />
          </AreaChart>
        </ChartContainer>

        {/* Fixed "Tooltip" showing latest data */}
        <div className="absolute top-4 right-4 bg-white shadow-lg rounded-md p-2 text-sm font-medium border border-gray-300">
          <p className="text-gray-500">Latest Data</p>
          <p className="text-[#FF6F00] text-lg">{latestData.temp}°C</p>
          <p className="text-gray-600">{latestData.date}</p>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
};

export default WeatherChart;
