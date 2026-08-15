"use client";

/**
 * Live theme state for the lab: dual palettes, axes, undo, persistence, and CSS apply.
 * URL `?theme=` wins over localStorage on first hydrate.
 */

import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { applyPaletteToElement } from "./css-codec";
import { THEME_PRESETS } from "./presets";
import {
  createDefaultTheme,
  type ColorTokenKey,
  type ThemeColors,
  type ThemeDocument,
  type ThemeMode,
} from "./schema";
import {
  clearThemeStorage,
  loadThemeFromStorage,
  saveThemeToStorage,
  themeFromSearchParams,
} from "./url-state";
import { loadGoogleFont } from "./utils";

export type { ThemeColors, ThemeMode, ThemeDocument, ColorTokenKey };

export type ThemeState = {
  mode: ThemeMode;
  theme: ThemeDocument;
  /** Active mode palette (convenience) */
  colors: ThemeColors;
  light: ThemeColors;
  dark: ThemeColors;
  radius: number;
  font: string;
  borderWidth: number;
  letterSpacing: number;
  setMode: (mode: ThemeMode) => void;
  setColors: (colors: Partial<ThemeColors>) => void;
  setLightColors: (colors: Partial<ThemeColors>) => void;
  setDarkColors: (colors: Partial<ThemeColors>) => void;
  setRadius: (radius: number) => void;
  setFont: (font: string) => void;
  setBorderWidth: (borderWidth: number) => void;
  setLetterSpacing: (letterSpacing: number) => void;
  setPreset: (presetId: string) => void;
  importTheme: (doc: ThemeDocument) => void;
  resetTheme: () => void;
  undo: () => void;
  canUndo: boolean;
};

const ThemeContext = createContext<ThemeState | undefined>(undefined);

const HISTORY_LIMIT = 30;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light");
  const [theme, setTheme] = useState<ThemeDocument>(() => createDefaultTheme());
  const [isHydrated, setIsHydrated] = useState(false);
  const historyRef = useRef<ThemeDocument[]>([]);
  const [canUndo, setCanUndo] = useState(false);

  const pushHistory = useCallback((prev: ThemeDocument) => {
    historyRef.current = [...historyRef.current.slice(-(HISTORY_LIMIT - 1)), prev];
    setCanUndo(historyRef.current.length > 0);
  }, []);

  const updateTheme = useCallback(
    (updater: (prev: ThemeDocument) => ThemeDocument) => {
      setTheme((prev) => {
        pushHistory(prev);
        return updater(prev);
      });
    },
    [pushHistory],
  );

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
  }, []);

  const setColors = useCallback(
    (partial: Partial<ThemeColors>) => {
      updateTheme((prev) => ({
        ...prev,
        [mode]: { ...prev[mode], ...partial },
      }));
    },
    [mode, updateTheme],
  );

  const setLightColors = useCallback(
    (partial: Partial<ThemeColors>) => {
      updateTheme((prev) => ({ ...prev, light: { ...prev.light, ...partial } }));
    },
    [updateTheme],
  );

  const setDarkColors = useCallback(
    (partial: Partial<ThemeColors>) => {
      updateTheme((prev) => ({ ...prev, dark: { ...prev.dark, ...partial } }));
    },
    [updateTheme],
  );

  const setRadius = useCallback(
    (radius: number) => updateTheme((prev) => ({ ...prev, radius })),
    [updateTheme],
  );
  const setFont = useCallback(
    (font: string) => updateTheme((prev) => ({ ...prev, font })),
    [updateTheme],
  );
  const setBorderWidth = useCallback(
    (borderWidth: number) => updateTheme((prev) => ({ ...prev, borderWidth })),
    [updateTheme],
  );
  const setLetterSpacing = useCallback(
    (letterSpacing: number) => updateTheme((prev) => ({ ...prev, letterSpacing })),
    [updateTheme],
  );

  const setPreset = useCallback(
    (presetId: string) => {
      const preset = THEME_PRESETS.find((p) => p.id === presetId);
      if (!preset) return;
      updateTheme((prev) => ({
        ...prev,
        light: { ...preset.light },
        dark: { ...preset.dark },
        font: preset.font ?? prev.font,
        radius: preset.radius ?? prev.radius,
        borderWidth: preset.borderWidth ?? prev.borderWidth,
        letterSpacing: preset.letterSpacing ?? prev.letterSpacing,
      }));
    },
    [updateTheme],
  );

  const importTheme = useCallback(
    (doc: ThemeDocument) => {
      updateTheme(() => doc);
    },
    [updateTheme],
  );

  const resetTheme = useCallback(() => {
    updateTheme(() => createDefaultTheme());
    setModeState("light");
    clearThemeStorage();
  }, [updateTheme]);

  const undo = useCallback(() => {
    const prev = historyRef.current.pop();
    setCanUndo(historyRef.current.length > 0);
    if (prev) setTheme(prev);
  }, []);

  // Hydrate from URL (?theme=) then localStorage
  useEffect(() => {
    const fromUrl =
      typeof window !== "undefined" ? themeFromSearchParams(window.location.search) : null;
    if (fromUrl) {
      setTheme(fromUrl);
    } else {
      const stored = loadThemeFromStorage();
      if (stored) setTheme(stored);
    }
    setIsHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (isHydrated) saveThemeToStorage(theme);
  }, [theme, isHydrated]);

  // Apply CSS variables for the active mode + toggle .dark class
  useEffect(() => {
    const root = document.documentElement;
    const palette = mode === "dark" ? theme.dark : theme.light;
    applyPaletteToElement(root, palette, theme);
    root.classList.toggle("dark", mode === "dark");
  }, [theme, mode]);

  useEffect(() => {
    loadGoogleFont(theme.font);
  }, [theme.font]);

  const value = useMemo<ThemeState>(
    () => ({
      mode,
      theme,
      colors: mode === "dark" ? theme.dark : theme.light,
      light: theme.light,
      dark: theme.dark,
      radius: theme.radius,
      font: theme.font,
      borderWidth: theme.borderWidth,
      letterSpacing: theme.letterSpacing,
      setMode,
      setColors,
      setLightColors,
      setDarkColors,
      setRadius,
      setFont,
      setBorderWidth,
      setLetterSpacing,
      setPreset,
      importTheme,
      resetTheme,
      undo,
      canUndo,
    }),
    [
      mode,
      theme,
      setMode,
      setColors,
      setLightColors,
      setDarkColors,
      setRadius,
      setFont,
      setBorderWidth,
      setLetterSpacing,
      setPreset,
      importTheme,
      resetTheme,
      undo,
      canUndo,
    ],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
