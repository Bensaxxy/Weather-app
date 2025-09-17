import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="mt-20 mb-16">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-center gap-2 items-center"
      >
        <div
          className="flex items-center gap-4 bg-neutral-200/30 backdrop-blur-sm
             rounded-md py-3 px-4 w-full md:w-96 lg:w-[450px]
             placeholder:font-[500] placeholder:text-neutral-200
             focus-within:ring-2 focus-within:ring-neutral-0"
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
    </div>
  );
};

export default SearchBar;
