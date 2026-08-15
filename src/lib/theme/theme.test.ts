import { describe, expect, it } from "vitest";
import { hexToOklch, oklchToHex } from "./utils";
import { contrastRatio, contrastLevel, parseOklch } from "./contrast";
import { parseThemeCss, serializeThemeCss } from "./css-codec";
import { parseRegistryTheme, serializeRegistryTheme } from "./registry-codec";
import { createDefaultTheme, ensureThemeDocument } from "./schema";
import { decodeThemeFromUrl, encodeThemeForUrl } from "./url-state";
import { auditTheme } from "./audit";

describe("oklch conversion", () => {
  it("round-trips near-neutral hex", () => {
    const hex = "#336699";
    const oklch = hexToOklch(hex);
    const back = oklchToHex(oklch);
    expect(back).toMatch(/^#[0-9a-f]{6}$/i);
    // Allow small quantization error
    const parse = (h: string) => [
      Number.parseInt(h.slice(1, 3), 16),
      Number.parseInt(h.slice(3, 5), 16),
      Number.parseInt(h.slice(5, 7), 16),
    ];
    const [r1, g1, b1] = parse(hex.toLowerCase());
    const [r2, g2, b2] = parse(back.toLowerCase());
    expect(Math.abs(r1 - r2)).toBeLessThan(8);
    expect(Math.abs(g1 - g2)).toBeLessThan(8);
    expect(Math.abs(b1 - b2)).toBeLessThan(8);
  });
});

describe("contrast", () => {
  it("parses oklch with alpha", () => {
    expect(parseOklch("1 0 0 / 10%")).toEqual({
      l: 1,
      c: 0,
      h: 0,
      alpha: 0.1,
    });
  });

  it("scores black on white as AAA", () => {
    const ratio = contrastRatio("0.145 0 0", "1 0 0");
    expect(ratio).toBeGreaterThan(7);
    expect(contrastLevel(ratio!)).toBe("AAA");
  });
});

describe("css codec", () => {
  it("round-trips default theme CSS", () => {
    const theme = createDefaultTheme();
    const css = serializeThemeCss(theme);
    const { theme: parsed, diagnostics } = parseThemeCss(css);
    expect(diagnostics.some((d) => d.severity === "error")).toBe(false);
    expect(parsed.light.background).toBe(theme.light.background);
    expect(parsed.dark.foreground).toBe(theme.dark.foreground);
    expect(parsed.radius).toBe(theme.radius);
  });

  it("reports missing blocks", () => {
    const { diagnostics } = parseThemeCss("body { color: red; }");
    expect(diagnostics.some((d) => d.severity === "error")).toBe(true);
  });
});

describe("registry codec", () => {
  it("round-trips registry theme JSON", () => {
    const theme = createDefaultTheme();
    theme.light.primary = "0.5 0.2 250";
    const item = serializeRegistryTheme(theme, { name: "test" });
    const { theme: parsed, diagnostics } = parseRegistryTheme(item);
    expect(diagnostics.some((d) => d.severity === "error")).toBe(false);
    expect(parsed?.light.primary).toContain("0.5");
    expect(parsed?.radius).toBe(theme.radius);
  });
});

describe("url state", () => {
  it("encodes and decodes theme", () => {
    const theme = createDefaultTheme();
    theme.font = "Poppins";
    const encoded = encodeThemeForUrl(theme);
    const decoded = decodeThemeFromUrl(encoded);
    expect(decoded?.font).toBe("Poppins");
    expect(decoded?.light.primary).toBe(theme.light.primary);
  });
});

describe("schema migration", () => {
  it("migrates legacy single-palette shape", () => {
    const doc = ensureThemeDocument({
      colors: { primary: "0.4 0.1 200" },
      radius: 1,
    });
    expect(doc.version).toBe(1);
    expect(doc.light.primary).toBe("0.4 0.1 200");
    expect(doc.dark.background).toBeTruthy();
  });
});

describe("audit", () => {
  it("returns findings including disclaimer", () => {
    const findings = auditTheme(createDefaultTheme());
    expect(findings.length).toBeGreaterThan(0);
    expect(findings.some((f) => f.id === "disclaimer")).toBe(true);
  });
});
