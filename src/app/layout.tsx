import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme/theme-context";

export const metadata: Metadata = {
  title: {
    default: "shadcn Theme Lab",
    template: "%s · Theme Lab",
  },
  description:
    "Open-source local-first theme laboratory for shadcn/ui with dual light/dark editing, component stress tests, contrast audits, and registry-compatible export.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
