import { contrastLevel, contrastRatio, isOutsideSrgb } from "./contrast";
import { COLOR_TOKEN_KEYS, CONTRAST_PAIRS, type ThemeDocument, type ThemeMode } from "./schema";

export type AuditSeverity = "error" | "warning" | "info";

export type AuditFinding = {
  id: string;
  severity: AuditSeverity;
  category: "contrast" | "gamut" | "token" | "focus" | "general";
  title: string;
  detail: string;
  mode?: ThemeMode;
  token?: string;
  relatedTokens?: string[];
  ratio?: number;
};

function auditMode(theme: ThemeDocument, mode: ThemeMode): AuditFinding[] {
  const findings: AuditFinding[] = [];
  const colors = theme[mode];

  for (const pair of CONTRAST_PAIRS) {
    const ratio = contrastRatio(colors[pair.fg], colors[pair.bg]);
    if (ratio === null) {
      findings.push({
        id: `${mode}-contrast-parse-${pair.fg}-${pair.bg}`,
        severity: "warning",
        category: "contrast",
        title: `Could not parse ${pair.label}`,
        detail: `Failed to parse OKLCH for ${pair.fg} on ${pair.bg}`,
        mode,
        token: pair.fg,
        relatedTokens: [pair.fg, pair.bg],
      });
      continue;
    }

    const level = contrastLevel(ratio, pair.largeText);
    if (level === "fail") {
      findings.push({
        id: `${mode}-contrast-fail-${pair.fg}-${pair.bg}`,
        severity: "error",
        category: "contrast",
        title: `${pair.label} fails WCAG AA`,
        detail: `Contrast ${ratio.toFixed(2)}:1 is below ${pair.largeText ? "3:1" : "4.5:1"} for ${mode} mode.`,
        mode,
        token: pair.fg,
        relatedTokens: [pair.fg, pair.bg],
        ratio,
      });
    } else if (level === "AA") {
      findings.push({
        id: `${mode}-contrast-aa-${pair.fg}-${pair.bg}`,
        severity: "info",
        category: "contrast",
        title: `${pair.label} meets AA (${ratio.toFixed(2)}:1)`,
        detail: `Passes WCAG AA but not AAA in ${mode} mode.`,
        mode,
        token: pair.fg,
        relatedTokens: [pair.fg, pair.bg],
        ratio,
      });
    }
  }

  for (const key of COLOR_TOKEN_KEYS) {
    if (isOutsideSrgb(colors[key])) {
      findings.push({
        id: `${mode}-gamut-${key}`,
        severity: "warning",
        category: "gamut",
        title: `${key} may be outside sRGB`,
        detail: `The OKLCH value for ${key} in ${mode} mode may clip when converted to sRGB. Preview on wide-gamut displays if intentional.`,
        mode,
        token: key,
      });
    }
  }

  // Focus ring vs background
  const ringRatio = contrastRatio(colors.ring, colors.background);
  if (ringRatio !== null && ringRatio < 3) {
    findings.push({
      id: `${mode}-focus-ring`,
      severity: "warning",
      category: "focus",
      title: "Focus ring may be hard to see",
      detail: `ring vs background contrast is ${ringRatio.toFixed(2)}:1 (aim for ≥3:1 for non-text UI).`,
      mode,
      token: "ring",
      relatedTokens: ["ring", "background"],
      ratio: ringRatio,
    });
  }

  return findings;
}

export function auditTheme(theme: ThemeDocument): AuditFinding[] {
  const findings: AuditFinding[] = [...auditMode(theme, "light"), ...auditMode(theme, "dark")];

  findings.push({
    id: "disclaimer",
    severity: "info",
    category: "general",
    title: "Automated checks are not an accessibility guarantee",
    detail:
      "Contrast and gamut heuristics catch common token issues. Keyboard behavior, accessible names, and screen-reader flows still need manual and tool-assisted testing.",
  });

  // Sort: errors, warnings, info
  const order: Record<AuditSeverity, number> = { error: 0, warning: 1, info: 2 };
  return findings.sort((a, b) => order[a.severity] - order[b.severity]);
}

export function summarizeAudit(findings: AuditFinding[]) {
  return {
    errors: findings.filter((f) => f.severity === "error").length,
    warnings: findings.filter((f) => f.severity === "warning").length,
    infos: findings.filter((f) => f.severity === "info").length,
  };
}
