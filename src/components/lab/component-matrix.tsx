"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { COMPONENT_SCENARIOS, type ScenarioState } from "@/lib/lab/scenarios";
import { cn } from "@/lib/utils";

function ButtonScenario({ state }: { state: ScenarioState }) {
  if (state === "disabled") return <Button disabled>Disabled</Button>;
  if (state === "loading")
    return (
      <Button disabled>
        <Loader2 className="animate-spin" />
        Saving…
      </Button>
    );
  if (state === "destructive") return <Button variant="destructive">Delete</Button>;
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

function InputScenario({ state }: { state: ScenarioState }) {
  return (
    <div className="grid gap-2 max-w-sm">
      <Label htmlFor={`email-${state}`}>Email</Label>
      <Input
        id={`email-${state}`}
        placeholder="you@example.com"
        disabled={state === "disabled"}
        aria-invalid={state === "invalid" || undefined}
        defaultValue={state === "invalid" ? "not-an-email" : ""}
        className={cn(state === "focus" && "ring-2 ring-ring")}
      />
      {state === "invalid" && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" /> Enter a valid email
        </p>
      )}
    </div>
  );
}

function TextareaScenario({ state }: { state: ScenarioState }) {
  return (
    <div className="grid gap-2 max-w-sm">
      <Label htmlFor={`notes-${state}`}>Notes</Label>
      <Textarea
        id={`notes-${state}`}
        disabled={state === "disabled"}
        aria-invalid={state === "invalid" || undefined}
        defaultValue={
          state === "overflow"
            ? "A very long note that should scroll inside the textarea when height is constrained. ".repeat(
                8,
              )
            : state === "invalid"
              ? ""
              : "Ship checklist…"
        }
        className={cn(state === "overflow" && "max-h-24")}
      />
      {state === "invalid" && <p className="text-xs text-destructive">Notes are required.</p>}
    </div>
  );
}

function BadgeScenario({ state }: { state: ScenarioState }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      {(state === "destructive" || state === "default") && (
        <Badge variant="destructive">Destructive</Badge>
      )}
    </div>
  );
}

