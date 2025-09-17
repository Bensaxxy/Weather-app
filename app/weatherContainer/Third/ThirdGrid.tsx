"use client";
import React from "react";
import Image from "next/image";
import Loading from "./Loading";

interface DailyForecast {
  date: string;
  max: number;
  min: number;
  code: number;
}

interface ThirdGridProps {
  units: {
    temperature: "celsius" | "fahrenheit";
    wind: "kmh" | "mph";
    precipitation: "mm" | "in";
  };
  forecast: DailyForecast[];
}

const weatherIcons: Record<number, string> = {
  0: "/images/icon-sunny.webp",
  1: "/images/icon-partly-cloudy.webp",
  2: "/images/icon-partly-cloudy.webp",
  3: "/images/icon-overcast.webp",
  45: "/images/icon-fog.webp",
  48: "/images/icon-fog.webp",
  51: "/images/icon-rain.webp",
  61: "/images/icon-rain.webp",
  71: "/images/icon-snow.webp",
  95: "/images/icon-storm.webp",
};

const ThirdGrid: React.FC<ThirdGridProps> = ({ units, forecast }) => {
  if (!forecast.length)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="mt-5">
      <h1 className="font-semibold">Daily Forecast</h1>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-3 md:gap-5 mt-2">
        {forecast.map((day, i) => {
          const icon = weatherIcons[day.code] || "/images/icon-drizzle.webp";
          const weekday = new Date(day.date).toLocaleDateString("en-US", {
            weekday: "short",
          });
          return (
            <div
              key={i}
              className="bg-neutral-700 py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/60 rounded-lg"
            >
              <h1 className="text-sm font-[500] text-neutral-0">{weekday}</h1>
              <Image src={icon} width={40} height={40} alt="weather" />
              <div className="flex justify-between items-center w-full">
                <span className="flex text-sm font-[500] text-neutral-200">
                  <p>{Math.round(day.max)}</p>
                  <sub>°</sub>
                </span>
                <span className="flex text-sm font-[500] text-neutral-200">
                  <p>{Math.round(day.min)}</p>
                  <sub>°</sub>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThirdGrid;
