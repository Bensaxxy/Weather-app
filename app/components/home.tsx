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
  const [coords, setCoords] = useState<{ lat: number; lon: number }>({
    lat: 9.05785,
    lon: 7.49508,
  }); // default Abuja

  const buildCacheKey = (u: UnitPreferences, c: { lat: number; lon: number }) =>
    `${u.system}_${u.temperature}_${u.wind}_${u.precipitation}_${c.lat}_${c.lon}`;

  const fetchWeather = async (selectedUnits: UnitPreferences, c = coords) => {
    const { temperature, wind, precipitation } = selectedUnits;
    const key = buildCacheKey(selectedUnits, c);

    // Serve from cache if available
    if (weatherCache[key]) {
      setWeatherData(weatherCache[key]);
    }

    try {
      const res = await fetch(
        `/api/weather?lat=${c.lat}&lon=${c.lon}&tempUnit=${temperature}&windUnit=${wind}&precipUnit=${precipitation}`
      );
      const json = await res.json();

      setWeatherCache((prev) => ({ ...prev, [key]: json }));
      setWeatherData(json);
    } catch (err) {
      console.error("Weather fetch error:", err);
    }
  };

  useEffect(() => {
    fetchWeather(units, coords);
  }, [units, coords]);

  // 🔹 Search handler
  const handleSearch = async (query: string) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&limit=1`
      );
      const results = await res.json();
      if (results.length > 0) {
        const { lat, lon } = results[0];
        setCoords({ lat: parseFloat(lat), lon: parseFloat(lon) });
      } else {
        alert("Location not found");
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="px-3 mb-7">
      <Navbar units={units} setUnits={setUnits} />

      <h1
        className="text-6xl md:text-5xl xl:text-6xl text-center my-14"
        style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
      >
        How's the sky looking today?
      </h1>

      {/* Pass search handler */}
      <SearchBar onSearch={handleSearch} />

      <div className="md:px-6 lg:px-16 xl:px-28 2xl:px-40">
        <AllGrid units={units} weatherData={weatherData} />
      </div>
    </div>
  );
};

export default HomePage;
