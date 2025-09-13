import React from "react";

interface WeatherData {
  feelsLike: number | null;
  humidity: number | null;
  windspeed: number;
  precipitation: number | null;
}

const SecondGrid = ({ weather }: { weather: WeatherData | null }) => {
  if (!weather) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/80">
          <p className="font-[300] text-sm md:text-md text-neutral-200">
            Feels Like
          </p>
          <h1 className="mt-4 text-2xl font-[300]">--</h1>
        </div>
        <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/80">
          <p className="font-[300] text-sm md:text-md text-neutral-200">
            Humidity
          </p>
          <h1 className="mt-4 text-2xl font-[300]">--</h1>
        </div>
        <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/80">
          <p className="font-[300] text-sm md:text-md text-neutral-200">Wind</p>
          <h1 className="mt-4 text-2xl font-[300]">--</h1>
        </div>
        <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/80">
          <p className="font-[300] text-sm md:text-md text-neutral-200">
            Precipitation
          </p>
          <h1 className="mt-4 text-2xl font-[300]">--</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
      {/* Feels Like */}
      <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/80">
        <p className="font-[300] text-sm md:text-md text-neutral-200">
          Feels Like
        </p>
        <h1 className="mt-4 text-2xl font-[300]">
          {weather.feelsLike ?? "--"}
          <sup>°</sup>
        </h1>
      </div>

      {/* Humidity */}
      <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/80">
        <p className="font-[300] text-sm md:text-md text-neutral-200">
          Humidity
        </p>
        <h1 className="mt-4 text-2xl font-[300]">
          {weather.humidity ?? "--"}%
        </h1>
      </div>

      {/* Wind */}
      <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/80">
        <p className="font-[300] text-sm md:text-md text-neutral-200">Wind</p>
        <h1 className="mt-4 text-2xl font-[300]">{weather.windspeed} Km/h</h1>
      </div>

      {/* Precipitation */}
      <div className="bg-neutral-700 rounded-lg p-4 outline outline-neutral-500/80">
        <p className="font-[300] text-sm md:text-md text-neutral-200">
          Precipitation
        </p>
        <h1 className="mt-4 text-2xl font-[300]">
          {weather.precipitation ?? 0} mm
        </h1>
      </div>
    </div>
  );
};

export default SecondGrid;
