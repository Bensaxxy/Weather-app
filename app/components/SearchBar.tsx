"use client";
import React, { useState } from "react";

const SearchBar = ({ onSearch }: { onSearch: (data: any) => void }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      // Step 1: Geocode the query → lat & lon
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const geoData = await geoRes.json();

      if (geoData.length === 0) {
        setError("Location not found.");
        setLoading(false);
        return;
      }

      const { lat, lon, display_name } = geoData[0];

      // Step 2: Call your weather API route
      const weatherRes = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const weatherData = await weatherRes.json();

      if (weatherData.error) {
        setError("Failed to fetch weather.");
      } else {
        onSearch({ ...weatherData, locationName: display_name });
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSearch} className="mt-18 mb-8">
      <div className="flex flex-col md:flex-row justify-center gap-2 items-center">
        <div
          className="flex items-center gap-4 bg-neutral-200/30 backdrop-blur-sm
             rounded-md py-3 px-4 w-full md:w-96 lg:w-[450px]
             placeholder:font-[500] placeholder:text-neutral-200
             focus-within:ring-2 focus-within:ring-neutral-0"
        >
          <img src="/images/icon-search.svg" alt="search-icon" />
          <input
            type="text"
            name="search"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-none outline-none bg-transparent w-full
               placeholder:font-[500] placeholder:text-neutral-200/50 cursor-pointer "
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 py-3 px-4 rounded-md text-white font-[500] cursor-pointer w-full md:w-auto focus-within:ring-2 focus-within:ring-blue-500 hover:bg-blue-500/70 transition disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <p className="text-red-400 text-center mt-2">{error}</p>}
    </form>
  );
};

export default SearchBar;
