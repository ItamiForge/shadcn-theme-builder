import type { Metadata } from "next";
import { LabShell } from "@/components/lab/lab-shell";

export const metadata: Metadata = {
  title: "shadcn Theme Lab",
  description:
    "Local-first OSS theme laboratory for shadcn/ui — edit semantic tokens, stress-test components and blocks, audit contrast, export CSS and registry themes.",
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <LabShell>{children}</LabShell>;
}
