"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  Check,
  Inbox,
  LayoutDashboard,
  Settings2,
  ShieldAlert,
  SlidersHorizontal,
} from "lucide-react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { DIAGNOSTIC_BLOCKS } from "@/lib/lab/scenarios";

function AuthFormBlock() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Enter your email below to continue to your workspace.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="auth-email">Email</Label>
          <Input id="auth-email" type="email" placeholder="name@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="auth-password">Password</Label>
          <Input id="auth-password" type="password" defaultValue="password" />
          <p className="text-xs text-muted-foreground">Must be at least 8 characters.</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="auth-invalid">Team slug</Label>
          <Input id="auth-invalid" aria-invalid defaultValue="!!" />
          <p className="text-xs text-destructive">Only letters and dashes are allowed.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Forgot password?</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  );
}

function SettingsBlock() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="h-4 w-4" /> Notification settings
        </CardTitle>
        <CardDescription>Dense controls on a single surface.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="marketing">Product updates</Label>
            <p className="text-xs text-muted-foreground">Occasional emails about new features.</p>
          </div>
          <Switch id="marketing" defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="security">Security alerts</Label>
            <p className="text-xs text-muted-foreground">Required for account changes.</p>
          </div>
          <Switch id="security" defaultChecked disabled />
        </div>
        <Separator />
        <div className="flex items-center gap-2">
          <Checkbox id="digest" defaultChecked />
          <Label htmlFor="digest">Weekly digest</Label>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button>Save changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardBlock() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <LayoutDashboard className="h-4 w-4" />
        Chart + KPI tokens under live theme
      </div>
      <SectionCards />
      <div className="px-1">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}

function DestructiveConfirmBlock() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <ShieldAlert className="h-4 w-4" />
          Delete project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Delete project permanently?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Destructive tokens must remain readable in the dialog
            surface.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SidebarNavBlock() {
  return (
    <SidebarProvider className="min-h-[280px] w-full max-w-sm border rounded-xl overflow-hidden">
      <Sidebar collapsible="none" className="w-full border-0">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold">
              TL
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">Theme Lab</p>
              <p className="text-xs text-muted-foreground">Sidebar tokens</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <BarChart3 />
                    Analytics
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Settings2 />
                    Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}

function NestedOverlayBlock() {
  const [plan, setPlan] = useState("pro");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open nested overlay</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade workspace</DialogTitle>
          <DialogDescription>
            Select inside a dialog stresses portal stacking, focus, and popover surfaces.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          <Label>Plan</Label>
          <Select value={plan} onValueChange={setPlan}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="team">Team</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>
            <Check className="h-4 w-4" /> Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PricingBlock() {
  return (
    <div className="grid gap-4 sm:grid-cols-3 max-w-4xl">
      {[
        { name: "Starter", price: "$0", cta: "outline" as const, badge: null },
        { name: "Pro", price: "$18", cta: "default" as const, badge: "Popular" },
        { name: "Team", price: "$48", cta: "secondary" as const, badge: null },
      ].map((tier) => (
        <Card key={tier.name} className={tier.badge ? "border-primary" : undefined}>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">{tier.name}</CardTitle>
              {tier.badge && <Badge>{tier.badge}</Badge>}
            </div>
            <CardDescription>
              <span className="text-2xl font-semibold text-foreground">{tier.price}</span>
              <span className="text-muted-foreground"> /mo</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-1">
            <p>Semantic tokens across CTAs</p>
            <p>Light & dark mode export</p>
          </CardContent>
          <CardFooter>
            <Button variant={tier.cta} className="w-full">
              Choose {tier.name}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function EmptyStateBlock() {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Inbox className="h-5 w-5" />
        </div>
        <CardTitle>No themes yet</CardTitle>
        <CardDescription>
          Import a Tailwind v4 theme or start from a preset to populate this workspace.
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-center gap-2">
        <Button variant="outline">Import CSS</Button>
        <Button>Browse presets</Button>
      </CardFooter>
    </Card>
  );
}

function DataTableBlock() {
  return (
    <div className="rounded-md border max-w-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Component</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Button</TableCell>
            <TableCell className="text-muted-foreground">Primary contrast</TableCell>
            <TableCell className="text-right">
              <Badge variant="secondary">Pass</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Alert</TableCell>
            <TableCell className="text-muted-foreground">Destructive FG</TableCell>
            <TableCell className="text-right">
              <Badge variant="destructive">Fail</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Sidebar</TableCell>
            <TableCell className="text-muted-foreground">Accent pair</TableCell>
            <TableCell className="text-right">
              <Badge variant="outline">Warn</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

function NotificationsBlock() {
  return (
    <div className="max-w-md space-y-2">
      {[
        { title: "Contrast audit ready", time: "2m", unread: true },
        { title: "Preset “Phosphor CRT” applied", time: "1h", unread: true },
        { title: "Export copied to clipboard", time: "Yesterday", unread: false },
      ].map((n) => (
        <Card key={n.title} className={n.unread ? "border-primary/40" : undefined}>
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div>
              <p className="text-sm font-medium flex items-center gap-2">
                {n.unread && <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />}
                {n.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
            </div>
            <Badge variant="outline">Lab</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ProfileBlock() {
  return (
    <Card className="max-w-xl">
      <CardContent className="flex flex-col sm:flex-row sm:items-center gap-4 p-6">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-lg">IF</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">ItamiForge</h3>
          <p className="text-sm text-muted-foreground truncate">OSS maintainer · Theme Lab</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">OKLCH</Badge>
            <Badge variant="outline">shadcn/ui</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Message
          </Button>
          <Button size="sm">Follow</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FilterSheetBlock() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal className="h-4 w-4" />
          Open filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter themes</SheetTitle>
          <SheetDescription>Dense filter UI on sheet surfaces.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label>Contrast floor</Label>
            <Slider defaultValue={[4.5]} min={3} max={7} step={0.5} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Checkbox id="f-light" defaultChecked />
              <Label htmlFor="f-light">Light mode issues</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="f-dark" defaultChecked />
              <Label htmlFor="f-dark">Dark mode issues</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="f-gamut" />
              <Label htmlFor="f-gamut">Gamut warnings only</Label>
            </div>
          </div>
          <Button>Apply filters</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const BLOCK_RENDERERS: Record<string, () => React.ReactNode> = {
  "auth-form": AuthFormBlock,
  settings: SettingsBlock,
  dashboard: DashboardBlock,
  "destructive-confirm": DestructiveConfirmBlock,
  "sidebar-nav": SidebarNavBlock,
  "nested-overlay": NestedOverlayBlock,
  pricing: PricingBlock,
  "empty-state": EmptyStateBlock,
  "data-table": DataTableBlock,
  notifications: NotificationsBlock,
  profile: ProfileBlock,
  "filter-sheet": FilterSheetBlock,
};

export function DiagnosticBlocks() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Diagnostic blocks</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          A fixed set of compositions that stress theme tokens and overlay behavior. These are not a
          template catalog — each exists to reveal a design-system risk. See{" "}
          <Link href="/audit" className="underline underline-offset-2">
            Audit
          </Link>{" "}
          for automated findings.
        </p>
      </div>

      <div className="space-y-10">
        {DIAGNOSTIC_BLOCKS.map((block) => {
          const Render = BLOCK_RENDERERS[block.id];
          return (
            <section key={block.id} id={`block-${block.id}`} className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-medium">{block.name}</h2>
                <Badge variant="outline">{block.id}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{block.purpose}</p>
              <div className="rounded-xl border bg-muted/20 p-4 sm:p-6">
                {Render ? <Render /> : null}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
