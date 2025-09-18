"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import WeeksDayModal from "../../modal/WeeksDayModal";
import Loading from "./Loading";
import { UnitPreferences } from "@/app/modal/UnitsModal";

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

interface FourthGridProps {
  weatherData: any;
  units: UnitPreferences;
}

const FourthGrid: React.FC<FourthGridProps> = ({ weatherData, units }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hourly, setHourly] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState("Today");

  const toggleModal = () => setIsOpen((prev) => !prev);

  const getForecastForDay = (day: string) => {
    if (!weatherData?.hourlyByDay) return [];

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
      const diff = (dayIndex - todayIndex + 7) % 7;
      const target = new Date();
      target.setDate(target.getDate() + diff);
      targetDate = target.toISOString().split("T")[0];
    }

    return weatherData.hourlyByDay[targetDate] || [];
  };

  useEffect(() => {
    setHourly(getForecastForDay(selectedDay).slice(0, 8));
  }, [selectedDay, weatherData]);

  return (
    <div>
      <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/50 w-full">
        <div className="flex items-center justify-between mb-2">
          <h1>Hourly forecast</h1>
          <button
            onClick={toggleModal}
            type="button"
            className="bg-neutral-300/20 rounded-sm py-1 px-3 flex items-center gap-2 relative cursor-pointer focus:ring-1 outline-none"
          >
            <span>{selectedDay}</span>
            <Image
              src="/images/icon-dropdown.svg"
              width={14}
              height={14}
              alt="unit-icon"
            />
            {isOpen && (
              <div className="absolute right-0 top-8 z-50">
                <WeeksDayModal
                  onSelect={(day) => {
                    setSelectedDay(day);
                    setIsOpen(false);
                  }}
                  selectedDay={selectedDay}
                />
              </div>
            )}
          </button>
        </div>

        <div>
          {!hourly.length && <Loading />}

          {hourly.map((h, i) => {
            const hour = new Date(h.time).getHours();
            const ampm = hour >= 12 ? "PM" : "AM";
            const displayHour = hour % 12 === 0 ? 12 : hour % 12;
            const icon = weatherIcons[h.code] || "/images/icon-drizzle.webp";

            return (
              <div
                key={i}
                className="bg-neutral-300/20 rounded-md px-3 py-[5.5px] flex justify-between items-center mb-[13px]"
              >
                <span className="flex items-center gap-1">
                  <Image src={icon} width={35} height={35} alt="wi" />
                  {displayHour} {ampm}
                </span>
                <span>
                  {Math.round(h.temp)}
                  <sup>°</sup> {units.temperature === "celsius" ? "" : ""}
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
