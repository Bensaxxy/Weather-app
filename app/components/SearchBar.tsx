"use client";
import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  fetchWeather: (location: string) => Promise<any>;
  units: {
    system: string;
    temperature: string;
    wind: string;
    precipitation: string;
  };
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  fetchWeather,
  units,
}) => {
  const [input, setInput] = useState("");
  const [recents, setRecents] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Compare list + weather data
  const [compareList, setCompareList] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<Record<string, any>>({});

  // Load recents from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecents(JSON.parse(stored));
  }, []);

  // Save recents
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recents));
  }, [recents]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) handleSelect(input.trim());
  };

  const handleSelect = (location: string) => {
    onSearch(location);
    setInput(location);

    // Update recents
    setRecents((prev) => {
      const updated = [location, ...prev.filter((r) => r !== location)];
      return updated.slice(0, 4);
    });

    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleAddCompare = async (location: string) => {
    if (!compareList.includes(location)) {
      setCompareList((prev) => [...prev, location]);

      // Fetch weather for this location
      const data = await fetchWeather(location);
      setWeatherData((prev) => ({ ...prev, [location]: data }));
    }
    setSuggestions([]);
    setShowSuggestions(false);
    setInput(""); // clear search input after adding
  };

  const handleRemoveCompare = (location: string) => {
    setCompareList(compareList.filter((l) => l !== location));
    const updated = { ...weatherData };
    delete updated[location];
    setWeatherData(updated);
  };

  // Live suggestions (OSM Nominatim API)
  const fetchSuggestions = async (query: string) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&addressdetails=1&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  useEffect(() => {
    if (input.trim().length > 2) {
      fetchSuggestions(input);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input]);

  // Merge recents + live
  const filteredRecents = recents.filter(
    (r) => r.toLowerCase().includes(input.toLowerCase()) && r !== input
  );
  const combinedSuggestions = [
    ...filteredRecents.map((r) => ({ type: "recent", name: r })),
    ...suggestions.map((s: any) => ({ type: "live", name: s.display_name })),
  ];

  return (
    <div className="mt-20 mb-16 relative">
      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-center gap-2 items-center"
      >
        <div className="flex items-center gap-4 bg-neutral-200/30 backdrop-blur-sm rounded-md py-3 px-4 w-full md:w-96 lg:w-[450px] focus-within:ring-2 focus-within:ring-neutral-0 relative">
          <img src="/images/icon-search.svg" alt="search-icon" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for a place..."
            className="border-none outline-none bg-transparent w-full placeholder:font-[500] placeholder:text-neutral-200/50"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 py-3 px-4 rounded-md text-white font-[500] cursor-pointer w-full md:w-auto focus:ring-2 focus:ring-blue-500 hover:bg-blue-500/70 transition"
        >
          Search
        </button>
      </form>

      {/* Suggestions dropdown */}
      {showSuggestions && combinedSuggestions.length > 0 && (
        <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-full md:w-96 lg:w-[450px] bg-neutral-600 shadow-lg rounded-md max-h-60 overflow-y-auto z-10 custom-scrollbar">
          {combinedSuggestions.map((s, i) => (
            <li
              key={i}
              className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-neutral-300/20"
            >
              <span
                onClick={() => handleSelect(s.name)}
                className={
                  s.type === "recent" ? "text-blue-500 font-medium" : ""
                }
              >
                {s.name}
              </span>
              <button
                onClick={() => handleAddCompare(s.name)}
                className="text-green-400 text-sm font-semibold hover:underline"
              >
                + Add
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Compare List Grid */}
      {compareList.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {compareList.map((location) => (
            <div
              key={location}
              className="p-4 bg-neutral-700 rounded-lg shadow text-white relative"
            >
              <button
                onClick={() => handleRemoveCompare(location)}
                className="absolute top-2 right-2 text-red-400 font-bold"
              >
                ✕
              </button>
              <h3 className="font-bold mb-2">{location}</h3>
              {weatherData[location] ? (
                <div>
                  {/* Temperature */}
                  <p>
                    Temp: {weatherData[location].temp}
                    {units.temperature === "celsius"
                      ? "°C"
                      : units.temperature === "fahrenheit"
                      ? "°F"
                      : "K"}
                  </p>

                  {/* Humidity (always %) */}
                  <p>Humidity: {weatherData[location].humidity}%</p>

                  {/* Wind */}
                  <p>
                    Wind: {weatherData[location].wind}
                    {units.wind === "kmh"
                      ? " km/h"
                      : units.wind === "ms"
                      ? " m/s"
                      : " mph"}
                  </p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
