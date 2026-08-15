"use client";

import Link from "next/link";
import { auditTheme, summarizeAudit, type AuditFinding } from "@/lib/theme/audit";
import { useTheme } from "@/lib/theme/theme-context";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function severityClass(severity: AuditFinding["severity"]) {
  if (severity === "error") return "bg-destructive/10 text-destructive border-destructive/30";
  if (severity === "warning")
    return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30";
  return "bg-muted text-muted-foreground border-border";
}

export function AuditPanel() {
  const { theme, mode, setMode } = useTheme();
  const findings = auditTheme(theme);
  const summary = summarizeAudit(findings);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Theme audit</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Heuristic checks for contrast, focus ring visibility, and sRGB gamut clipping. Automated
          findings are not an accessibility guarantee — verify keyboard and screen-reader flows
          manually.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Errors</CardDescription>
            <CardTitle className="text-3xl text-destructive">{summary.errors}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Warnings</CardDescription>
            <CardTitle className="text-3xl">{summary.warnings}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Info</CardDescription>
            <CardTitle className="text-3xl text-muted-foreground">{summary.infos}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <ul className="space-y-3">
        {findings.map((finding) => (
          <li key={finding.id}>
            <Card className={cn("border", severityClass(finding.severity))}>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {finding.severity}
                  </Badge>
                  <Badge variant="secondary">{finding.category}</Badge>
                  {finding.mode && (
                    <button
                      type="button"
                      className="text-xs underline underline-offset-2"
                      onClick={() => setMode(finding.mode!)}
                    >
                      Preview {finding.mode}
                      {finding.mode === mode ? " (active)" : ""}
                    </button>
                  )}
                </div>
                <CardTitle className="text-base">{finding.title}</CardTitle>
                <CardDescription className="text-inherit/80">{finding.detail}</CardDescription>
              </CardHeader>
              {(finding.token || finding.relatedTokens) && (
                <CardContent className="pt-0 text-xs">
                  {finding.token && (
                    <Link
                      href={`/?token=${finding.token}`}
                      className="underline underline-offset-2 mr-3"
                    >
                      Edit token: {finding.token}
                    </Link>
                  )}
                  {finding.ratio !== undefined && (
                    <span className="font-mono">ratio {finding.ratio.toFixed(2)}:1</span>
                  )}
                </CardContent>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
