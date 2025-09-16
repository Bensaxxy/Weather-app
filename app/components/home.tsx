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

  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchWeather = async (selectedUnits: UnitPreferences) => {
    const { temperature, wind, precipitation } = selectedUnits;
    try {
      const res = await fetch(
        `/api/weather?lat=9.05785&lon=7.49508&tempUnit=${temperature}&windUnit=${wind}&precipUnit=${precipitation}`
      );
      const json = await res.json();
      setWeatherData(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather(units);
  }, [units]);
  return (
    <div className=" px-3 mb-7">
      {/* navbar component */}
      <Navbar units={units} setUnits={setUnits} />
      <h1
        className=" text-6xl text-center my-10"
        style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
      >
        How's the sky looking today?
      </h1>

      {/* searchbar */}
      <SearchBar />

      {/* weathers section */}
      <div className="md:px-6 lg:px-16 xl:px-28 2xl:px-40">
        <AllGrid units={units} />
      </div>
    </div>
  );
};

export default HomePage;
