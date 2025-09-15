"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import WeeksDayModal from "../../modal/WeeksDayModal";
import Loading from "./Loading";

const weatherIcons: Record<number, string> = {
  0: "/images/icon-sunny.webp",
  1: "/images/icon-partly-cloudy.webp",
  2: "/images/icon-cloudy.webp",
  3: "/images/icon-overcast.webp",
  45: "/images/icon-fog.webp",
  48: "/images/icon-fog.webp",
  51: "/images/icon-rain.webp",
  61: "/images/icon-rain.webp",
  71: "/images/icon-snow.webp",
  95: "/images/icon-thunderstorm.webp",
};

const FourthGrid = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hourly, setHourly] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toggleModal = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Example lat/lon (Lagos)
        const res = await fetch(`/api/weather?lat=6.5244&lon=3.3792`);
        if (!res.ok) throw new Error("Failed to fetch hourly forecast");
        const data = await res.json();

        // Extract first 8 hours forecast
        const forecast = data.hourlyForecast.time
          .slice(0, 8)
          .map((time: string, i: number) => ({
            time,
            temp: data.hourlyForecast.temperature_2m[i],
            code: data.hourlyForecast.weathercode?.[i] ?? 0,
          }));

        setHourly(forecast);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="">
      <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/80 w-full">
        <div className="flex items-center justify-between mb-2">
          <h1>Hourly forecast</h1>
          <button
            onClick={toggleModal}
            type="button"
            className="bg-neutral-300/20 rounded-sm py-1 px-3 flex items-center gap-2 relative cursor-pointer focus:ring-2 outline-none"
          >
            <span>Today</span>
            <Image
              src="/images/icon-dropdown.svg"
              width={14}
              height={14}
              alt="unit-icon"
            />
            {isOpen && (
              <div className="absolute right-0 top-8 z-20">
                <WeeksDayModal />
              </div>
            )}
          </button>
        </div>

        <div>
          {loading && (
            <div>
              <Loading />
            </div>
          )}

          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && hourly.length === 0 && (
            <p>No hourly forecast available</p>
          )}

          {!loading &&
            !error &&
            hourly.map((h, i) => {
              const hour = new Date(h.time).getHours();
              const ampm = hour >= 12 ? "PM" : "AM";
              const displayHour = hour % 12 === 0 ? 12 : hour % 12;
              const icon = weatherIcons[h.code] || "/images/icon-drizzle.webp";

              return (
                <div
                  key={i}
                  className="bg-neutral-300/20 rounded-md px-3 py-2 flex justify-between items-center mb-[13px]"
                >
                  <span className="flex items-center gap-1">
                    <Image
                      src={icon}
                      width={30}
                      height={30}
                      alt="weather-icon"
                    />
                    {displayHour} {ampm}
                  </span>
                  <span>
                    {Math.round(h.temp)}
                    <sup>°</sup>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FourthGrid;
