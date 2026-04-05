"use client";

import { Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "@/lib/theme/theme-context";

/**
 * Generate dark mode colors by inverting lightness from light mode colors
 * OKLch format: "lightness chroma hue"
 */
function getDarkModeColors() {
  return {
    background: "0.145 0 0",
    foreground: "0.985 0 0",
    card: "0.205 0 0",
    cardForeground: "0.985 0 0",
    popover: "0.205 0 0",
    popoverForeground: "0.985 0 0",
    primary: "0.922 0 0",
    primaryForeground: "0.205 0 0",
    secondary: "0.269 0 0",
    secondaryForeground: "0.985 0 0",
    muted: "0.269 0 0",
    mutedForeground: "0.708 0 0",
    accent: "0.269 0 0",
    accentForeground: "0.985 0 0",
    destructive: "0.704 0.191 22.216",
    destructiveForeground: "0.985 0 0",
    border: "0.87 0 0",
    input: "0.91 0 0",
    ring: "0.556 0 0",
    chart1: "0.488 0.243 264.376",
    chart2: "0.696 0.17 162.48",
    chart3: "0.769 0.188 70.08",
    chart4: "0.627 0.265 303.9",
    chart5: "0.645 0.246 16.439",
  };
}

export function ExportCode() {
  const { colors, radius } = useTheme();
  const [copied, setCopied] = useState(false);

  const generateLightCss = () => {
    return `
    --background: oklch(${colors.background});
    --foreground: oklch(${colors.foreground});

    --card: oklch(${colors.card});
    --card-foreground: oklch(${colors.cardForeground});

    --popover: oklch(${colors.popover});
    --popover-foreground: oklch(${colors.popoverForeground});

    --primary: oklch(${colors.primary});
    --primary-foreground: oklch(${colors.primaryForeground});

    --secondary: oklch(${colors.secondary});
    --secondary-foreground: oklch(${colors.secondaryForeground});

    --muted: oklch(${colors.muted});
    --muted-foreground: oklch(${colors.mutedForeground});

    --accent: oklch(${colors.accent});
    --accent-foreground: oklch(${colors.accentForeground});

    --destructive: oklch(${colors.destructive});
    --destructive-foreground: oklch(${colors.destructiveForeground});

    --border: oklch(${colors.border});
    --input: oklch(${colors.input});
    --ring: oklch(${colors.ring});

    --radius: ${radius}rem;

    --chart-1: oklch(${colors.chart1});
    --chart-2: oklch(${colors.chart2});
    --chart-3: oklch(${colors.chart3});
    --chart-4: oklch(${colors.chart4});
    --chart-5: oklch(${colors.chart5});
    `;
  };

  const generateDarkCss = () => {
    const darkColors = getDarkModeColors();
    return `
    --background: oklch(${darkColors.background});
    --foreground: oklch(${darkColors.foreground});

    --card: oklch(${darkColors.card});
    --card-foreground: oklch(${darkColors.cardForeground});

    --popover: oklch(${darkColors.popover});
    --popover-foreground: oklch(${darkColors.popoverForeground});

    --primary: oklch(${darkColors.primary});
    --primary-foreground: oklch(${darkColors.primaryForeground});

    --secondary: oklch(${darkColors.secondary});
    --secondary-foreground: oklch(${darkColors.secondaryForeground});

    --muted: oklch(${darkColors.muted});
    --muted-foreground: oklch(${darkColors.mutedForeground});

    --accent: oklch(${darkColors.accent});
    --accent-foreground: oklch(${darkColors.accentForeground});

    --destructive: oklch(${darkColors.destructive});
    --destructive-foreground: oklch(${darkColors.destructiveForeground});

    --border: oklch(${darkColors.border});
    --input: oklch(${darkColors.input});
    --ring: oklch(${darkColors.ring});

    --radius: ${radius}rem;

    --chart-1: oklch(${darkColors.chart1});
    --chart-2: oklch(${darkColors.chart2});
    --chart-3: oklch(${darkColors.chart3});
    --chart-4: oklch(${darkColors.chart4});
    --chart-5: oklch(${darkColors.chart5});
    `;
  };

  const handleCopy = () => {
    const fullCss = `:root {${generateLightCss()}
}

.dark {${generateDarkCss()}
}`;
    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Export Theme</DialogTitle>
          <DialogDescription>
            Copy and paste the following into your global CSS file. Includes both light and dark
            mode.
          </DialogDescription>
        </DialogHeader>
        <div className="relative rounded-md bg-muted p-4">
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
          <pre className="text-xs overflow-auto max-h-[300px] whitespace-pre-wrap font-mono p-4">
            {`:root {${generateLightCss()}
}

.dark {${generateDarkCss()}
}`}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
