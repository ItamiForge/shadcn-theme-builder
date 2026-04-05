"use client";

import React from "react";
import { useTheme } from "@/lib/theme/theme-context";
import { SiteHeader } from "@/components/site-header";
import { ThemeDrawer } from "@/components/theme-builder/theme-drawer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { oklchToHex } from "@/lib/theme/utils";

const COLOR_GROUPS = {
  Base: ["background", "foreground", "card", "cardForeground", "popover", "popoverForeground"],
  Brand: [
    "primary",
    "primaryForeground",
    "secondary",
    "secondaryForeground",
    "accent",
    "accentForeground",
  ],
  UI: [
    "border",
    "input",
    "ring",
    "muted",
    "mutedForeground",
    "destructive",
    "destructiveForeground",
  ],
  Charts: ["chart1", "chart2", "chart3", "chart4", "chart5"],
} as const;

function formatColorName(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

export default function ColorsPage() {
  const { colors, mode } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <SidebarProvider>
      <SidebarInset
        className="transition-[padding-right] duration-300 ease-in-out"
        style={{ paddingRight: "var(--drawer-width, 0px)" }}
      >
        <SiteHeader />

        <main className="p-4 sm:p-6 lg:p-10 space-y-12 max-w-7xl">
          {/* Page header */}
          <div className="space-y-1">
            <h1 className="text-3xl font-bold sm:text-4xl">Color Palette</h1>
            <p className="text-muted-foreground">
              Current mode:{" "}
              <span className="font-semibold text-foreground capitalize">{mode}</span>
            </p>
          </div>

          {/* Color groups */}
          {(Object.entries(COLOR_GROUPS) as [string, readonly string[]][]).map(
            ([groupName, colorKeys]) => (
              <section key={groupName} className="space-y-4">
                <h2 className="text-xl font-semibold border-b pb-2">{groupName} Colors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {colorKeys.map((key) => {
                    const oklch = colors[key as keyof typeof colors];
                    const hex = oklchToHex(oklch);
                    return (
                      <article key={key} className="border rounded-lg overflow-hidden">
                        <div
                          className="h-20 w-full"
                          style={{ backgroundColor: `oklch(${oklch})` }}
                          aria-hidden="true"
                        />
                        <div className="p-3 space-y-1.5">
                          <p className="font-semibold text-sm">{formatColorName(key)}</p>
                          <dl className="space-y-0.5 font-mono text-xs text-muted-foreground">
                            <div className="flex gap-1">
                              <dt className="font-semibold text-foreground">HEX</dt>
                              <dd>{hex}</dd>
                            </div>
                            <div className="flex gap-1 flex-wrap">
                              <dt className="font-semibold text-foreground">OKLch</dt>
                              <dd className="break-all">{oklch}</dd>
                            </div>
                          </dl>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )
          )}

          {/* Accessibility / contrast preview */}
          <section className="space-y-4 border-t pt-10">
            <h2 className="text-xl font-semibold border-b pb-2">Contrast Preview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  Color pairs
                </h3>
                {(
                  [
                    ["primary", "primaryForeground"],
                    ["secondary", "secondaryForeground"],
                    ["destructive", "destructiveForeground"],
                    ["muted", "mutedForeground"],
                  ] as const
                ).map(([bg, fg]) => (
                  <div
                    key={bg}
                    className="px-4 py-3 rounded-md text-sm font-medium"
                    style={{
                      backgroundColor: `oklch(${colors[bg]})`,
                      color: `oklch(${colors[fg]})`,
                    }}
                  >
                    {formatColorName(bg)} / {formatColorName(fg)}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                  UI tokens
                </h3>
                <div
                  className="px-4 py-3 rounded-md border-2 text-sm"
                  style={{ borderColor: `oklch(${colors.ring})` }}
                >
                  Focus ring ({"\u2192"} ring)
                </div>
                <div
                  className="px-4 py-3 rounded-md border text-sm"
                  style={{ borderColor: `oklch(${colors.border})` }}
                >
                  Default border
                </div>
                <div
                  className="px-4 py-3 rounded-md text-sm"
                  style={{
                    backgroundColor: `oklch(${colors.input})`,
                    color: `oklch(${colors.foreground})`,
                  }}
                >
                  Input background
                </div>
              </div>
            </div>
          </section>
        </main>

        <ThemeDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      </SidebarInset>
    </SidebarProvider>
  );
}
