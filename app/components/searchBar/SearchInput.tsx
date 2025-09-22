"use client";
import React, { useEffect, useState } from "react";

interface SearchInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  recents: string[];
  onSelect: (location: string) => void;
  toggleFavorite: (location: string) => void;
  favorites: string[];
  handleAddCompare: (location: string) => void;
  loading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  input,
  setInput,
  recents,
  onSelect,
  toggleFavorite,
  favorites,
  handleAddCompare,
  loading,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

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

  const filteredRecents = recents.filter(
    (r) => r.toLowerCase().includes(input.toLowerCase()) && r !== input
  );
  const combinedSuggestions = [
    ...filteredRecents.map((r) => ({ type: "recent", name: r })),
    ...suggestions.map((s: any) => ({ type: "live", name: s.display_name })),
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSelect(input.trim());
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-center gap-2 items-center"
      >
        <div className="flex items-center gap-4 bg-neutral-800 dark:bg-neutral-200/30 backdrop-blur-md rounded-md py-3 px-4 w-full md:w-96 lg:w-[450px] focus-within:ring-2 focus-within:ring-neutral-0 relative">
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

      {showSuggestions && combinedSuggestions.length > 0 && (
        <ul className="absolute left-1/2 transform -translate-x-1/2 md:-translate-x-[270px] mt-2 w-full md:w-96 lg:w-[450px] bg-neutral-600 shadow-lg rounded-md max-h-60 overflow-y-auto z-10 custom-scrollbar">
          {combinedSuggestions.map((s, i) => (
            <li
              key={i}
              className="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-neutral-300/20"
            >
              <span
                onClick={() => onSelect(s.name)}
                className={
                  s.type === "recent" ? "text-blue-500 font-medium" : ""
                }
              >
                {s.name}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleAddCompare(s.name)}
                  className="text-green-400 text-sm font-semibold hover:underline cursor-pointer"
                >
                  + Add
                </button>
                <button
                  onClick={() => toggleFavorite(s.name)}
                  className={`text-sm font-semibold ${
                    favorites.includes(s.name)
                      ? "text-yellow-400"
                      : "text-neutral-200"
                  }`}
                >
                  ★
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchInput;
