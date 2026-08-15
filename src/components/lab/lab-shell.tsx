"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, FlaskConical, LayoutGrid, Moon, Palette, ShieldCheck, Sun } from "lucide-react";
import { ThemeDrawer } from "@/components/theme-builder/theme-drawer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme/theme-context";

const NAV = [
  { href: "/", label: "Edit", icon: Palette },
  { href: "/components", label: "Components", icon: LayoutGrid },
  { href: "/blocks", label: "Blocks", icon: Boxes },
  { href: "/audit", label: "Audit", icon: ShieldCheck },
] as const;

export function LabShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { mode, setMode } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <div
          className="flex h-14 items-center gap-3 px-4 transition-[padding-right] duration-300 ease-in-out"
          style={{ paddingRight: "calc(1rem + var(--drawer-width, 0px))" }}
        >
          <Link href="/" className="flex items-center gap-2 font-semibold shrink-0">
            <FlaskConical className="h-5 w-5 text-primary" />
            <span className="hidden sm:inline">Theme Lab</span>
          </Link>

          <nav aria-label="Lab sections" className="flex items-center gap-1 overflow-x-auto">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-muted text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Toggle light/dark preview"
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            >
              {mode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main
        className="transition-[padding-right] duration-300 ease-in-out"
        style={{ paddingRight: "var(--drawer-width, 0px)" }}
      >
        {children}
      </main>

      <ThemeDrawer isOpen={drawerOpen} setIsOpen={setDrawerOpen} />
    </div>
  );
}
