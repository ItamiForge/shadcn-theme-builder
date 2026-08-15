"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AVAILABLE_FONTS } from "@/lib/theme/utils";

interface FontSelectorProps {
  font: string;
  onChange: (font: string) => void;
}

export function FontSelector({ font, onChange }: FontSelectorProps) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-semibold text-muted-foreground">Font Family</Label>
      <Select value={font} onValueChange={onChange}>
        <SelectTrigger className="h-8 text-xs">
          <SelectValue placeholder="Select font" />
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_FONTS.map((f) => (
            <SelectItem key={f} value={f} className="text-xs">
              <span style={{ fontFamily: f }}>{f}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
