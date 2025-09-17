"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import SearchBar from "./SearchBar";
import AllGrid from "../weatherContainer/AllGrid";
import { UnitPreferences } from "@/app/modal/UnitsModal";

const HomePage = () => {
  const [units, setUnits] = useState<UnitPreferences>({
    system: "metric",
    temperature: "celsius",
    wind: "kmh",
    precipitation: "mm",
  });

  const [weatherCache, setWeatherCache] = useState<Record<string, any>>({});
  const [weatherData, setWeatherData] = useState<any>(null);

  const buildCacheKey = (u: UnitPreferences) =>
    `${u.system}_${u.temperature}_${u.wind}_${u.precipitation}`;

  const fetchWeather = async (selectedUnits: UnitPreferences) => {
    const { temperature, wind, precipitation } = selectedUnits;
    const key = buildCacheKey(selectedUnits);

    // If we already have cached data, show it instantly
    if (weatherCache[key]) {
      setWeatherData(weatherCache[key]);
    }

    try {
      const res = await fetch(
        `/api/weather?lat=9.05785&lon=7.49508&tempUnit=${temperature}&windUnit=${wind}&precipUnit=${precipitation}`
      );
      const json = await res.json();

      // Save to cache
      setWeatherCache((prev) => ({ ...prev, [key]: json }));
      setWeatherData(json);
    } catch (err) {
      console.error("Weather fetch error:", err);
    }
  };

  useEffect(() => {
    fetchWeather(units);
  }, [units]);

  return (
    <div className="px-3 mb-7">
      {/* navbar component */}
      <Navbar units={units} setUnits={setUnits} />
      <h1
        className="text-6xl md:text-5xl xl:text-6xl text-center my-14"
        style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
      >
        How's the sky looking today?
      </h1>

      {/* searchbar */}
      <SearchBar />

      {/* weathers section */}
      <div className="md:px-6 lg:px-16 xl:px-28 2xl:px-40">
        <AllGrid units={units} weatherData={weatherData} />
      </div>
    </div>
  );
};

export default HomePage;
