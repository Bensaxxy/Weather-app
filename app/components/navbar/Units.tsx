"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import UnitsModal from "@/app/modal/UnitsModal";

type UnitPreferences = {
  system: "metric" | "imperial";
  temperature: "celsius" | "fahrenheit";
  wind: "kmh" | "mph";
  precipitation: "mm" | "in";
};

const Units = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 🔑 Single source of truth
  const [units, setUnits] = useState<UnitPreferences>({
    system: "metric",
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  const [data, setData] = useState<any>(null);

  // Fetch weather when units change
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `/api/weather?lat=9.05785&lon=7.49508&tempUnit=${units.temperature}&windUnit=${units.wind}&precipUnit=${units.precipitation}`
        );
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [units]);

  return (
    <div>
      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
          className="flex gap-2 items-center cursor-pointer bg-neutral-700 py-1 px-3 rounded focus:ring-2 focus:ring-neutral-0 outline-none"
        >
          <Image
            src="/images/icon-units.svg"
            width={14}
            height={14}
            alt="unit-icon"
          />
          <span className="font-[500]">Units</span>
          <Image
            src="/images/icon-dropdown.svg"
            width={14}
            height={14}
            alt="dropdown-icon"
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 z-50">
            <UnitsModal
              selected={units} // 👈 pass current units
              onSelect={(u) => {
                setUnits(u); // update state
                setIsOpen(false); // close after selection
              }}
            />
          </div>
        )}
      </div>

      {/* Debug UI */}
      {data && (
        <div className="text-sm mt-4">
          <p>
            Temp: {data.temperature}° {units.temperature}
          </p>
          <p>
            Wind: {data.windspeed} {units.wind}
          </p>
          <p>
            Precipitation: {data.precipitation} {units.precipitation}
          </p>
        </div>
      )}
    </div>
  );
};

export default Units;
