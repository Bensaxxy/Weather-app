"use client";
import React from "react";

interface CompareGridProps {
  compareList: string[];
  weatherData: Record<string, any>;
  units: {
    system: string;
    temperature: string;
    wind: string;
    precipitation: string;
  };
  handleRemoveCompare: (location: string) => void;
}

const CompareGrid: React.FC<CompareGridProps> = ({
  compareList,
  weatherData,
  units,
  handleRemoveCompare,
}) => {
  if (compareList.length === 0) return null;

  return (
    <div className="mt-3 md:px-6 lg:px-16 xl:px-28 2xl:px-40 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      <div>
        <h1 className="font-semibold mb-2">Comparing Locations</h1>

        {compareList.map((location) => (
          <div
            key={location}
            className="p-4 bg-neutral-700 dark:bg-neutral-300/20 rounded-lg shadow text-white relative"
          >
            <button
              onClick={() => handleRemoveCompare(location)}
              className="absolute top-1 right-2 text-red-500 font-bold cursor-pointer"
            >
              ✕
            </button>
            <h3 className="font-bold mb-2">{location}</h3>
            {weatherData[location] ? (
              <div>
                <p>
                  Temp: {weatherData[location].temp}
                  {units.temperature === "celsius"
                    ? "°C"
                    : units.temperature === "fahrenheit"
                    ? "°F"
                    : "K"}
                </p>
                <p>Humidity: {weatherData[location].humidity}%</p>
                <p>
                  Wind: {weatherData[location].wind}
                  {units.wind === "kmh"
                    ? " km/h"
                    : units.wind === "ms"
                    ? " m/s"
                    : " mph"}
                </p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareGrid;
