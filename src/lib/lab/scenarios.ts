/**
 * Scenario and block metadata only. Renderers live in components/lab.
 * Add an entry here only when it tests a distinct design-system risk.
 */

import type { ReactNode } from "react";

export type ScenarioState =
  | "default"
  | "hover"
  | "focus"
  | "disabled"
  | "invalid"
  | "loading"
  | "destructive"
  | "empty"
  | "overflow";

export type ComponentScenario = {
  id: string;
  name: string;
  description: string;
  states: ScenarioState[];
  risks: string[];
};

export const COMPONENT_SCENARIOS: ComponentScenario[] = [
  {
    id: "button",
    name: "Button",
    description: "Primary actions across variants and disabled/loading states.",
    states: ["default", "disabled", "loading", "destructive"],
    risks: ["primary contrast", "focus ring", "destructive contrast"],
  },
  {
    id: "input",
    name: "Input & Label",
    description: "Text fields with invalid and disabled states.",
    states: ["default", "disabled", "invalid", "focus"],
    risks: ["muted label contrast", "ring vs background", "invalid cue"],
  },
  {
    id: "textarea",
    name: "Textarea",
    description: "Multi-line input with overflow and invalid states.",
    states: ["default", "disabled", "invalid", "overflow"],
    risks: ["border visibility", "muted helper contrast"],
  },
  {
    id: "badge",
    name: "Badge",
    description: "Compact status chips on surfaces.",
    states: ["default", "destructive"],
    risks: ["secondary/muted contrast"],
  },
  {
    id: "card",
    name: "Card",
    description: "Surface hierarchy and overflow content.",
    states: ["default", "overflow"],
    risks: ["card foreground contrast", "border visibility"],
  },
  {
    id: "switch-checkbox",
    name: "Switch & Checkbox",
    description: "Selection controls with disabled states.",
    states: ["default", "disabled"],
    risks: ["accessible name", "accent contrast"],
  },
  {
    id: "select",
    name: "Select",
    description: "Trigger and popover surface pairing.",
    states: ["default", "disabled", "empty"],
    risks: ["popover contrast", "border"],
  },
  {
    id: "tabs",
    name: "Tabs",
    description: "Navigation within a panel.",
    states: ["default", "disabled"],
    risks: ["muted vs active contrast"],
  },
  {
    id: "slider",
    name: "Slider",
    description: "Range control with disabled state.",
    states: ["default", "disabled"],
    risks: ["primary track contrast", "focus ring"],
  },
  {
    id: "avatar",
    name: "Avatar",
    description: "Image and fallback initials on surfaces.",
    states: ["default", "empty"],
    risks: ["muted fallback contrast", "border"],
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Hover/focus hint surface pairing.",
    states: ["default"],
    risks: ["popover contrast", "border"],
  },
  {
    id: "dropdown",
    name: "Dropdown menu",
    description: "Menu items including destructive action.",
    states: ["default", "destructive"],
    risks: ["popover contrast", "destructive item"],
  },
  {
    id: "sheet",
    name: "Sheet",
    description: "Slide-over panel with form controls.",
    states: ["default"],
    risks: ["surface hierarchy", "border"],
  },
  {
    id: "skeleton",
    name: "Skeleton",
    description: "Loading placeholders on muted surfaces.",
    states: ["loading"],
    risks: ["muted visibility"],
  },
  {
    id: "table",
    name: "Table",
    description: "Dense tabular data with empty state.",
    states: ["default", "empty"],
    risks: ["border", "muted cell contrast"],
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    description: "Hierarchy links with muted separators.",
    states: ["default"],
    risks: ["muted vs link contrast"],
  },
  {
    id: "toggle",
    name: "Toggle & Toggle group",
    description: "Pressed/unpressed control states.",
    states: ["default", "disabled"],
    risks: ["accent contrast", "border"],
  },
  {
    id: "alert-destructive",
    name: "Destructive alert",
    description: "High-stakes messaging using destructive tokens.",
    states: ["destructive"],
    risks: ["destructive foreground contrast"],
  },
];

export type DiagnosticBlockMeta = {
  id: string;
  name: string;
  purpose: string;
  attribution?: string;
};

export const DIAGNOSTIC_BLOCKS: DiagnosticBlockMeta[] = [
  {
    id: "auth-form",
    name: "Auth form",
    purpose: "Labels, inputs, primary CTA, muted helper text, and invalid fields together.",
  },
  {
    id: "settings",
    name: "Settings panel",
    purpose: "Dense form controls, switches, and secondary actions on card surfaces.",
  },
  {
    id: "dashboard",
    name: "Dashboard strip",
    purpose: "Stat cards, chart colors, and KPI density under the theme.",
  },
  {
    id: "destructive-confirm",
    name: "Destructive confirmation",
    purpose: "Destructive dialog contrast and focus handling.",
  },
  {
    id: "sidebar-nav",
    name: "Sidebar navigation",
    purpose: "Sidebar token set, accents, and border separation.",
  },
  {
    id: "nested-overlay",
    name: "Nested overlay",
    purpose: "Dialog containing a select — classic portal stacking stress test.",
  },
  {
    id: "pricing",
    name: "Pricing cards",
    purpose: "Multi-card comparison with primary/secondary CTAs and badge accents.",
  },
  {
    id: "empty-state",
    name: "Empty state",
    purpose: "Muted illustration area, helper copy, and a single recovery action.",
  },
  {
    id: "data-table",
    name: "Simple data table",
    purpose: "Border rhythm, header muted text, and row hover on table surfaces.",
  },
  {
    id: "notifications",
    name: "Notification list",
    purpose: "Stacked cards with badges, timestamps, and unread accent cues.",
  },
  {
    id: "profile",
    name: "Profile header",
    purpose: "Avatar, title stack, muted meta, and action cluster alignment.",
  },
  {
    id: "filter-sheet",
    name: "Filter sheet",
    purpose: "Sheet + sliders + checkboxes — dense filter UI composition.",
  },
];

export type ScenarioRender = (state: ScenarioState) => ReactNode;
