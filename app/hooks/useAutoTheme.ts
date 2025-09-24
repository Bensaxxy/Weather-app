"use client";

import { useEffect } from "react";

export function useAutoTheme() {
  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      // skip auto if user manually selected a theme
      if (localStorage.getItem("theme")) return;

      const hour = new Date().getHours();
      const isDaytime = hour >= 6 && hour < 18;

      if (isDaytime) {
        root.classList.remove("dark");
      } else {
        root.classList.add("dark");
      }
    };

    updateTheme();
    const interval = setInterval(updateTheme, 60 * 1000);

    return () => clearInterval(interval);
  }, []);
}
