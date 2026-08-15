import {
  createDefaultTheme,
  ensureThemeDocument,
  THEME_SCHEMA_VERSION,
  type ThemeDocument,
} from "./schema";

const STORAGE_KEY = "shadcn-theme-lab";
const LEGACY_STORAGE_KEY = "shadcn-theme";

/** Compress theme to a compact JSON-friendly payload for URL sharing. */
export function encodeThemeForUrl(theme: ThemeDocument): string {
  const payload = {
    v: THEME_SCHEMA_VERSION,
    l: theme.light,
    d: theme.dark,
    r: theme.radius,
    f: theme.font,
    b: theme.borderWidth,
    s: theme.letterSpacing,
  };
  const json = JSON.stringify(payload);
  // base64url
  if (typeof btoa === "function") {
    const b64 = btoa(unescape(encodeURIComponent(json)));
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  // Node
  return Buffer.from(json, "utf8").toString("base64url");
}

export function decodeThemeFromUrl(encoded: string): ThemeDocument | null {
  try {
    let json: string;
    if (typeof atob === "function") {
      const b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
      const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
      json = decodeURIComponent(escape(atob(b64 + pad)));
    } else {
      json = Buffer.from(encoded, "base64url").toString("utf8");
    }
    const payload = JSON.parse(json) as Record<string, unknown>;
    return ensureThemeDocument({
      version: payload.v ?? THEME_SCHEMA_VERSION,
      light: payload.l,
      dark: payload.d,
      radius: payload.r,
      font: payload.f,
      borderWidth: payload.b,
      letterSpacing: payload.s,
    });
  } catch {
    return null;
  }
}

const MAX_URL_THEME_CHARS = 6000;

export function buildShareUrl(theme: ThemeDocument, baseUrl?: string): string | null {
  const encoded = encodeThemeForUrl(theme);
  if (encoded.length > MAX_URL_THEME_CHARS) return null;
  const origin =
    baseUrl ??
    (typeof window !== "undefined" ? window.location.origin + window.location.pathname : "");
  const url = new URL(origin || "http://localhost/");
  url.searchParams.set("theme", encoded);
  return url.toString();
}

export function loadThemeFromStorage(): ThemeDocument | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return ensureThemeDocument(JSON.parse(raw));
    }
    // Migrate legacy single-palette storage
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy) as Record<string, unknown>;
      const migrated = ensureThemeDocument({
        light: parsed.colors,
        dark: undefined,
        radius: parsed.radius,
        font: parsed.font,
        borderWidth: parsed.borderWidth,
        letterSpacing: parsed.letterSpacing,
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      return migrated;
    }
  } catch {
    return null;
  }
  return null;
}

export function saveThemeToStorage(theme: ThemeDocument): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
}

export function clearThemeStorage(): void {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
}

export function themeFromSearchParams(search: string): ThemeDocument | null {
  try {
    const params = new URLSearchParams(search);
    const encoded = params.get("theme");
    if (!encoded) return null;
    return decodeThemeFromUrl(encoded);
  } catch {
    return null;
  }
}

export { STORAGE_KEY, createDefaultTheme };
