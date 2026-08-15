"use client";

import { useEffect } from "react";
import { Moon, PanelRightClose, RotateCcw, Settings2, Sun, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { THEME_PRESETS } from "@/lib/theme/presets";
import { COLOR_GROUPS } from "@/lib/theme/schema";
import { useTheme } from "@/lib/theme/theme-context";
import { cn } from "@/lib/utils";
import { ColorPicker } from "./color-picker";
import { ExportCode } from "./export-code";
import { FontSelector } from "./font-selector";
import { ImportTheme } from "./import-theme";
import { RadiusSelector } from "./radius-selector";

interface ThemeDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function ThemeDrawer({ isOpen, setIsOpen }: ThemeDrawerProps) {
  const {
    colors,
    setColors,
    radius,
    setRadius,
    mode,
    setMode,
    font,
    setFont,
    borderWidth,
    setBorderWidth,
    letterSpacing,
    setLetterSpacing,
    setPreset,
    resetTheme,
    undo,
    canUndo,
  } = useTheme();

  useEffect(() => {
    const DRAWER_W = 400;
    const applyWidth = () => {
      const isPush = window.innerWidth >= 1024;
      document.documentElement.style.setProperty(
        "--drawer-width",
        isOpen && isPush ? `${DRAWER_W}px` : "0px",
      );
    };
    applyWidth();
    window.addEventListener("resize", applyWidth);
    return () => window.removeEventListener("resize", applyWidth);
  }, [isOpen]);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        aria-label={isOpen ? "Close theme builder" : "Open theme builder"}
        className={cn(
          "fixed z-50 shadow-xl rounded-full h-12 w-12 transition-all duration-300",
          "bottom-[calc(2rem+env(safe-area-inset-bottom,0px))]",
          isOpen
            ? "right-[calc(var(--drawer-width)+1rem)] lg:right-[calc(400px+1rem)]"
            : "right-[calc(1rem+env(safe-area-inset-right,0px))]",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings2 className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 right-0 z-40 flex h-dvh flex-col bg-background border-l",
          "transition-transform duration-300 ease-in-out",
          "w-full sm:w-[360px] lg:w-[400px]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Theme editor"
      >
        <div className="p-6 pb-2 border-b">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Theme Lab</h2>
                <p className="text-xs text-muted-foreground">
                  Editing <span className="font-medium text-foreground">{mode}</span> palette
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Toggle mode"
                  onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                >
                  {mode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <ImportTheme />
                <ExportCode />
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <PanelRightClose className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Select onValueChange={setPreset}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Choose a preset..." />
                </SelectTrigger>
                <SelectContent>
                  {THEME_PRESETS.map((preset) => (
                    <SelectItem key={preset.id} value={preset.id}>
                      {preset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={undo}
                disabled={!canUndo}
                title="Undo"
                aria-label="Undo"
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={resetTheme} title="Reset to defaults">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 min-h-0 px-6 pb-6">
          <div className="space-y-8 pb-10 pt-6">
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-foreground/80">Global Settings</h3>
              <div className="grid gap-6">
                <RadiusSelector radius={radius} onChange={setRadius} />
                <FontSelector font={font} onChange={setFont} />
                <div className="space-y-1">
                  <label
                    htmlFor="theme-border-width"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Border Width: {borderWidth}px
                  </label>
                  <input
                    id="theme-border-width"
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.5"
                    value={borderWidth}
                    onChange={(e) => setBorderWidth(parseFloat(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    aria-label="Border width"
                  />
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="theme-letter-spacing"
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    Letter Spacing: {letterSpacing > 0 ? "+" : ""}
                    {(letterSpacing * 100).toFixed(0)}%
                  </label>
                  <input
                    id="theme-letter-spacing"
                    type="range"
                    min="-0.1"
                    max="0.1"
                    step="0.01"
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    aria-label="Letter spacing"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {COLOR_GROUPS.map((group) => (
              <div key={group.id} className="space-y-4">
                <h3 className="text-sm font-medium text-foreground/80 sticky top-0 bg-background/95 backdrop-blur py-2 z-10 border-b">
                  {group.label} Colors
                </h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {group.keys.map((key) => (
                    <ColorPicker
                      key={`${mode}-${key}`}
                      label={key}
                      color={colors[key]}
                      onChange={(c) => setColors({ [key]: c })}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
