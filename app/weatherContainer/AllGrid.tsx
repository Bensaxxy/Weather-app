"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FirstGrid from "./FirstGrid";
import SecondGrid from "./SecondGrid";
import ThirdGrid from "./ThirdGrid";
import FourthGrid from "./FourthGrid";

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

const AllGrid = () => {
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
          const res = await axios.get("/api/weather", {
            params: { lat, lon },
          });
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
  }, []);

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className=" col-span-2">
        <div className="grid gap-4">
          <FirstGrid weather={weather} loading={loading} error={error} />
          <SecondGrid weather={weather} />
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
