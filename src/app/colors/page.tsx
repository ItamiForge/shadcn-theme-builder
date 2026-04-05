"use client";

import React from "react";
import { useTheme } from "@/lib/theme/theme-context";
import { SiteHeader } from "@/components/site-header";
import { ThemeDrawer } from "@/components/theme-builder/theme-drawer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { oklchToHex } from "@/lib/theme/utils";

export default function ColorsPage() {
  const { colors, mode } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const colorGroups = {
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
  };

  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="min-h-screen bg-background">
          <SiteHeader />
          <div className="flex flex-1">
            <main className="flex-1 p-8 md:p-12 max-w-7xl mx-auto">
          <div className="space-y-12">
            <div>
              <h1 className="text-4xl font-bold mb-2">Color Palette</h1>
              <p className="text-muted-foreground">
                Current mode: <span className="font-semibold text-foreground">{mode}</span>
              </p>
            </div>

            {Object.entries(colorGroups).map(([groupName, colorKeys]) => (
              <section key={groupName} className="space-y-6">
                <h2 className="text-2xl font-semibold border-b pb-3">{groupName} Colors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {colorKeys.map((key) => {
                    const oklch = colors[key as keyof typeof colors];
                    const hex = oklchToHex(oklch);

                    return (
                      <div key={key} className="border rounded-lg overflow-hidden">
                        <div
                          className="h-24 w-full border-b"
                          style={{
                            backgroundColor: `oklch(${oklch})`,
                          }}
                        />
                        <div className="p-4 space-y-2">
                          <p className="font-semibold capitalize">{formatColorName(key)}</p>
                          <div className="space-y-1 text-sm font-mono">
                            <p className="text-muted-foreground">
                              <span className="text-foreground font-semibold">HEX:</span> {hex}
                            </p>
                            <p className="text-muted-foreground break-all">
                              <span className="text-foreground font-semibold">OKLch:</span> {oklch}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* Accessibility Section */}
            <section className="space-y-6 border-t pt-12">
              <h2 className="text-2xl font-semibold border-b pb-3">Accessibility</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Contrast Examples</h3>
                  <div className="space-y-4">
                    <div
                      className="p-4 rounded"
                      style={{
                        backgroundColor: `oklch(${colors.primary})`,
                        color: `oklch(${colors.primaryForeground})`,
                      }}
                    >
                      Primary on Primary Foreground
                    </div>
                    <div
                      className="p-4 rounded"
                      style={{
                        backgroundColor: `oklch(${colors.secondary})`,
                        color: `oklch(${colors.secondaryForeground})`,
                      }}
                    >
                      Secondary on Secondary Foreground
                    </div>
                    <div
                      className="p-4 rounded"
                      style={{
                        backgroundColor: `oklch(${colors.destructive})`,
                        color: `oklch(${colors.destructiveForeground})`,
                      }}
                    >
                      Destructive on Destructive Foreground
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Interactive States</h3>
                  <div className="space-y-4">
                    <div
                      className="p-4 rounded cursor-pointer hover:opacity-90 transition"
                      style={{
                        backgroundColor: `oklch(${colors.muted})`,
                        color: `oklch(${colors.mutedForeground})`,
                      }}
                    >
                      Muted (Hover to see interaction)
                    </div>
                    <div
                      className="p-4 rounded border-2"
                      style={{
                        borderColor: `oklch(${colors.ring})`,
                        color: `oklch(${colors.foreground})`,
                      }}
                    >
                      Focus Ring (Border示例)
                    </div>
                    <div
                      className="p-4 rounded"
                      style={{
                        backgroundColor: `oklch(${colors.input})`,
                        color: `oklch(${colors.foreground})`,
                      }}
                    >
                      Input Background
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <ThemeDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function formatColorName(str: string): string {
  // Convert camelCase to Title Case
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}
