"use client";
import React, { useState, useEffect } from "react";
import ProgressLoading from "./ProgressLoading";
import SearchInput from "@/app/components/searchBar/SearchInput";
import FavoritesDropdown from "@/app/components/searchBar/FavoritesDropdown";
import CompareGrid from "@/app/components/searchBar/CompareGrid";

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
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  // Load recents + favorites
  useEffect(() => {
    const storedRecents = localStorage.getItem("recentSearches");
    if (storedRecents) setRecents(JSON.parse(storedRecents));

    const storedFavorites = localStorage.getItem("favoriteLocations");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recents));
  }, [recents]);

  useEffect(() => {
    localStorage.setItem("favoriteLocations", JSON.stringify(favorites));
  }, [favorites]);

  const handleSelect = async (location: string) => {
    try {
      setLoading(true);
      onSearch(location);
      setInput(location);

      setRecents((prev) => {
        const updated = [location, ...prev.filter((r) => r !== location)];
        return updated.slice(0, 4);
      });

      // Fetch weather for the main search (optional)
      const data = await fetchWeather(location);
      setWeatherData((prev) => ({ ...prev, [location]: data }));
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (location: string) => {
    setFavorites((prev) =>
      prev.includes(location)
        ? prev.filter((f) => f !== location)
        : [...prev, location]
    );
  };

  const handleAddCompare = async (location: string) => {
    try {
      setLoading(true);
      if (!compareList.includes(location)) {
        setCompareList((prev) => [...prev, location]);
        const data = await fetchWeather(location);
        setWeatherData((prev) => ({ ...prev, [location]: data }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCompare = (location: string) => {
    setCompareList(compareList.filter((l) => l !== location));
    const updated = { ...weatherData };
    delete updated[location];
    setWeatherData(updated);
  };

  return (
    <div className="mt-20 mb-16 relative">
      <SearchInput
        input={input}
        setInput={setInput}
        recents={recents}
        onSelect={handleSelect}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
        handleAddCompare={handleAddCompare}
        loading={loading} // still useful if SearchInput wants to disable input
      />

      {/* Unified Loader */}
      {loading && (
        <div className="mt-3 flex justify-center absolute left-1/2 transform -translate-x-1/2 w-full md:w-96 lg:w-[450px] z-50">
          <ProgressLoading />
        </div>
      )}

      <FavoritesDropdown
        favorites={favorites}
        onSelect={handleSelect}
        toggleFavorite={toggleFavorite}
      />

      <CompareGrid
        compareList={compareList}
        weatherData={weatherData}
        units={units}
        handleRemoveCompare={handleRemoveCompare}
      />
    </div>
  );
};

export default SearchBar;
