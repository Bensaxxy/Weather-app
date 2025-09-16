"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Loading from "./Loading";

interface DailyForecast {
  date: string;
  max: number;
  min: number;
  code: number;
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

const ThirdGrid = () => {
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await axios.get("/api/weather", {
          params: {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          },
        });
        setForecast(res.data.dailyForecast);
      } catch (error) {
        console.error("Failed to fetch forecast:", error);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  if (loading)
    return (
      <div className="mt-5">
        <Loading />
      </div>
    );
  if (!forecast.length) return <p>No forecast available</p>;

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
              className="bg-neutral-700 py-2 px-2 flex flex-col justify-center items-center text-center gap-3 outline outline-neutral-500/80 rounded-lg"
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
