"use client";
import React from "react";
import FirstGrid from "./FirstGrid";
import SecondGrid from "./SecondGrid";
import ThirdGrid from "./Third/ThirdGrid";
import FourthGrid from "./Fourth/FourthGrid";

interface WeatherData {
  temperature: number;
  weathercode: number;
  windspeed: number;
  winddirection: number;
  feelsLike: number | null;
  humidity: number | null;
  precipitation: number | null;
  city: string;
  country: string;
}

interface AllGridProps {
  units: any;
  weatherData: WeatherData | null;
}

const AllGrid: React.FC<AllGridProps> = ({ units, weatherData }) => {
  const loading = !weatherData; // if no data yet, show loading
  const error = !weatherData ? "Failed to fetch weather data" : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-2">
        <div className="grid gap-4">
          <FirstGrid
            weather={weatherData}
            loading={loading}
            fetching={loading}
            error={error}
            units={units}
          />
          <SecondGrid
            weather={{
              feelsLike: weatherData?.feelsLike ?? null,
              humidity: weatherData?.humidity ?? null,
              windspeed: weatherData?.windspeed ?? 0,
              precipitation: weatherData?.precipitation ?? null,
            }}
            units={{
              ...units,
              system: units.temperature === "celsius" ? "metric" : "imperial",
            }}
          />
          <ThirdGrid units={units} />
        </div>
      </div>
      <div className="row-span-3">
        <FourthGrid />
      </div>
    </div>
  );
};

export default AllGrid;
