import React from "react";
import { UnitPreferences } from "@/app/modal/UnitsModal";
import Loading from "./Loading";

interface WeatherData {
  feelsLike: number | null;
  humidity: number | null;
  windspeed: number;
  precipitation: number | null;
}

interface SecondGridProps {
  weather: WeatherData | null;
  units: UnitPreferences;
}

const SecondGrid: React.FC<SecondGridProps> = ({ weather, units }) => {
  if (!weather) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
      {/* Feels Like */}
      <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/60">
        <p className="font-[300] text-sm md:text-md text-neutral-200">
          Feels Like
        </p>
        <h1 className="mt-4 text-2xl font-[300]">
          {weather.feelsLike ?? "--"}
          <sup>°</sup>
          {units.temperature === "celsius" ? "" : ""}
        </h1>
      </div>

      {/* Humidity */}
      <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/60">
        <p className="font-[300] text-sm md:text-md text-neutral-200">
          Humidity
        </p>
        <h1 className="mt-4 text-2xl font-[300]">
          {weather.humidity ?? "--"}%
        </h1>
      </div>

      {/* Wind */}
      <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/60">
        <p className="font-[300] text-sm md:text-md text-neutral-200">Wind</p>
        <h1 className="mt-4 text-2xl font-[300]">
          {" "}
          {weather.windspeed.toFixed(1)} {units.wind}
        </h1>
      </div>

      {/* Precipitation */}
      <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/60">
        <p className="font-[300] text-sm md:text-md text-neutral-200">
          Precipitation
        </p>
        <h1 className="mt-4 text-2xl font-[300]">
          {weather.precipitation?.toFixed(2) ?? 0} {units.precipitation}
        </h1>
      </div>
    </div>
  );
};

export default SecondGrid;
