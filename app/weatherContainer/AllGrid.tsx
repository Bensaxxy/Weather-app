"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FirstGrid from "./FirstGrid";
import SecondGrid from "./SecondGrid";
import ThirdGrid from "./ThirdGrid";
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
}

const AllGrid: React.FC<AllGridProps> = ({ units }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported in this browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          const res = await axios.get("/api/weather", { params: { lat, lon } });
          setWeather(res.data);
        } catch (err: any) {
          console.error("Error fetching weather:", err);
          setError("Failed to fetch weather data");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Failed to get location");
        setLoading(false);
      }
    );
  }, [units]); // 👈 refetch when units change

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-2">
        <div className="grid gap-4">
          <FirstGrid
            weather={weather}
            loading={loading}
            fetching={loading}
            error={error}
            units={units}
          />
          <SecondGrid
            weather={{
              feelsLike: weather?.feelsLike ?? null,
              humidity: weather?.humidity ?? null,
              windspeed: weather?.windspeed ?? 0,
              precipitation: weather?.precipitation ?? null,
            }}
            units={{
              ...units,
              system: units.temperature === "celsius" ? "metric" : "imperial",
            }}
          />
          <ThirdGrid />
        </div>
      </div>
      <div className="row-span-3">
        <FourthGrid />
      </div>
    </div>
  );
};

export default AllGrid;
