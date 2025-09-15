"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import WeeksDayModal from "../../modal/WeeksDayModal";
import Loading from "./Loading";

const weatherIcons: Record<number, string> = {
  0: "/images/icon-sunny.webp",
  1: "/images/icon-partly-cloudy.webp",
  3: "/images/icon-overcast.webp",
  45: "/images/icon-fog.webp",
  48: "/images/icon-fog.webp",
  51: "/images/icon-rain.webp",
  61: "/images/icon-rain.webp",
  71: "/images/icon-snow.webp",
  95: "/images/icon-storm.webp",
};

const FourthGrid = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hourly, setHourly] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState("Today");

  const toggleModal = () => setIsOpen((prev) => !prev);

  const fetchWeather = async (day: string = "Today") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?lat=6.5244&lon=3.3792`);
      if (!res.ok) throw new Error("Failed to fetch hourly forecast");
      const data = await res.json();

      // Map days of week to API dates
      const todayDate = new Date().toISOString().split("T")[0];
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let targetDate = todayDate;
      if (day !== "Today") {
        const todayIndex = new Date().getDay();
        const dayIndex = daysOfWeek.indexOf(day);
        const diff = (dayIndex - todayIndex + 7) % 7; // days ahead
        const target = new Date();
        target.setDate(target.getDate() + diff);
        targetDate = target.toISOString().split("T")[0];
      }

      const forecast = data.hourlyByDay[targetDate] || [];

      setHourly(forecast.slice(0, 8)); // first 8 hours
      setSelectedDay(day);
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("Today");
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
            <span>{selectedDay}</span>
            <Image
              src="/images/icon-dropdown.svg"
              width={14}
              height={14}
              alt="unit-icon"
            />
            {isOpen && (
              <div className="absolute right-0 top-8 z-20">
                <WeeksDayModal onSelect={fetchWeather} />
              </div>
            )}
          </button>
        </div>

        <div>
          {loading && <Loading />}
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
                    <Image src={icon} width={30} height={30} alt="wi" />
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
