/**
 * Versioned semantic theme schema for the Theme Lab.
 * Single source of truth for token keys, defaults, and persistence shape.
 */

export const THEME_SCHEMA_VERSION = 1 as const;

/** OKLCH components as "L C H" or "L C H / A" (alpha optional). */
export type OklchValue = string;

export const COLOR_TOKEN_KEYS = [
  "background",
  "foreground",
  "card",
  "cardForeground",
  "popover",
  "popoverForeground",
  "primary",
  "primaryForeground",
  "secondary",
  "secondaryForeground",
  "muted",
  "mutedForeground",
  "accent",
  "accentForeground",
  "destructive",
  "destructiveForeground",
  "border",
  "input",
  "ring",
  "chart1",
  "chart2",
  "chart3",
  "chart4",
  "chart5",
  "sidebar",
  "sidebarForeground",
  "sidebarPrimary",
  "sidebarPrimaryForeground",
  "sidebarAccent",
  "sidebarAccentForeground",
  "sidebarBorder",
  "sidebarRing",
] as const;

export type ColorTokenKey = (typeof COLOR_TOKEN_KEYS)[number];

export type ThemeColors = Record<ColorTokenKey, OklchValue>;

export type ThemeMode = "light" | "dark";

export type ThemeAxes = {
  radius: number;
  font: string;
  borderWidth: number;
  letterSpacing: number;
};

export type ThemeDocument = {
  version: typeof THEME_SCHEMA_VERSION;
  light: ThemeColors;
  dark: ThemeColors;
} & ThemeAxes;

export type ColorGroup = {
  id: string;
  label: string;
  keys: ColorTokenKey[];
};

export const COLOR_GROUPS: ColorGroup[] = [
  {
    id: "base",
    label: "Base",
    keys: ["background", "foreground", "card", "cardForeground", "popover", "popoverForeground"],
  },
  {
    id: "brand",
    label: "Brand",
    keys: [
      "primary",
      "primaryForeground",
      "secondary",
      "secondaryForeground",
      "accent",
      "accentForeground",
    ],
  },
  {
    id: "ui",
    label: "UI",
    keys: [
      "border",
      "input",
      "ring",
      "muted",
      "mutedForeground",
      "destructive",
      "destructiveForeground",
    ],
  },
  {
    id: "charts",
    label: "Charts",
    keys: ["chart1", "chart2", "chart3", "chart4", "chart5"],
  },
  {
    id: "sidebar",
    label: "Sidebar",
    keys: [
      "sidebar",
      "sidebarForeground",
      "sidebarPrimary",
      "sidebarPrimaryForeground",
      "sidebarAccent",
      "sidebarAccentForeground",
      "sidebarBorder",
      "sidebarRing",
    ],
  },
];

/** camelCase token → CSS custom property name */
export function tokenToCssVar(key: ColorTokenKey | string): string {
  const kebab = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  // chart1 → chart-1
  return `--${kebab.replace(/(\D)(\d)/g, "$1-$2")}`;
}

/** CSS custom property name → camelCase token (best-effort) */
export function cssVarToToken(cssVar: string): string {
  const name = cssVar.replace(/^--/, "");
  // chart-1 → chart1, sidebar-primary-foreground → sidebarPrimaryForeground
  return name.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}

export const DEFAULT_LIGHT: ThemeColors = {
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
  sidebar: "0.985 0 0",
  sidebarForeground: "0.145 0 0",
  sidebarPrimary: "0.205 0 0",
  sidebarPrimaryForeground: "0.985 0 0",
  sidebarAccent: "0.97 0 0",
  sidebarAccentForeground: "0.205 0 0",
  sidebarBorder: "0.922 0 0",
  sidebarRing: "0.708 0 0",
};

