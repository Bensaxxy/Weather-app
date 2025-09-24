// components/AutoThemeProvider.tsx
"use client";

import { useAutoTheme } from "@/app/hooks/useAutoTheme";

export default function AutoThemeProvider() {
  useAutoTheme();
  return null; // nothing to render, just runs the hook
}
