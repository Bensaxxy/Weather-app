"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface WeatherData {
  temperature: number;
  weathercode: number;
  city: string;
  country: string;
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

const FirstGrid = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      try {
        const res = await axios.get("/api/weather", {
          params: { lat, lon },
        });

        setWeather(res.data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="overflow-hidden rounded-xl h-[240px] flex flex-col gap-2 items-center justify-center bg-neutral-600 text-sm">
        <Image
          src="/images/icon-loading.svg"
          width={20}
          height={20}
          alt="loading"
        />
        <p>Loading...</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="overflow-hidden rounded-xl h-[240px] flex items-center justify-center bg-neutral-200">
        <p>Could not fetch weather data</p>
      </div>
    );
  }

  const icon = weatherIcons[weather.weathercode] || "/images/icon-unknown.webp";

  return (
    <div className="overflow-hidden rounded-xl">
      <div className="h-[240px] bg-[url('/images/bg-today-small.svg')] bg-cover bg-center md:bg-[url('/images/bg-today-large.svg')]">
        <div className="h-full flex flex-col md:flex-row items-center md:justify-between justify-center px-4 md:px-6 text-center md:text-left">
          <div>
            <h1 className="text-2xl md:text-2xl xl:text-3xl font-[600]">
              {weather.city}, {weather.country}
            </h1>
            <p className="font-[300] mt-2 text-neutral-0 text-sm md:text-md">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center">
            <Image src={icon} width={110} height={110} alt="weather-icon" />
            <span>
              <h1 className="text-6xl md:text-6xl 2xl:text-8xl font-[700] italic">
                {weather.temperature}
                <sup>°</sup>
              </h1>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstGrid;