export const DEFAULT_DARK: ThemeColors = {
  background: "0.145 0 0",
  foreground: "0.985 0 0",
  card: "0.205 0 0",
  cardForeground: "0.985 0 0",
  popover: "0.205 0 0",
  popoverForeground: "0.985 0 0",
  primary: "0.922 0 0",
  primaryForeground: "0.205 0 0",
  secondary: "0.269 0 0",
  secondaryForeground: "0.985 0 0",
  muted: "0.269 0 0",
  mutedForeground: "0.708 0 0",
  accent: "0.269 0 0",
  accentForeground: "0.985 0 0",
  destructive: "0.704 0.191 22.216",
  destructiveForeground: "0.985 0 0",
  border: "1 0 0 / 10%",
  input: "1 0 0 / 15%",
  ring: "0.556 0 0",
  chart1: "0.488 0.243 264.376",
  chart2: "0.696 0.17 162.48",
  chart3: "0.769 0.188 70.08",
  chart4: "0.627 0.265 303.9",
  chart5: "0.645 0.246 16.439",
  sidebar: "0.205 0 0",
  sidebarForeground: "0.985 0 0",
  sidebarPrimary: "0.488 0.243 264.376",
  sidebarPrimaryForeground: "0.985 0 0",
  sidebarAccent: "0.269 0 0",
  sidebarAccentForeground: "0.985 0 0",
  sidebarBorder: "1 0 0 / 10%",
  sidebarRing: "0.556 0 0",
};

export const DEFAULT_AXES: ThemeAxes = {
  radius: 0.625,
  font: "Inter",
  borderWidth: 1,
  letterSpacing: 0,
};

export function createDefaultTheme(): ThemeDocument {
  return {
    version: THEME_SCHEMA_VERSION,
    light: { ...DEFAULT_LIGHT },
    dark: { ...DEFAULT_DARK },
    ...DEFAULT_AXES,
  };
}

export function ensureThemeColors(partial?: Partial<ThemeColors> | null): ThemeColors {
  return { ...DEFAULT_LIGHT, ...partial };
}

export function ensureThemeDocument(input: unknown): ThemeDocument {
  const base = createDefaultTheme();
  if (!input || typeof input !== "object") return base;
  const obj = input as Record<string, unknown>;

  const light =
    obj.light && typeof obj.light === "object"
      ? ensureThemeColors(obj.light as Partial<ThemeColors>)
      : obj.colors && typeof obj.colors === "object"
        ? ensureThemeColors(obj.colors as Partial<ThemeColors>)
        : base.light;

  const dark =
    obj.dark && typeof obj.dark === "object"
      ? ensureThemeColors(obj.dark as Partial<ThemeColors>)
      : base.dark;

  return {
    version: THEME_SCHEMA_VERSION,
    light,
    dark,
    radius: typeof obj.radius === "number" ? obj.radius : base.radius,
    font: typeof obj.font === "string" ? obj.font : base.font,
    borderWidth: typeof obj.borderWidth === "number" ? obj.borderWidth : base.borderWidth,
    letterSpacing: typeof obj.letterSpacing === "number" ? obj.letterSpacing : base.letterSpacing,
  };
}

/** Semantic pairs used for contrast auditing */
export const CONTRAST_PAIRS: Array<{
  fg: ColorTokenKey;
  bg: ColorTokenKey;
  label: string;
  largeText?: boolean;
}> = [
  { fg: "foreground", bg: "background", label: "Body text" },
  { fg: "cardForeground", bg: "card", label: "Card text" },
  { fg: "popoverForeground", bg: "popover", label: "Popover text" },
  { fg: "primaryForeground", bg: "primary", label: "Primary button" },
  { fg: "secondaryForeground", bg: "secondary", label: "Secondary button" },
  { fg: "mutedForeground", bg: "muted", label: "Muted text" },
  { fg: "mutedForeground", bg: "background", label: "Muted on background" },
  { fg: "accentForeground", bg: "accent", label: "Accent" },
  { fg: "destructiveForeground", bg: "destructive", label: "Destructive" },
  { fg: "sidebarForeground", bg: "sidebar", label: "Sidebar text" },
  { fg: "sidebarPrimaryForeground", bg: "sidebarPrimary", label: "Sidebar primary" },
  { fg: "sidebarAccentForeground", bg: "sidebarAccent", label: "Sidebar accent" },
];
