"use client";

import React from "react";
import { useTheme } from "@/lib/theme/theme-context";
import { SiteHeader } from "@/components/site-header";
import { ThemeDrawer } from "@/components/theme-builder/theme-drawer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function TypographyPage() {
  const { font, letterSpacing } = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <SidebarProvider>
      <SidebarInset
        className="transition-[padding-right] duration-300 ease-in-out"
        style={{ paddingRight: "var(--drawer-width, 0px)" }}
      >
        <SiteHeader />

        <main className="p-4 sm:p-6 lg:p-10 space-y-12 max-w-5xl">
          {/* Page header */}
          <div className="space-y-1">
            <h1 className="text-3xl font-bold sm:text-4xl">Typography</h1>
            <p className="text-muted-foreground">
              Active font:{" "}
              <span className="font-semibold text-foreground">{font}</span>
            </p>
          </div>

          {/* Heading scale */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Heading Scale</h2>
            <div className="space-y-6">
              {(
                [
                  ["H1", "text-5xl font-bold"],
                  ["H2", "text-4xl font-bold"],
                  ["H3", "text-3xl font-bold"],
                  ["H4", "text-2xl font-semibold"],
                  ["H5", "text-xl font-semibold"],
                  ["H6", "text-lg font-semibold"],
                ] as const
              ).map(([label, className]) => (
                <div key={label} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                  <span className="text-xs font-mono text-muted-foreground w-8 shrink-0">{label}</span>
                  <p className={className}>The quick brown fox jumps over the lazy dog</p>
                </div>
              ))}
            </div>
          </section>

          {/* Body text sizes */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Body Text Sizes</h2>
            <div className="space-y-6">
              {(
                [
                  ["xl", "text-xl", "20px"],
                  ["lg", "text-lg", "18px"],
                  ["base", "text-base", "16px — default"],
                  ["sm", "text-sm", "14px"],
                  ["xs", "text-xs", "12px"],
                ] as const
              ).map(([label, className, note]) => (
                <div key={label} className="space-y-0.5">
                  <p className={`${className} font-medium`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {label} · {note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Font weights */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Font Weights</h2>
            <div className="space-y-3">
              {(
                [
                  ["font-thin", "Thin · 100"],
                  ["font-extralight", "Extra Light · 200"],
                  ["font-light", "Light · 300"],
                  ["font-normal", "Normal · 400"],
                  ["font-medium", "Medium · 500"],
                  ["font-semibold", "Semibold · 600"],
                  ["font-bold", "Bold · 700"],
                  ["font-extrabold", "Extra Bold · 800"],
                  ["font-black", "Black · 900"],
                ] as const
              ).map(([className, label]) => (
                <div key={className} className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground w-28 shrink-0">{className}</span>
                  <p className={`text-base ${className}`}>{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Inline styles */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Inline Decorations</h2>
            <div className="space-y-3 text-base">
              <p>Default body text — the baseline for everything.</p>
              <p>
                Text with <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and{" "}
                <s>strikethrough</s>.
              </p>
              <p>
                Inline{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">
                  monospace code
                </code>{" "}
                within prose.
              </p>
              <p>
                A{" "}
                <a href="#" className="text-primary underline underline-offset-4 hover:text-primary/80">
                  hyperlink example
                </a>{" "}
                with default styles.
              </p>
            </div>
          </section>

          {/* Letter spacing */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Letter Spacing</h2>
            <p className="text-sm text-muted-foreground">
              Theme letter-spacing is currently{" "}
              <span className="font-mono font-semibold text-foreground">{letterSpacing}em</span>.
            </p>
            <div className="space-y-6">
              {(
                [
                  ["-0.05em", "Tight (-0.05em)"],
                  ["-0.025em", "Slightly tight (-0.025em)"],
                  [`${letterSpacing}em`, `Theme value (${letterSpacing}em)`],
                  ["0.05em", "Wide (0.05em)"],
                  ["0.1em", "Loose (0.1em)"],
                ] as const
              ).map(([spacing, label]) => (
                <div key={spacing} className="space-y-0.5">
                  <p
                    className="text-base"
                    style={{ letterSpacing: spacing }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">{label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Line height */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Line Height</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(
                [
                  ["leading-tight", "Tight · 1.25"],
                  ["leading-snug", "Snug · 1.375"],
                  ["leading-normal", "Normal · 1.5"],
                  ["leading-relaxed", "Relaxed · 1.625"],
                  ["leading-loose", "Loose · 2"],
                ] as const
              ).map(([className, label]) => (
                <div key={className} className="space-y-1">
                  <p className="text-xs text-muted-foreground font-mono">{label}</p>
                  <p className={`text-sm ${className}`}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <ThemeDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      </SidebarInset>
    </SidebarProvider>
  );
}
