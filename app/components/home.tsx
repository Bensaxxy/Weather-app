"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import SearchBar from "./searchBar/SearchBar";
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
  });

  const buildCacheKey = (u: UnitPreferences, c: { lat: number; lon: number }) =>
    `${u.system}_${u.temperature}_${u.wind}_${u.precipitation}_${c.lat}_${c.lon}`;

  // 🔹 Normal single-location weather fetch (for AllGrid)
  const fetchWeather = async (selectedUnits: UnitPreferences, c = coords) => {
    const { temperature, wind, precipitation } = selectedUnits;
    const key = buildCacheKey(selectedUnits, c);

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
      return json;
    } catch (err) {
      console.error("Weather fetch error:", err);
    }
  };

  useEffect(() => {
    fetchWeather(units, coords);
  }, [units, coords]);

  // 🔹 Search handler for main weather view
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

  // 🔹 Compare fetcher for SearchBar
  const fetchWeatherForLocation = async (location: string) => {
    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          location
        )}&format=json&limit=1`
      );
      const geoData = await geoRes.json();
      if (geoData.length === 0) return null;

      const { lat, lon } = geoData[0];
      const { temperature, wind, precipitation } = units;

      const res = await fetch(
        `/api/weather?lat=${lat}&lon=${lon}&tempUnit=${temperature}&windUnit=${wind}&precipUnit=${precipitation}`
      );
      const data = await res.json();

      // console.log(data);

      // Adjust keys depending on your backend response
      return {
        name: location,
        temp: data?.current_weather?.temperature ?? "N/A",
        humidity: data?.humidity ?? "N/A",
        wind: data?.current_weather?.windspeed ?? "N/A",
      };
    } catch (err) {
      console.error("Compare fetch error:", err);
      return null;
    }
  };

  return (
    <div className="px-3 pb-7 ">
      <Navbar units={units} setUnits={setUnits} />

      <h1
        className=" text-6xl md:text-5xl xl:text-6xl text-center my-10 md:my-14 dark:text-neutral-0"
        style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
      >
        How's the sky looking today?
      </h1>

      <SearchBar
        onSearch={handleSearch}
        units={units}
        fetchWeather={fetchWeatherForLocation}
      />

      <div className="md:px-6 lg:px-16 xl:px-28 2xl:px-40">
        <AllGrid units={units} weatherData={weatherData} />
      </div>
    </div>
  );
};

export default HomePage;