function CardScenario({ state }: { state: ScenarioState }) {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Project overview</CardTitle>
        <CardDescription>Card surface and muted description contrast.</CardDescription>
      </CardHeader>
      <CardContent>
        {state === "overflow" ? (
          <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis border rounded-md p-2">
            Extremely long content that should overflow and reveal border/radius token behavior
            under constrained width without wrapping unexpectedly across the canvas.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Body copy on card using muted foreground for secondary detail.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function SwitchCheckboxScenario({ state }: { state: ScenarioState }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Checkbox id={`terms-${state}`} disabled={state === "disabled"} defaultChecked />
        <Label htmlFor={`terms-${state}`}>Accept terms</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id={`notify-${state}`} disabled={state === "disabled"} defaultChecked />
        <Label htmlFor={`notify-${state}`}>Email notifications</Label>
      </div>
    </div>
  );
}

function SelectScenario({ state }: { state: ScenarioState }) {
  return (
    <Select disabled={state === "disabled"}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder={state === "empty" ? "No options" : "Choose plan"} />
      </SelectTrigger>
      <SelectContent>
        {state !== "empty" && (
          <>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
}

function TabsScenario({ state }: { state: ScenarioState }) {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password" disabled={state === "disabled"}>
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="text-sm text-muted-foreground">
        Account settings panel.
      </TabsContent>
      <TabsContent value="password" className="text-sm text-muted-foreground">
        Password settings panel.
      </TabsContent>
    </Tabs>
  );
}

function SliderScenario({ state }: { state: ScenarioState }) {
  return (
    <div className="w-full max-w-xs space-y-2">
      <Label>Density</Label>
      <Slider defaultValue={[40]} max={100} step={1} disabled={state === "disabled"} />
    </div>
  );
}

function AvatarScenario({ state }: { state: ScenarioState }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        {state !== "empty" && <AvatarImage src="https://github.com/shadcn.png" alt="User" />}
        <AvatarFallback>TL</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">Theme Lab</p>
        <p className="text-xs text-muted-foreground">
          {state === "empty" ? "Fallback initials" : "With image"}
        </p>
      </div>
    </div>
  );
}

function TooltipScenario() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Popover/tooltip surface contrast</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function DropdownScenario({ state }: { state: ScenarioState }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        {(state === "destructive" || state === "default") && (
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SheetScenario() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Sheet surface with form controls.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 py-4">
          <Label htmlFor="sheet-q">Query</Label>
          <Input id="sheet-q" placeholder="Search…" />
          <div className="flex items-center gap-2">
            <Checkbox id="sheet-active" defaultChecked />
            <Label htmlFor="sheet-active">Active only</Label>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SkeletonScenario() {
  return (
    <div className="flex items-center gap-3 max-w-sm">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-3 w-[75%]" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

function TableScenario({ state }: { state: ScenarioState }) {
  if (state === "empty") {
    return (
      <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
        No rows match the current filters.
      </div>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Invoice #1042</TableCell>
          <TableCell>
            <Badge variant="secondary">Paid</Badge>
          </TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Invoice #1043</TableCell>
          <TableCell>
            <Badge variant="outline">Open</Badge>
          </TableCell>
          <TableCell className="text-right">$125.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function BreadcrumbScenario() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Projects</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Theme Lab</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function ToggleScenario({ state }: { state: ScenarioState }) {
  return (
    <div className="flex flex-col gap-3">
      <Toggle aria-label="Bold" disabled={state === "disabled"} defaultPressed>
        Bold
      </Toggle>
      <ToggleGroup type="single" defaultValue="day" disabled={state === "disabled"}>
        <ToggleGroupItem value="day">Day</ToggleGroupItem>
        <ToggleGroupItem value="week">Week</ToggleGroupItem>
        <ToggleGroupItem value="month">Month</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

function DestructiveAlertScenario() {
  return (
    <div
      role="alert"
      className="flex gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-destructive max-w-lg"
    >
      <AlertCircle className="h-5 w-5 shrink-0" />
      <div>
        <p className="font-medium text-destructive">Cannot delete workspace</p>
        <p className="text-sm opacity-90">
          Destructive tokens must remain readable on tinted surfaces.
        </p>
      </div>
    </div>
  );
}

function renderScenario(id: string, state: ScenarioState) {
  switch (id) {
    case "button":
      return <ButtonScenario state={state} />;
    case "input":
      return <InputScenario state={state} />;
    case "textarea":
      return <TextareaScenario state={state} />;
    case "badge":
      return <BadgeScenario state={state} />;
    case "card":
      return <CardScenario state={state} />;
    case "switch-checkbox":
      return <SwitchCheckboxScenario state={state} />;
    case "select":
      return <SelectScenario state={state} />;
    case "tabs":
      return <TabsScenario state={state} />;
    case "slider":
      return <SliderScenario state={state} />;
    case "avatar":
      return <AvatarScenario state={state} />;
    case "tooltip":
      return <TooltipScenario />;
    case "dropdown":
      return <DropdownScenario state={state} />;
    case "sheet":
      return <SheetScenario />;
    case "skeleton":
      return <SkeletonScenario />;
    case "table":
      return <TableScenario state={state} />;
    case "breadcrumb":
      return <BreadcrumbScenario />;
    case "toggle":
      return <ToggleScenario state={state} />;
    case "alert-destructive":
      return <DestructiveAlertScenario />;
    default:
      return null;
  }
}

export function ComponentMatrix() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMPONENT_SCENARIOS;
    return COMPONENT_SCENARIOS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.risks.some((r) => r.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Component laboratory</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Installed component source rendered across meaningful states. This is not a remote
            screenshot gallery — what you see uses your live theme tokens.
          </p>
        </div>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search scenarios or risks…"
          className="sm:max-w-xs"
          aria-label="Search scenarios"
        />
      </div>

      <div className="space-y-8">
        {filtered.map((scenario) => (
          <section key={scenario.id} id={`scenario-${scenario.id}`} className="space-y-3">
            <div>
              <h2 className="text-lg font-medium">{scenario.name}</h2>
              <p className="text-sm text-muted-foreground">{scenario.description}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Risks: {scenario.risks.join(" · ")}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {scenario.states.map((state) => (
                <Card key={`${scenario.id}-${state}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium capitalize">{state}</CardTitle>
                  </CardHeader>
                  <CardContent>{renderScenario(scenario.id, state)}</CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">No scenarios match that query.</p>
        )}
      </div>
    </div>
  );
}
