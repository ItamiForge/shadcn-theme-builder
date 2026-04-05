"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { THEME_PRESETS } from "./presets";
import { loadGoogleFont } from "./utils";

export type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
};

export type ThemeState = {
  mode: "light" | "dark";
  colors: ThemeColors;
  radius: number;
  font: string;
  borderWidth: number;
  letterSpacing: number;
  setMode: (mode: "light" | "dark") => void;
  setColors: (colors: Partial<ThemeColors>) => void;
  setRadius: (radius: number) => void;
  setFont: (font: string) => void;
  setBorderWidth: (borderWidth: number) => void;
  setLetterSpacing: (letterSpacing: number) => void;
  setPreset: (presetId: string) => void;
  resetTheme: () => void;
};

const defaultColors: ThemeColors = {
  background: "1 0 0",
  foreground: "0.145 0 0",
  card: "1 0 0",
  cardForeground: "0.145 0 0",
  popover: "1 0 0",
  popoverForeground: "0.145 0 0",
  primary: "0.205 0 0",
  primaryForeground: "0.985 0 0",
  secondary: "0.97 0 0",
  secondaryForeground: "0.205 0 0",
  muted: "0.97 0 0",
  mutedForeground: "0.556 0 0",
  accent: "0.97 0 0",
  accentForeground: "0.205 0 0",
  destructive: "0.577 0.245 27.325",
  destructiveForeground: "0.985 0 0",
  border: "0.922 0 0",
  input: "0.922 0 0",
  ring: "0.708 0 0",
  chart1: "0.646 0.222 41.116",
  chart2: "0.6 0.118 184.704",
  chart3: "0.398 0.07 227.392",
  chart4: "0.828 0.189 84.429",
  chart5: "0.769 0.188 70.08",
};

const ThemeContext = createContext<ThemeState | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [colors, setColorsState] = useState<ThemeColors>(defaultColors);
  const [radius, setRadius] = useState(0.625);
  const [font, setFont] = useState("Inter");
  const [borderWidth, setBorderWidth] = useState(1);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  const setColors = (newColors: Partial<ThemeColors>) => {
    setColorsState((prev) => ({ ...prev, ...newColors }));
  };

  const setPreset = (presetId: string) => {
    const preset = THEME_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      const themeColors = mode === "dark" ? preset.dark : preset.light;
      setColorsState(themeColors);
      // Apply all design tokens from the preset
      if (preset.font) setFont(preset.font);
      if (preset.radius !== undefined) setRadius(preset.radius);
      if (preset.borderWidth !== undefined) setBorderWidth(preset.borderWidth);
      if (preset.letterSpacing !== undefined) setLetterSpacing(preset.letterSpacing);
    }
  };

  const resetTheme = () => {
    setColorsState(defaultColors);
    setRadius(0.625);
    setFont("Inter");
    setBorderWidth(1);
    setLetterSpacing(0);
    setMode("light");
    localStorage.removeItem("shadcn-theme");
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("shadcn-theme");
    if (saved) {
      try {
        const {
          mode: savedMode,
          colors: savedColors,
          radius: savedRadius,
          font: savedFont,
          borderWidth: savedBorderWidth,
          letterSpacing: savedLetterSpacing,
        } = JSON.parse(saved);
        setMode(savedMode || "light");
        setColorsState(savedColors || defaultColors);
        setRadius(savedRadius || 0.625);
        setFont(savedFont || "Inter");
        setBorderWidth(savedBorderWidth || 1);
        setLetterSpacing(savedLetterSpacing || 0);
      } catch {
        // If parsing fails, just use defaults
      }
    }
    setIsHydrated(true);
  }, []);

  // Save theme to localStorage whenever it changes (after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(
        "shadcn-theme",
        JSON.stringify({ mode, colors, radius, font, borderWidth, letterSpacing })
      );
    }
  }, [mode, colors, radius, font, borderWidth, letterSpacing, isHydrated]);

  // Effect to update CSS variables when state changes
  useEffect(() => {
    const root = document.documentElement;

    // Update colors in OKLch format - use the colors state directly for both light and dark
    Object.entries(colors).forEach(([key, value]) => {
      // Convert camelCase to kebab-case for CSS variables
      const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      // Format as oklch(L C H)
      root.style.setProperty(cssVar, `oklch(${value})`);
    });

    // Update radius
    root.style.setProperty("--radius", `${radius}rem`);

    // Update border width
    root.style.setProperty("--border-width", `${borderWidth}px`);

    // Update letter spacing
    root.style.setProperty("--letter-spacing", `${letterSpacing}em`);

    // Update Class for Dark Mode
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [colors, radius, borderWidth, letterSpacing, mode]);

  // Effect to load font when it changes
  useEffect(() => {
    loadGoogleFont(font);
  }, [font]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        colors,
        radius,
        font,
        borderWidth,
        letterSpacing,
        setMode,
        setColors,
        setRadius,
        setFont,
        setBorderWidth,
        setLetterSpacing,
        setPreset,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
