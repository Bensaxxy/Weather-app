"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface FavoritesDropdownProps {
  favorites: string[];
  onSelect: (location: string) => void;
  toggleFavorite: (location: string) => void;
}

const FavoritesDropdown: React.FC<FavoritesDropdownProps> = ({
  favorites,
  onSelect,
  toggleFavorite,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (favorites.length === 0) return null;

  return (
    <div className="mt-6 md:px-6 lg:px-16 xl:px-28 2xl:px-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center bg-neutral-700  px-4 py-2 rounded-md text-nautral-0 gap-2 focus-within:ring-1 focus-within:ring-neutral-0 font-bold cursor-pointer w-full md:w-32"
      >
        Favorites
        <span>
          <Image
            src="/images/icon-dropdown.svg"
            width={14}
            height={14}
            alt="unit-icon"
          />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 "
          >
            {favorites.map((fav) => (
              <div
                key={fav}
                className="p-3 bg-neutral-700 dark:bg-neutral-300/20 rounded-lg shadow text-white relative cursor-pointer "
                onClick={() => onSelect(fav)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(fav);
                  }}
                  className="absolute top-1 right-2 text-red-500 font-bold cursor-pointer "
                >
                  ✕
                </button>
                <h3 className="font-bold">{fav}</h3>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FavoritesDropdown;
