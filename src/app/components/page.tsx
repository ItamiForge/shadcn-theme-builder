"use client";

import React from "react";
import { SiteHeader } from "@/components/site-header";
import { ThemeDrawer } from "@/components/theme-builder/theme-drawer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  Check,
  X,
  Copy,
  Download,
  Settings,
} from "lucide-react";

export default function ComponentsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <SidebarProvider>
      {/* --drawer-width is set by ThemeDrawer's useEffect; 0px on mobile (overlay), 400px on desktop (push) */}
      <SidebarInset style={{ paddingRight: "var(--drawer-width, 0px)", transition: "padding-right 0.3s ease" }}>
        <SiteHeader />
        <main className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
          <div className="space-y-12">
            <div>
              <h1 className="text-4xl font-bold mb-2">Component Gallery</h1>
              <p className="text-muted-foreground">
                Explore all the UI components available in this design system
              </p>
            </div>

            {/* Buttons */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold border-b pb-3">Buttons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Default</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button>Default</Button>
                    <Button disabled>Disabled</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Primary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Primary
                    </Button>
                    <Button disabled className="bg-primary text-primary-foreground">
                      Disabled
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Secondary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="secondary" disabled>
                      Disabled
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Destructive</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="destructive">Delete</Button>
                    <Button variant="destructive" disabled>
                      Disabled
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Ghost</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="ghost" disabled>
                      Disabled
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Icon</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex gap-2">
                      <Button size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Form Elements */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold border-b pb-3">Form Elements</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Input</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="input-1">Default Input</Label>
                      <Input id="input-1" placeholder="Enter text..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="input-2">With Value</Label>
                      <Input id="input-2" value="Sample value" readOnly />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="input-3">Disabled</Label>
                      <Input id="input-3" placeholder="Disabled input" disabled />
                    </div>
                  </CardContent>
                </Card>

                {/* Select */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Select</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Choose an option</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="opt1">Option 1</SelectItem>
                          <SelectItem value="opt2">Option 2</SelectItem>
                          <SelectItem value="opt3">Option 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Checkbox */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Checkbox</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cb1" />
                      <Label htmlFor="cb1">Option 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cb2" defaultChecked />
                      <Label htmlFor="cb2">Option 2 (Checked)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cb3" disabled />
                      <Label htmlFor="cb3" className="opacity-50">
                        Option 3 (Disabled)
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Switch */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Switch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="switch1" />
                      <Label htmlFor="switch1">Enable feature</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="switch2" defaultChecked />
                      <Label htmlFor="switch2">Enabled</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="switch3" disabled />
                      <Label htmlFor="switch3" className="opacity-50">
                        Disabled
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Cards & Badges */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold border-b pb-3">Cards & Badges</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description goes here</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This is a card component with header, title, description, and content sections. It can
                      hold any type of content.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Badge Examples</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Status Indicators */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold border-b pb-3">Status Indicators</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-base">Success</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Operation completed successfully</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <CardTitle className="text-base">Warning</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">This action requires attention</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <X className="h-5 w-5 text-red-600" />
                      <CardTitle className="text-base">Error</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Something went wrong</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Separators */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold border-b pb-3">Separators</h2>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Horizontal Separator</CardTitle>
                </CardHeader>
                <div>
                  <p className="px-6 py-2 text-sm">Section one</p>
                  <Separator />
                  <p className="px-6 py-2 text-sm">Section two</p>
                </div>
              </Card>
            </section>

            {/* Text Styles */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold border-b pb-3">Text Styles</h2>

              <Card>
                <CardHeader>
                  <CardTitle>Various Text Styles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">
                      Extra Small Uppercase
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">Small text renders content at 14px</p>
                  </div>
                  <div>
                    <p className="text-base">Base text renders content at 16px</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">Large semibold text</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold">Extra large bold text</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>

        <ThemeDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      </SidebarInset>
    </SidebarProvider>
  );
}
