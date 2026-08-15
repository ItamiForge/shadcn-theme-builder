/**
 * WCAG contrast utilities for OKLCH theme tokens.
 * Relative luminance follows WCAG 2.x sRGB pipeline.
 */

export type ParsedOklch = {
  l: number;
  c: number;
  h: number;
  alpha: number;
};

export function parseOklch(value: string): ParsedOklch | null {
  const trimmed = value.trim();
  // Supports "L C H", "L C H / A%", "oklch(L C H)", "oklch(L C H / A)"
  const withoutFn = trimmed
    .replace(/^oklch\(/i, "")
    .replace(/\)$/, "")
    .trim();
  const alphaSplit = withoutFn.split("/");
  const parts = alphaSplit[0].trim().split(/\s+/);
  if (parts.length < 3) return null;

  const l = Number.parseFloat(parts[0]);
  const c = Number.parseFloat(parts[1]);
  const h = Number.parseFloat(parts[2]);
  if (![l, c, h].every((n) => Number.isFinite(n))) return null;

  let alpha = 1;
  if (alphaSplit[1]) {
    const aRaw = alphaSplit[1].trim();
    alpha = aRaw.endsWith("%") ? Number.parseFloat(aRaw) / 100 : Number.parseFloat(aRaw);
    if (!Number.isFinite(alpha)) alpha = 1;
  }

  return { l, c, h, alpha };
}

function oklchToLinearSrgb(l: number, c: number, h: number): [number, number, number] {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291486575 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  const r = +4.0767416621 * l3 - 3.3077363322 * m3 + 0.2309101289 * s3;
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193761 * s3;
  const bl = -0.004107344528 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  return [r, g, bl];
}

function linearToSrgbChannel(c: number): number {
  const clamped = Math.max(0, Math.min(1, c));
  return clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
}

/** Returns true if converting OKLCH → sRGB would clip outside [0,1] (approx P3/wide gamut). */
export function isOutsideSrgb(value: string): boolean {
  const parsed = parseOklch(value);
  if (!parsed) return false;
  const [r, g, b] = oklchToLinearSrgb(parsed.l, parsed.c, parsed.h);
  const EPS = 0.02;
  return r < -EPS || g < -EPS || b < -EPS || r > 1 + EPS || g > 1 + EPS || b > 1 + EPS;
}

function srgbChannelToLinear(c: number): number {
  const v = Math.max(0, Math.min(1, c));
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

export function relativeLuminanceFromOklch(value: string): number | null {
  const parsed = parseOklch(value);
  if (!parsed) return null;
  const [lr, lg, lb] = oklchToLinearSrgb(parsed.l, parsed.c, parsed.h);
  const r = srgbChannelToLinear(linearToSrgbChannel(lr));
  const g = srgbChannelToLinear(linearToSrgbChannel(lg));
  const b = srgbChannelToLinear(linearToSrgbChannel(lb));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Composite foreground over background when fg has alpha < 1.
 * Approximates using relative luminances (sufficient for token audit warnings).
 */
export function contrastRatio(foreground: string, background: string): number | null {
  const fg = parseOklch(foreground);
  const bg = parseOklch(background);
  if (!fg || !bg) return null;

  let fgLum = relativeLuminanceFromOklch(foreground);
  const bgLum = relativeLuminanceFromOklch(background);
  if (fgLum === null || bgLum === null) return null;

  if (fg.alpha < 1) {
    // Blend luminances as a rough alpha composite
    fgLum = fg.alpha * fgLum + (1 - fg.alpha) * bgLum;
  }

  const lighter = Math.max(fgLum, bgLum);
  const darker = Math.min(fgLum, bgLum);
  return (lighter + 0.05) / (darker + 0.05);
}

export type ContrastLevel = "AAA" | "AA" | "fail";

export function contrastLevel(ratio: number, largeText = false): ContrastLevel {
  if (largeText) {
    if (ratio >= 4.5) return "AAA";
    if (ratio >= 3) return "AA";
    return "fail";
  }
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "fail";
}
