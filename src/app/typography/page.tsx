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
      <SidebarInset>
        <div className="min-h-screen bg-background">
          <SiteHeader />
          <div className="flex flex-1">
            <main className="flex-1 p-8 md:p-12 max-w-6xl mx-auto">
        <div className="space-y-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Typography</h1>
            <p className="text-muted-foreground">
              Explore the typography system with the current font: <span className="font-semibold text-foreground">{font}</span>
            </p>
          </div>

          {/* Heading Levels */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-3">Heading Levels</h2>
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-bold mb-2">Heading 1</h1>
                <p className="text-sm text-muted-foreground">Size: 3rem (48px) | Weight: Bold</p>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2">Heading 2</h2>
                <p className="text-sm text-muted-foreground">Size: 2.25rem (36px) | Weight: Bold</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">Heading 3</h3>
                <p className="text-sm text-muted-foreground">Size: 1.875rem (30px) | Weight: Bold</p>
              </div>
              <div>
                <h4 className="text-2xl font-semibold mb-2">Heading 4</h4>
                <p className="text-sm text-muted-foreground">Size: 1.5rem (24px) | Weight: Semibold</p>
              </div>
              <div>
                <h5 className="text-xl font-semibold mb-2">Heading 5</h5>
                <p className="text-sm text-muted-foreground">Size: 1.25rem (20px) | Weight: Semibold</p>
              </div>
              <div>
                <h6 className="text-lg font-semibold mb-2">Heading 6</h6>
                <p className="text-sm text-muted-foreground">Size: 1.125rem (18px) | Weight: Semibold</p>
              </div>
            </div>
          </section>

          {/* Body Text */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-3">Body Text</h2>
            <div className="space-y-4">
              <div>
                <p className="text-base mb-2">
                  This is a paragraph with normal body text. Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p className="text-sm text-muted-foreground">Size: 1rem (16px)</p>
              </div>
              <div>
                <p className="text-sm mb-2">
                  This is smaller text, often used for captions or supplementary information. It provides a
                  visual hierarchy and helps distinguish secondary content from primary content.
                </p>
                <p className="text-xs text-muted-foreground">Size: 0.875rem (14px)</p>
              </div>
              <div>
                <p className="text-xs mb-2">
                  This is extra small text, typically used for labels, hints, or very minor supplementary
                  information.
                </p>
                <p className="text-xs text-muted-foreground">Size: 0.75rem (12px)</p>
              </div>
            </div>
          </section>

          {/* Font Weights */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-3">Font Weights</h2>
            <div className="space-y-4">
              <div>
                <p className="font-light">Thin - Font weight 100</p>
              </div>
              <div>
                <p className="font-extralight">Extra Light - Font weight 200</p>
              </div>
              <div>
                <p className="font-light">Light - Font weight 300</p>
              </div>
              <div>
                <p className="font-normal">Normal - Font weight 400</p>
              </div>
              <div>
                <p className="font-medium">Medium - Font weight 500</p>
              </div>
              <div>
                <p className="font-semibold">Semibold - Font weight 600</p>
              </div>
              <div>
                <p className="font-bold">Bold - Font weight 700</p>
              </div>
              <div>
                <p className="font-extrabold">Extra Bold - Font weight 800</p>
              </div>
            </div>
          </section>

          {/* Text Styles */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-3">Text Styles</h2>
            <div className="space-y-4">
              <div>
                <p>
                  This is <strong>bold text</strong> for emphasis
                </p>
              </div>
              <div>
                <p>
                  This is <em>italic text</em> for emphasis
                </p>
              </div>
              <div>
                <p>
                  This is <u>underlined text</u> for emphasis
                </p>
              </div>
              <div>
                <p>
                  This is <code className="bg-muted px-2 py-1 rounded font-mono text-sm">inline code</code> text
                </p>
              </div>
              <div>
                <p className="line-through">This is struck through text</p>
              </div>
            </div>
          </section>

          {/* Letter Spacing */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-3">Letter Spacing</h2>
            <div className="space-y-6">
              <div>
                <p style={{ letterSpacing: "-0.05em" }} className="text-lg font-semibold mb-2">
                  Tight Spacing (-0.05em)
                </p>
                <p style={{ letterSpacing: "-0.05em" }}>
                  This text has tight letter spacing for a more condensed appearance.
                </p>
              </div>
              <div>
                <p style={{ letterSpacing: "0em" }} className="text-lg font-semibold mb-2">
                  Normal Spacing (Applied: {letterSpacing}em)
                </p>
                <p style={{ letterSpacing: `${letterSpacing}em` }}>
                  This text uses the current letter spacing value from your theme settings.
                </p>
              </div>
              <div>
                <p style={{ letterSpacing: "0.1em" }} className="text-lg font-semibold mb-2">
                  Loose Spacing (0.1em)
                </p>
                <p style={{ letterSpacing: "0.1em" }}>
                  This text has loose letter spacing for a more open appearance.
                </p>
              </div>
            </div>
          </section>

          {/* Line Height */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold border-b pb-3">Line Height</h2>
            <div className="space-y-6">
              <div>
                <p className="leading-tight font-semibold mb-2">Tight Line Height (1.25)</p>
                <p className="leading-tight">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              </div>
              <div>
                <p className="leading-normal font-semibold mb-2">Normal Line Height (1.5)</p>
                <p className="leading-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              </div>
              <div>
                <p className="leading-relaxed font-semibold mb-2">Relaxed Line Height (1.625)</p>
                <p className="leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              </div>
              <div>
                <p className="leading-loose font-semibold mb-2">Loose Line Height (2)</p>
                <p className="leading-loose">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
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
