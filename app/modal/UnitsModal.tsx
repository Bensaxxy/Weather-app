import Image from "next/image";
import React, { useState, useEffect } from "react";

export interface UnitPreferences {
  system: "metric" | "imperial";
  temperature: "celsius" | "fahrenheit";
  wind: "kmh" | "mph";
  precipitation: "mm" | "in";
}

interface UnitsModalProps {
  onSelect: (units: UnitPreferences) => void;
  selected: UnitPreferences; // 👈 new prop
}

const UnitsModal: React.FC<UnitsModalProps> = ({ onSelect, selected }) => {
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">(
    selected.system
  );
  const [temperature, setTemperature] = useState<"celsius" | "fahrenheit">(
    selected.temperature
  );
  const [wind, setWind] = useState<"kmh" | "mph">(selected.wind);
  const [precipitation, setPrecipitation] = useState<"mm" | "in">(
    selected.precipitation
  );

  // 👇 keep modal in sync if parent updates `selected`
  useEffect(() => {
    setUnitSystem(selected.system);
    setTemperature(selected.temperature);
    setWind(selected.wind);
    setPrecipitation(selected.precipitation);
  }, [selected]);

  const updatePreferences = (updates: Partial<UnitPreferences>) => {
    let newSystem = unitSystem;
    let newTemp = temperature;
    let newWind = wind;
    let newPrecip = precipitation;

    // Apply updates
    if (updates.system) {
      newSystem = updates.system;
      // auto-switch defaults when system changes
      if (newSystem === "metric") {
        newTemp = "celsius";
        newWind = "kmh";
        newPrecip = "mm";
      } else {
        newTemp = "fahrenheit";
        newWind = "mph";
        newPrecip = "in";
      }
    }
    if (updates.temperature) newTemp = updates.temperature;
    if (updates.wind) newWind = updates.wind;
    if (updates.precipitation) newPrecip = updates.precipitation;

    // Update local state
    setUnitSystem(newSystem);
    setTemperature(newTemp);
    setWind(newWind);
    setPrecipitation(newPrecip);

    // Notify parent
    onSelect({
      system: newSystem,
      temperature: newTemp,
      wind: newWind,
      precipitation: newPrecip,
    });
  };

  return (
    <div className="bg-neutral-700 p-4 mt-2 w-46 md:w-55 rounded-md z-10 outline outline-neutral-500/50 shadow-xl">
      {/* Switch Metric / Imperial */}
      <div
        onClick={() =>
          updatePreferences({
            system: unitSystem === "metric" ? "imperial" : "metric",
          })
        }
        className="cursor-pointer hover:bg-neutral-300/10 py-[10px] px-2 rounded-md shadow-2xl focus:ring-2 outline-none"
      >
        <h1 className="text-sm md:text-md">
          {unitSystem === "metric" ? "Switch to Imperial" : "Switch to Metric"}
        </h1>
      </div>

      {/* Temperature */}
      <div>
        <p className="text-sm my-2 font-[300] text-neutral-200">Temperature</p>
        <div
          onClick={() => updatePreferences({ temperature: "celsius" })}
          className={`cursor-pointer py-[8px] px-2 rounded-md shadow-2xl flex justify-between items-center my-2 ${
            temperature === "celsius"
              ? "bg-neutral-600 text-white"
              : "hover:bg-neutral-300/10"
          }`}
        >
          <h1 className="text-sm md:text-md">Celsius (°C)</h1>
          {temperature === "celsius" && (
            <Image
              src="/images/icon-checkmark.svg"
              width={10}
              height={10}
              alt="checkmark"
            />
          )}
        </div>
        <div
          onClick={() => updatePreferences({ temperature: "fahrenheit" })}
          className={`cursor-pointer py-[8px] px-2 rounded-md shadow-2xl flex justify-between items-center my-2 ${
            temperature === "fahrenheit"
              ? "bg-neutral-600 text-white"
              : "hover:bg-neutral-300/10"
          }`}
        >
          <h1 className="text-sm md:text-md">Fahrenheit (°F)</h1>
          {temperature === "fahrenheit" && (
            <Image
              src="/images/icon-checkmark.svg"
              width={10}
              height={10}
              alt="checkmark"
            />
          )}
        </div>
        <hr className="border-neutral-600" />
      </div>

      {/* Wind */}
      <div
        onClick={() => updatePreferences({ wind: "kmh" })}
        className={`cursor-pointer py-[8px] px-2 rounded-md shadow-2xl flex justify-between items-center my-2 ${
          wind === "kmh"
            ? "bg-neutral-600 text-white"
            : "hover:bg-neutral-300/10"
        }`}
      >
        <h1 className="text-sm md:text-md">Km/h</h1>
        {wind === "kmh" && (
          <Image
            src="/images/icon-checkmark.svg"
            width={10}
            height={10}
            alt="checkmark"
          />
        )}
      </div>
      <div
        onClick={() => updatePreferences({ wind: "mph" })}
        className={`cursor-pointer py-[8px] px-2 rounded-md shadow-2xl flex justify-between items-center my-2 ${
          wind === "mph"
            ? "bg-neutral-600 text-white"
            : "hover:bg-neutral-300/10"
        }`}
      >
        <h1 className="text-sm md:text-md">mph</h1>
        {wind === "mph" && (
          <Image
            src="/images/icon-checkmark.svg"
            width={10}
            height={10}
            alt="checkmark"
          />
        )}
      </div>

      {/* Precipitation */}
      <div
        onClick={() => updatePreferences({ precipitation: "mm" })}
        className={`cursor-pointer py-[8px] px-2 rounded-md shadow-2xl flex justify-between items-center my-2 ${
          precipitation === "mm"
            ? "bg-neutral-600 text-white"
            : "hover:bg-neutral-300/10"
        }`}
      >
        <h1 className="text-sm md:text-md">Millimeters (mm)</h1>
        {precipitation === "mm" && (
          <Image
            src="/images/icon-checkmark.svg"
            width={10}
            height={10}
            alt="checkmark"
          />
        )}
      </div>
      <div
        onClick={() => updatePreferences({ precipitation: "in" })}
        className={`cursor-pointer py-[8px] px-2 rounded-md shadow-2xl flex justify-between items-center ${
          precipitation === "in"
            ? "bg-neutral-600 text-white"
            : "hover:bg-neutral-300/10"
        }`}
      >
        <h1 className="text-sm md:text-md">Inches (in)</h1>
        {precipitation === "in" && (
          <Image
            src="/images/icon-checkmark.svg"
            width={10}
            height={10}
            alt="checkmark"
          />
        )}
      </div>
    </div>
  );
};

export default UnitsModal;
