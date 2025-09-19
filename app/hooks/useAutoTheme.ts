// hooks/useAutoTheme.ts
"use client";

import { useEffect } from "react";

export function useAutoTheme() {
  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      const hour = new Date().getHours();
      const isDaytime = hour >= 6 && hour < 18;

      if (isDaytime) {
        root.classList.remove("dark");
      } else {
        root.classList.add("dark");
      }
    };

    // Run immediately on load
    updateTheme();

    // Check every minute (60000 ms)
    const interval = setInterval(updateTheme, 60 * 1000);

    return () => clearInterval(interval);
  }, []);
}
