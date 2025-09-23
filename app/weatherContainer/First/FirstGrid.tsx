"use client";
import React from "react";
import Image from "next/image";
import Loading from "./Loading";
import ApiErrorState from "@/app/components/ApiErrorState";

interface WeatherData {
  temperature: number;
  weathercode: number;
  city: string;
  country: string;
}

interface FirstGridProps {
  weather: WeatherData | null;
  loading: boolean;
  fetching: boolean;
  error: string | null;
  units: {
    temperature: "celsius" | "fahrenheit";
  };
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

const FirstGrid: React.FC<FirstGridProps> = ({
  weather,
  loading,
  error,
  units,
}) => {
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="overflow-hidden rounded-xl h-[240px] flex items-center justify-center bg-neutral-200">
        <ApiErrorState message={error ?? undefined} />
      </div>
    );
  }

  const icon = weatherIcons[weather.weathercode] || "/images/icon-sunny.webp";
  const displayTemp =
    units.temperature === "fahrenheit"
      ? Math.round((weather.temperature * 9) / 5 + 32)
      : weather.temperature;

  return (
    <div className="overflow-hidden rounded-xl">
      <div className=" relative h-[240px] bg-[url('/images/bg-today-small.svg')] bg-cover bg-center md:bg-[url('/images/bg-today-large.svg')]">
        <div className="h-full flex flex-col md:flex-row items-center md:justify-between justify-center px-4 md:px-6 text-center md:text-left">
          <div>
            <h1 className="text-2xl md:text-2xl xl:text-3xl font-[600]">
              {weather.city}, {weather.country}
            </h1>
            <p className="font-[300] mt-3 text-neutral-0 text-sm md:text-md">
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
                {displayTemp}
                <sup>°{units.temperature === "celsius" ? "" : ""}</sup>
              </h1>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstGrid;
