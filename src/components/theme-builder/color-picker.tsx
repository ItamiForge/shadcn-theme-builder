"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hexToOklch, oklchToHex } from "@/lib/theme/utils";

interface ColorPickerProps {
  label: string;
  color: string; // OKLch string
  onChange: (color: string) => void;
}

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  // Safe conversion with fallback
  let hex = "#000000";
  try {
    hex = oklchToHex(color);
  } catch {
    console.error("Invalid color:", color);
  }

  const [inputValue, setInputValue] = useState(hex);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setInputValue(newHex);
  };

  const handleHexBlur = () => {
    // Validate and apply on blur
    if (/^#[0-9A-F]{3}$/i.test(inputValue) || /^#[0-9A-F]{6}$/i.test(inputValue)) {
      try {
        onChange(hexToOklch(inputValue));
      } catch {
        // Reset to previous value on error
        setInputValue(hex);
      }
    } else {
      // Reset to previous value if invalid
      setInputValue(hex);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newColor = hexToOklch(e.target.value);
      onChange(newColor);
      setInputValue(e.target.value);
    } catch {
      console.error("Invalid color selection");
    }
  };

  return (
    <div className="space-y-1">
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-md overflow-hidden border border-input shadow-sm">
          <input
            type="color"
            value={hex}
            onChange={handleColorChange}
            className="w-full h-full p-0 cursor-pointer border-0"
          />
        </div>
        <Input
          value={inputValue}
          onChange={handleHexChange}
          onBlur={handleHexBlur}
          placeholder="#000000"
          className="h-8 text-xs font-mono"
        />
      </div>
    </div>
  );
}
