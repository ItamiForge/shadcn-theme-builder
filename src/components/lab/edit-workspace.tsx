"use client";

import { COLOR_GROUPS } from "@/lib/theme/schema";
import { useTheme } from "@/lib/theme/theme-context";
import { oklchToHex } from "@/lib/theme/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { contrastRatio, contrastLevel } from "@/lib/theme/contrast";
import { CONTRAST_PAIRS } from "@/lib/theme/schema";

export function EditWorkspace() {
  const { colors, mode, theme } = useTheme();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Theme workspace</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Import or craft a semantic shadcn theme, then verify it in Components, Blocks, and Audit.
          Open the drawer to edit the <strong>{mode}</strong> palette independently from{" "}
          {mode === "light" ? "dark" : "light"}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Radius</CardDescription>
            <CardTitle>{theme.radius}rem</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Font</CardDescription>
            <CardTitle className="truncate">{theme.font}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Border</CardDescription>
            <CardTitle>{theme.borderWidth}px</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Letter spacing</CardDescription>
            <CardTitle>{theme.letterSpacing}em</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Active palette ({mode})</h2>
        <div className="space-y-6">
          {COLOR_GROUPS.map((group) => (
            <div key={group.id}>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">{group.label}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {group.keys.map((key) => {
                  let hex = "#000";
                  try {
                    hex = oklchToHex(colors[key]);
                  } catch {
                    // ignore
                  }
                  return (
                    <div key={key} className="rounded-lg border overflow-hidden">
                      <div className="h-14" style={{ background: `oklch(${colors[key]})` }} />
                      <div className="p-2 text-[10px] font-mono leading-tight">
                        <div className="font-semibold truncate">{key}</div>
                        <div className="text-muted-foreground truncate">{hex}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Quick contrast ({mode})</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {CONTRAST_PAIRS.map((pair) => {
            const ratio = contrastRatio(colors[pair.fg], colors[pair.bg]);
            const level = ratio ? contrastLevel(ratio, pair.largeText) : "fail";
            return (
              <Card key={`${pair.fg}-${pair.bg}`}>
                <CardContent className="flex items-center justify-between gap-3 p-3">
                  <div
                    className="rounded-md px-3 py-2 text-sm font-medium border"
                    style={{
                      background: `oklch(${colors[pair.bg]})`,
                      color: `oklch(${colors[pair.fg]})`,
                    }}
                  >
                    {pair.label}
                  </div>
                  <div className="text-right text-xs font-mono">
                    <div>{ratio ? `${ratio.toFixed(2)}:1` : "n/a"}</div>
                    <div
                      className={
                        level === "fail"
                          ? "text-destructive"
                          : level === "AA"
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-muted-foreground"
                      }
                    >
                      {level}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
