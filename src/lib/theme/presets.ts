import type { ThemeColors } from "./theme-context";

export type ThemePreset = {
  id: string;
  name: string;
  label: string;
  light: ThemeColors;
  dark: ThemeColors;
  font?: string;
  radius?: number;
  borderWidth?: number;
  letterSpacing?: number;
};

/**
 * Default (neutral) theme
 */
const defaultLight: ThemeColors = {
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

const defaultDark: ThemeColors = {
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
  border: "0.87 0 0",
  input: "0.91 0 0",
  ring: "0.556 0 0",
  chart1: "0.488 0.243 264.376",
  chart2: "0.696 0.17 162.48",
  chart3: "0.769 0.188 70.08",
  chart4: "0.627 0.265 303.9",
  chart5: "0.645 0.246 16.439",
};

/**
 * Ocean Breeze - Cool blue tones
 */
const oceanLight: ThemeColors = {
  ...defaultLight,
  primary: "0.471 0.222 251.813",
  primaryForeground: "0.985 0 0",
  secondary: "0.546 0.236 240.391",
  accent: "0.625 0.214 236.62",
  chart1: "0.546 0.236 240.391",
  chart2: "0.625 0.214 236.62",
  chart3: "0.471 0.222 251.813",
};

const oceanDark: ThemeColors = {
  ...defaultDark,
  primary: "0.648 0.237 251.813",
  primaryForeground: "0.145 0 0",
  secondary: "0.569 0.252 240.391",
  accent: "0.648 0.237 236.62",
  chart1: "0.648 0.237 251.813",
  chart2: "0.569 0.252 240.391",
  chart3: "0.648 0.237 236.62",
};

/**
 * Sunset - Warm orange/amber tones
 */
const sunsetLight: ThemeColors = {
  ...defaultLight,
  primary: "0.646 0.222 41.116",
  primaryForeground: "0.985 0 0",
  secondary: "0.743 0.211 66.341",
  accent: "0.782 0.23 54.376",
  chart1: "0.646 0.222 41.116",
  chart2: "0.743 0.211 66.341",
  chart3: "0.782 0.23 54.376",
};

const sunsetDark: ThemeColors = {
  ...defaultDark,
  primary: "0.725 0.251 41.116",
  primaryForeground: "0.145 0 0",
  secondary: "0.798 0.22 66.341",
  accent: "0.825 0.241 54.376",
  chart1: "0.725 0.251 41.116",
  chart2: "0.798 0.22 66.341",
  chart3: "0.825 0.241 54.376",
};

/**
 * Forest - Green tones
 */
const forestLight: ThemeColors = {
  ...defaultLight,
  primary: "0.42 0.188 142.771",
  primaryForeground: "0.985 0 0",
  secondary: "0.543 0.209 160.08",
  accent: "0.666 0.209 141.049",
  chart1: "0.42 0.188 142.771",
  chart2: "0.543 0.209 160.08",
  chart3: "0.666 0.209 141.049",
};

const forestDark: ThemeColors = {
  ...defaultDark,
  primary: "0.589 0.236 142.771",
  primaryForeground: "0.145 0 0",
  secondary: "0.612 0.234 160.08",
  accent: "0.72 0.232 141.049",
  chart1: "0.589 0.236 142.771",
  chart2: "0.612 0.234 160.08",
  chart3: "0.72 0.232 141.049",
};

/**
 * Rose - Pink/rose tones
 */
const roseLight: ThemeColors = {
  ...defaultLight,
  primary: "0.576 0.245 7.599",
  primaryForeground: "0.985 0 0",
  secondary: "0.671 0.213 3.958",
  accent: "0.658 0.247 3.078",
  chart1: "0.576 0.245 7.599",
  chart2: "0.671 0.213 3.958",
  chart3: "0.658 0.247 3.078",
};

const roseDark: ThemeColors = {
  ...defaultDark,
  primary: "0.695 0.245 7.599",
  primaryForeground: "0.145 0 0",
  secondary: "0.746 0.234 3.958",
  accent: "0.724 0.267 3.078",
  chart1: "0.695 0.245 7.599",
  chart2: "0.746 0.234 3.958",
  chart3: "0.724 0.267 3.078",
};

/**
 * Midnight - Deep dark blues
 */
const midnightLight: ThemeColors = {
  ...defaultLight,
  background: "0.972 0 0",
  card: "0.972 0 0",
  primary: "0.269 0.155 263.534",
  primaryForeground: "0.985 0 0",
  secondary: "0.384 0.105 263.534",
  accent: "0.471 0.205 265.372",
  chart1: "0.269 0.155 263.534",
  chart2: "0.384 0.105 263.534",
  chart3: "0.471 0.205 265.372",
};

const midnightDark: ThemeColors = {
  ...defaultDark,
  background: "0.095 0 0",
  card: "0.145 0 0",
  primary: "0.546 0.236 240.391",
  primaryForeground: "0.145 0 0",
  secondary: "0.625 0.214 236.62",
  accent: "0.698 0.248 238.474",
  chart1: "0.546 0.236 240.391",
  chart2: "0.625 0.214 236.62",
  chart3: "0.698 0.248 238.474",
};

/**
 * Catppuccin - Popular dev theme with mauve and blue
 */
const catppuccinLight: ThemeColors = {
  ...defaultLight,
  primary: "0.499 0.155 269.752",
  primaryForeground: "0.985 0 0",
  secondary: "0.588 0.199 12.201",
  accent: "0.666 0.237 253.179",
  chart1: "0.499 0.155 269.752",
  chart2: "0.588 0.199 12.201",
  chart3: "0.666 0.237 253.179",
};

const catppuccinDark: ThemeColors = {
  ...defaultDark,
  primary: "0.644 0.189 269.752",
  primaryForeground: "0.145 0 0",
  secondary: "0.665 0.227 12.201",
  accent: "0.748 0.264 253.179",
  chart1: "0.644 0.189 269.752",
  chart2: "0.665 0.227 12.201",
  chart3: "0.748 0.264 253.179",
};

/**
 * Nord - Cool blue-gray palette
 */
const nordLight: ThemeColors = {
  ...defaultLight,
  primary: "0.507 0.17 241.234",
  primaryForeground: "0.985 0 0",
  secondary: "0.549 0.158 235.682",
  accent: "0.598 0.196 248.501",
  chart1: "0.507 0.17 241.234",
  chart2: "0.549 0.158 235.682",
  chart3: "0.598 0.196 248.501",
};

const nordDark: ThemeColors = {
  ...defaultDark,
  primary: "0.635 0.21 241.234",
  primaryForeground: "0.145 0 0",
  secondary: "0.658 0.192 235.682",
  accent: "0.691 0.228 248.501",
  chart1: "0.635 0.21 241.234",
  chart2: "0.658 0.192 235.682",
  chart3: "0.691 0.228 248.501",
};

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "default",
    name: "Default",
    label: "Default",
    light: defaultLight,
    dark: defaultDark,
    font: "Inter",
    radius: 0.625,
    borderWidth: 1,
    letterSpacing: 0,
  },
  {
    id: "ocean",
    name: "Ocean Breeze",
    label: "Ocean",
    light: oceanLight,
    dark: oceanDark,
    font: "Inter",
    radius: 0.625,
    borderWidth: 1,
    letterSpacing: 0,
  },
  {
    id: "sunset",
    name: "Sunset",
    label: "Sunset",
    light: sunsetLight,
    dark: sunsetDark,
    font: "Inter",
    radius: 0.625,
    borderWidth: 1,
    letterSpacing: 0,
  },
  {
    id: "forest",
    name: "Forest",
    label: "Forest",
    light: forestLight,
    dark: forestDark,
    font: "Inter",
    radius: 0.625,
    borderWidth: 1,
    letterSpacing: 0,
  },
  {
    id: "rose",
    name: "Rose",
    label: "Rose",
    light: roseLight,
    dark: roseDark,
    font: "Inter",
    radius: 0.625,
    borderWidth: 1,
    letterSpacing: 0,
  },
  {
    id: "midnight",
    name: "Midnight",
    label: "Midnight",
    light: midnightLight,
    dark: midnightDark,
    font: "Inter",
    radius: 0.625,
    borderWidth: 1,
    letterSpacing: 0,
  },
  {
    id: "catppuccin",
    name: "Catppuccin",
    label: "Catppuccin",
    light: catppuccinLight,
    dark: catppuccinDark,
    font: "Inter",
    radius: 0.625,
    borderWidth: 1,
    letterSpacing: 0,
  },
  {
    id: "nord",
    name: "Nord",
    label: "Nord",
    light: nordLight,
    dark: nordDark,
    font: "Inter",
    radius: 0.625,
    borderWidth: 1,
    letterSpacing: 0,
  },
  // New richer presets
  {
    id: "brutalist",
    name: "Brutalist",
    label: "Brutalist",
    light: defaultLight,
    dark: defaultDark,
    font: "Courier New",
    radius: 0,
    borderWidth: 2,
    letterSpacing: 0.05,
  },
  {
    id: "soft",
    name: "Soft & Rounded",
    label: "Soft",
    light: {
      ...defaultLight,
      primary: "0.512 0.174 275.423",
      secondary: "0.694 0.127 268.141",
      accent: "0.747 0.209 335.584",
    },
    dark: {
      ...defaultDark,
      primary: "0.67 0.207 275.423",
      secondary: "0.759 0.153 268.141",
      accent: "0.809 0.247 335.584",
    },
    font: "Poppins",
    radius: 1.5,
    borderWidth: 0.5,
    letterSpacing: 0.02,
  },
  {
    id: "editorial",
    name: "Editorial",
    label: "Editorial",
    light: {
      ...defaultLight,
      primary: "0.269 0.155 263.534",
      secondary: "0.543 0.209 160.08",
    },
    dark: {
      ...defaultDark,
      primary: "0.546 0.236 240.391",
      secondary: "0.612 0.234 160.08",
    },
    font: "Playfair Display",
    radius: 0.25,
    borderWidth: 1.5,
    letterSpacing: -0.02,
  },
  {
    id: "geometric",
    name: "Geometric",
    label: "Geometric",
    light: {
      ...defaultLight,
      primary: "0.588 0.199 12.201",
      secondary: "0.499 0.155 269.752",
      accent: "0.666 0.237 253.179",
    },
    dark: {
      ...defaultDark,
      primary: "0.665 0.227 12.201",
      secondary: "0.644 0.189 269.752",
      accent: "0.748 0.264 253.179",
    },
    font: "Montserrat",
    radius: 0,
    borderWidth: 1,
    letterSpacing: 0.05,
  },
];
