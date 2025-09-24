"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;

    // check current state from localStorage or DOM
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark");
      if (savedTheme === "dark") root.classList.add("dark");
    } else {
      // fallback: detect from DOM
      if (root.classList.contains("dark")) {
        setTheme("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-black dark:text-white cursor-pointer"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
