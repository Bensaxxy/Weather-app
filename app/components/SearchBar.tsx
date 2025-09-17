"use client";
import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");
  const [recents, setRecents] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Load recents from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecents(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage when recents change
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recents));
  }, [recents]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSelect(input.trim());
    }
  };

  const handleSelect = (location: string) => {
    onSearch(location);
    setInput(location);

    // Update recents (avoid duplicates, limit to 5)
    setRecents((prev) => {
      const updated = [location, ...prev.filter((r) => r !== location)];
      return updated.slice(0, 4);
    });

    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Fetch live suggestions from OpenStreetMap Nominatim API
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

  // Merge recent + live suggestions
  const filteredRecents = recents.filter(
    (r) => r.toLowerCase().includes(input.toLowerCase()) && r !== input
  );
  const combinedSuggestions = [
    ...filteredRecents.map((r) => ({ type: "recent", name: r })),
    ...suggestions.map((s: any) => ({
      type: "live",
      name: s.display_name,
    })),
  ];

  return (
    <div className="mt-20 mb-16 relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-center gap-2 items-center"
      >
        <div
          className="flex items-center gap-4 bg-neutral-200/30 backdrop-blur-sm
             rounded-md py-3 px-4 w-full md:w-96 lg:w-[450px]
             focus-within:ring-2 focus-within:ring-neutral-0 relative"
        >
          <img src="/images/icon-search.svg" alt="search-icon" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for a place..."
            className="border-none outline-none bg-transparent w-full
               placeholder:font-[500] placeholder:text-neutral-200/50"
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
        <ul className="absolute left-1/2 2xl:right-[537px] transform -translate-x-1/2 mt-2 w-full md:w-96 lg:w-[450px] bg-neutral-600 shadow-lg rounded-md max-h-60 overflow-y-auto z-10">
          {combinedSuggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => handleSelect(s.name)}
              className="px-4 py-2 cursor-pointer hover:bg-neutral-300/20"
            >
              {s.type === "recent" ? (
                <span className="text-blue-500 font-medium">{s.name}</span>
              ) : (
                <span>{s.name}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
