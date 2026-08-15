import {
  COLOR_TOKEN_KEYS,
  type ColorTokenKey,
  type ThemeAxes,
  type ThemeColors,
  type ThemeDocument,
  THEME_SCHEMA_VERSION,
  cssVarToToken,
  createDefaultTheme,
  ensureThemeColors,
  tokenToCssVar,
} from "./schema";

export type ImportDiagnostic = {
  severity: "error" | "warning" | "info";
  message: string;
  token?: string;
};

export type CssImportResult = {
  theme: ThemeDocument;
  diagnostics: ImportDiagnostic[];
};

const COLOR_TOKEN_SET = new Set<string>(COLOR_TOKEN_KEYS);

function formatOklchCss(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("oklch(")) return trimmed;
  return `oklch(${trimmed})`;
}

function stripOklchWrapper(value: string): string {
  const m = value.trim().match(/^oklch\(\s*(.+)\s*\)$/i);
  return m ? m[1].trim() : value.trim();
}

function parseDeclarations(block: string): Record<string, string> {
  const out: Record<string, string> = {};
  const re = /(--[\w-]+)\s*:\s*([^;]+);/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(block)) !== null) {
    out[match[1]] = match[2].trim();
  }
  return out;
}

function extractBlock(css: string, selector: string): string | null {
  // Match :root { ... } or .dark { ... } (non-greedy, nested-brace naive)
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`, "m");
  const m = css.match(re);
  return m ? m[1] : null;
}

function applyColorDecls(
  decls: Record<string, string>,
  target: ThemeColors,
  diagnostics: ImportDiagnostic[],
  mode: string,
): void {
  for (const [cssVar, raw] of Object.entries(decls)) {
    if (!cssVar.startsWith("--") || cssVar === "--radius") continue;
    if (
      cssVar === "--border-width" ||
      cssVar === "--letter-spacing" ||
      cssVar === "--font-dynamic"
    ) {
      continue;
    }
    const token = cssVarToToken(cssVar);
    if (!COLOR_TOKEN_SET.has(token)) {
      diagnostics.push({
        severity: "warning",
        message: `Unknown token ${cssVar} in ${mode} ignored`,
        token: cssVar,
      });
      continue;
    }
    const value = stripOklchWrapper(raw);
    // Detect hard-coded non-oklch colors
    if (/^(#|rgb|hsl|hwb)/i.test(raw.trim()) && !/^oklch/i.test(raw.trim())) {
      diagnostics.push({
        severity: "warning",
        message: `${cssVar} uses non-OKLCH value "${raw}" — stored as-is; prefer oklch()`,
        token,
      });
      target[token as ColorTokenKey] = raw.trim();
    } else {
      target[token as ColorTokenKey] = value;
    }
  }
}

function applyAxes(
  decls: Record<string, string>,
  axes: ThemeAxes,
  diagnostics: ImportDiagnostic[],
): void {
  if (decls["--radius"]) {
    const m = decls["--radius"].match(/([\d.]+)/);
    if (m) axes.radius = Number.parseFloat(m[1]);
  }
  if (decls["--border-width"]) {
    const m = decls["--border-width"].match(/([\d.]+)/);
    if (m) axes.borderWidth = Number.parseFloat(m[1]);
  }
  if (decls["--letter-spacing"]) {
    const m = decls["--letter-spacing"].match(/(-?[\d.]+)/);
    if (m) axes.letterSpacing = Number.parseFloat(m[1]);
  }
  if (decls["--font-dynamic"] || decls["--font-sans"]) {
    const raw = decls["--font-dynamic"] ?? decls["--font-sans"];
    const fontMatch = raw.match(/["']?([^"',]+)["']?/);
    if (fontMatch) {
      axes.font = fontMatch[1].trim();
      diagnostics.push({
        severity: "info",
        message: `Detected font "${axes.font}"`,
      });
    }
  }
}

/**
 * Parse Tailwind v4 / shadcn theme CSS with :root and .dark blocks.
 */
export function parseThemeCss(css: string): CssImportResult {
  const diagnostics: ImportDiagnostic[] = [];
  const theme = createDefaultTheme();

  if (!css.trim()) {
    diagnostics.push({ severity: "error", message: "Empty CSS input" });
    return { theme, diagnostics };
  }

  const rootBlock = extractBlock(css, ":root");
  const darkBlock = extractBlock(css, ".dark");

  if (!rootBlock && !darkBlock) {
    // Try treating the whole string as a declaration list
    const decls = parseDeclarations(css);
    if (Object.keys(decls).length === 0) {
      diagnostics.push({
        severity: "error",
        message: "No :root or .dark blocks found, and no CSS variables detected",
      });
      return { theme, diagnostics };
    }
    applyColorDecls(decls, theme.light, diagnostics, ":root");
    applyAxes(decls, theme, diagnostics);
    diagnostics.push({
      severity: "warning",
      message: "Only a single palette found — dark mode left at defaults",
    });
    return { theme, diagnostics };
  }

  if (rootBlock) {
    const decls = parseDeclarations(rootBlock);
    applyColorDecls(decls, theme.light, diagnostics, ":root");
    applyAxes(decls, theme, diagnostics);
  } else {
    diagnostics.push({
      severity: "warning",
      message: "Missing :root block — light mode left at defaults",
    });
  }

  if (darkBlock) {
    const decls = parseDeclarations(darkBlock);
    applyColorDecls(decls, theme.dark, diagnostics, ".dark");
  } else {
    diagnostics.push({
      severity: "warning",
      message: "Missing .dark block — dark mode left at defaults",
    });
  }

  // Missing known tokens
  for (const key of COLOR_TOKEN_KEYS) {
    const cssVar = tokenToCssVar(key);
    if (rootBlock && !rootBlock.includes(cssVar)) {
      diagnostics.push({
        severity: "info",
        message: `Light mode missing ${cssVar} — using default`,
        token: key,
      });
    }
  }

  theme.version = THEME_SCHEMA_VERSION;
  theme.light = ensureThemeColors(theme.light);
  theme.dark = ensureThemeColors(theme.dark);

  return { theme, diagnostics };
}

function serializePalette(colors: ThemeColors, axes: ThemeAxes, includeAxes: boolean): string {
  const lines: string[] = [];
  for (const key of COLOR_TOKEN_KEYS) {
    lines.push(`  ${tokenToCssVar(key)}: ${formatOklchCss(colors[key])};`);
  }
  if (includeAxes) {
    lines.push(`  --radius: ${axes.radius}rem;`);
    lines.push(`  --border-width: ${axes.borderWidth}px;`);
    lines.push(`  --letter-spacing: ${axes.letterSpacing}em;`);
  }
  return lines.join("\n");
}

/** Serialize a theme document to Tailwind v4-compatible CSS. */
export function serializeThemeCss(theme: ThemeDocument): string {
  return `:root {
${serializePalette(theme.light, theme, true)}
}

.dark {
${serializePalette(theme.dark, theme, false)}
}
`;
}

/** Apply palette colors as CSS variables on an element (mode-aware). */
export function applyPaletteToElement(el: HTMLElement, colors: ThemeColors, axes: ThemeAxes): void {
  for (const key of COLOR_TOKEN_KEYS) {
    const value = colors[key];
    const cssValue = value.trim().startsWith("oklch(") ? value : `oklch(${value})`;
    el.style.setProperty(tokenToCssVar(key), cssValue);
  }
  el.style.setProperty("--radius", `${axes.radius}rem`);
  el.style.setProperty("--border-width", `${axes.borderWidth}px`);
  el.style.setProperty("--letter-spacing", `${axes.letterSpacing}em`);
}

/** Clear previously applied inline theme vars so .dark class rules can take effect when needed. */
export function clearInlinePalette(el: HTMLElement): void {
  for (const key of COLOR_TOKEN_KEYS) {
    el.style.removeProperty(tokenToCssVar(key));
  }
}
