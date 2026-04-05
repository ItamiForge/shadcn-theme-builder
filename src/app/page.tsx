"use client";

import { useState } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
// Content Components
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable, type schema } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { ThemeDrawer } from "@/components/theme-builder/theme-drawer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Palette, Type, Layout } from "lucide-react";
import type { z } from "zod";

// Dummy Data for DataTable
const tasks: z.infer<typeof schema>[] = [
  {
    id: 1,
    header: "Proposal",
    type: "Focus Documents",
    status: "In Progress",
    target: "2024-02-20",
    limit: "100%",
    reviewer: "Eddie Lake",
  },
  {
    id: 2,
    header: "Technical Spec",
    type: "Technical Approach",
    status: "Done",
    target: "2024-01-15",
    limit: "100%",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 3,
    header: "Executive Summary",
    type: "Executive Summary",
    status: "Not Started",
    target: "2024-03-01",
    limit: "50%",
    reviewer: "Assign reviewer",
  },
  {
    id: 4,
    header: "UI Design",
    type: "Design",
    status: "In Progress",
    target: "2024-02-10",
    limit: "80%",
    reviewer: "Emily Whalen",
  },
];

export default function Home() {
  const [isThemeBuilderOpen, setIsThemeBuilderOpen] = useState(true);

  return (
    <SidebarProvider>
      <AppSidebar />
      {/*
       * SidebarInset fills the remaining space after the sidebar.
       * We drive padding-right via the CSS custom property --drawer-width
       * (set by ThemeDrawer's useEffect). This avoids hardcoded pixel values
       * and means mobile/tablet get zero padding (overlay drawer).
       */}
      <SidebarInset
        className="overflow-hidden transition-[padding-right] duration-300 ease-in-out"
        style={{ paddingRight: "var(--drawer-width, 0px)" }}
      >
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-auto">
          {/* Design System Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
            <Link href="/typography">
              <Card className="h-full hover:border-primary cursor-pointer transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Type className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Typography</CardTitle>
                  </div>
                  <CardDescription>Font styles and text hierarchy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-primary">
                    Explore fonts <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/colors">
              <Card className="h-full hover:border-primary cursor-pointer transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Colors</CardTitle>
                  </div>
                  <CardDescription>Color palette and accessibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-primary">
                    View palette <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/components">
              <Card className="h-full hover:border-primary cursor-pointer transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Layout className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Components</CardTitle>
                  </div>
                  <CardDescription>UI components gallery</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-primary">
                    View all <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Dashboard Layout */}
          <div className="flex flex-col gap-4 p-4">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold leading-none tracking-tight mb-4">
                  Current Tasks
                </h3>
                <DataTable data={tasks} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      <ThemeDrawer isOpen={isThemeBuilderOpen} setIsOpen={setIsThemeBuilderOpen} />
    </SidebarProvider>
  );
}
