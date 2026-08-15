import {
  COLOR_TOKEN_KEYS,
  createDefaultTheme,
  cssVarToToken,
  ensureThemeColors,
  type ThemeColors,
  type ThemeDocument,
  tokenToCssVar,
} from "./schema";
import type { ImportDiagnostic } from "./css-codec";

export type RegistryThemeItem = {
  name: string;
  type: "registry:theme";
  title?: string;
  description?: string;
  cssVars: {
    theme?: Record<string, string>;
    light: Record<string, string>;
    dark: Record<string, string>;
  };
};

function paletteToCssVars(colors: ThemeColors): Record<string, string> {
  const out: Record<string, string> = {};
  for (const key of COLOR_TOKEN_KEYS) {
    const cssName = tokenToCssVar(key).replace(/^--/, "");
    const value = colors[key].trim();
    out[cssName] = value.startsWith("oklch(") ? value : `oklch(${value})`;
  }
  return out;
}

export function serializeRegistryTheme(
  theme: ThemeDocument,
  options?: { name?: string; title?: string; description?: string },
): RegistryThemeItem {
  return {
    name: options?.name ?? "theme-lab",
    type: "registry:theme",
    title: options?.title ?? "Theme Lab Export",
    description:
      options?.description ?? "Semantic OKLCH theme exported from shadcn Theme Lab (light + dark).",
    cssVars: {
      theme: {
        radius: `${theme.radius}rem`,
      },
      light: paletteToCssVars(theme.light),
      dark: paletteToCssVars(theme.dark),
    },
  };
}

export function parseRegistryTheme(input: unknown): {
  theme: ThemeDocument | null;
  diagnostics: ImportDiagnostic[];
} {
  const diagnostics: ImportDiagnostic[] = [];
  if (!input || typeof input !== "object") {
    return {
      theme: null,
      diagnostics: [{ severity: "error", message: "Invalid JSON: expected an object" }],
    };
  }

  const obj = input as Record<string, unknown>;
  if (obj.type && obj.type !== "registry:theme") {
    diagnostics.push({
      severity: "warning",
      message: `Unexpected type "${String(obj.type)}" — expected registry:theme`,
    });
  }

  const cssVars = obj.cssVars as
    | {
        light?: Record<string, string>;
        dark?: Record<string, string>;
        theme?: Record<string, string>;
      }
    | undefined;

  if (!cssVars) {
    return {
      theme: null,
      diagnostics: [{ severity: "error", message: "Missing cssVars on registry item" }],
    };
  }

  const theme = createDefaultTheme();

  const mapMode = (src: Record<string, string> | undefined, target: ThemeColors, label: string) => {
    if (!src) {
      diagnostics.push({
        severity: "warning",
        message: `Missing cssVars.${label} — using defaults`,
      });
      return;
    }
    for (const [name, value] of Object.entries(src)) {
      const token = cssVarToToken(name.startsWith("--") ? name : `--${name}`);
      if (token in target) {
        const stripped = value
          .replace(/^oklch\(/i, "")
          .replace(/\)$/, "")
          .trim();
        (target as Record<string, string>)[token] = stripped;
      }
    }
  };

  mapMode(cssVars.light, theme.light, "light");
  mapMode(cssVars.dark, theme.dark, "dark");

  if (cssVars.theme?.radius) {
    const m = String(cssVars.theme.radius).match(/([\d.]+)/);
    if (m) theme.radius = Number.parseFloat(m[1]);
  }

  theme.light = ensureThemeColors(theme.light);
  theme.dark = ensureThemeColors(theme.dark);

  return { theme, diagnostics };
}

export function serializeRegistryThemeJson(
  theme: ThemeDocument,
  options?: { name?: string; title?: string; description?: string },
): string {
  return `${JSON.stringify(serializeRegistryTheme(theme, options), null, 2)}\n`;
}
