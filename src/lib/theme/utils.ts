/**
 * Color conversion and font loading helpers.
 */

/**
 * Convert Hex color to OKLch color space
 * Returns OKLch string: "lightness chroma hue"
 */
export function hexToOklch(hex: string): string {
  let r = 0,
    g = 0,
    b = 0;

  if (hex.length === 4) {
    r = parseInt("0x" + hex[1] + hex[1]) / 255;
    g = parseInt("0x" + hex[2] + hex[2]) / 255;
    b = parseInt("0x" + hex[3] + hex[3]) / 255;
  } else if (hex.length === 7) {
    r = parseInt("0x" + hex[1] + hex[2]) / 255;
    g = parseInt("0x" + hex[3] + hex[4]) / 255;
    b = parseInt("0x" + hex[5] + hex[6]) / 255;
  }

  r = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  g = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  b = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808649671 * s_;

  const C = Math.sqrt(a * a + b_ * b_);
  let h = Math.atan2(b_, a) * (180 / Math.PI);
  if (h < 0) h += 360;

  return `${L.toFixed(3)} ${C.toFixed(3)} ${h.toFixed(1)}`;
}

/**
 * Convert OKLch color to Hex
 * Input: OKLch string "lightness chroma hue" (alpha ignored)
 */
export function oklchToHex(oklch: string): string {
  const withoutAlpha = oklch.split("/")[0].trim();
  const parts = withoutAlpha
    .replace(/^oklch\(/i, "")
    .replace(/\)$/, "")
    .trim()
    .split(/\s+/);
  const L = parseFloat(parts[0]);
  const C = parseFloat(parts[1]);
  const h = parseFloat(parts[2]);

  const hRad = (h * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291486575 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const r = +4.0767416621 * l - 3.3077363322 * m + 0.2309101289 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193761 * s;
  const b_ = -0.004107344528 * l - 0.7034186147 * m + 1.707614701 * s;

  const rSrgb = r <= 0.0031308 ? 12.92 * r : 1.055 * Math.pow(Math.max(r, 0), 1 / 2.4) - 0.055;
  const gSrgb = g <= 0.0031308 ? 12.92 * g : 1.055 * Math.pow(Math.max(g, 0), 1 / 2.4) - 0.055;
  const bSrgb = b_ <= 0.0031308 ? 12.92 * b_ : 1.055 * Math.pow(Math.max(b_, 0), 1 / 2.4) - 0.055;

  const rInt = Math.round(Math.max(0, Math.min(1, rSrgb)) * 255);
  const gInt = Math.round(Math.max(0, Math.min(1, gSrgb)) * 255);
  const bInt = Math.round(Math.max(0, Math.min(1, bSrgb)) * 255);

  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(rInt)}${toHex(gInt)}${toHex(bInt)}`;
}

/** System / local fonts that do not need Google Fonts */
export const SYSTEM_FONTS = new Set(["Courier New", "Georgia", "system-ui", "ui-sans-serif"]);

/**
 * Map of font names to Google Fonts URLs
 */
export const GOOGLE_FONTS_MAP: Record<string, string> = {
  Inter: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  Roboto:
    "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap",
  "Open Sans":
    "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap",
  "Playfair Display":
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800;900&display=swap",
  Montserrat:
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&display=swap",
  Poppins: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap",
  Lato: "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap",
  Geist: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap",
  "Space Grotesk":
    "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
  "IBM Plex Mono":
    "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap",
  "DM Sans":
    "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap",
  Fraunces:
    "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&display=swap",
  Literata:
    "https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,200..900&display=swap",
  Outfit: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap",
  "Cormorant Garamond":
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap",
  "JetBrains Mono":
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap",
  "Source Serif 4":
    "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,200..900&display=swap",
};

export const AVAILABLE_FONTS = [
  ...Object.keys(GOOGLE_FONTS_MAP),
  "Courier New",
  "Georgia",
  "system-ui",
];

/**
 * Load a Google Font dynamically and apply it to the document
 */
export function loadGoogleFont(fontName: string): void {
  if (typeof document === "undefined") return;

  const fontUrl = GOOGLE_FONTS_MAP[fontName];
  if (fontUrl) {
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`) as HTMLLinkElement;
    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = fontUrl;
      document.head.appendChild(link);
    }
  }

  const stack = SYSTEM_FONTS.has(fontName)
    ? `"${fontName}", ui-monospace, monospace`
    : `"${fontName}", sans-serif`;
  document.documentElement.style.setProperty("--font-dynamic", stack);
}
