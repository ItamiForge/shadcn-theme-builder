"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hexToOklch, oklchToHex } from "@/lib/theme/utils";

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  let hex = "#000000";
  try {
    hex = oklchToHex(color);
  } catch {
    // keep fallback
  }

  const [inputValue, setInputValue] = useState(hex);

  useEffect(() => {
    try {
      setInputValue(oklchToHex(color));
    } catch {
      // ignore
    }
  }, [color]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleHexBlur = () => {
    if (/^#[0-9A-F]{3}$/i.test(inputValue) || /^#[0-9A-F]{6}$/i.test(inputValue)) {
      try {
        onChange(hexToOklch(inputValue));
      } catch {
        setInputValue(hex);
      }
    } else {
      setInputValue(hex);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newColor = hexToOklch(e.target.value);
      onChange(newColor);
      setInputValue(e.target.value);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-1">
      <Label className="text-xs font-semibold text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-md overflow-hidden border border-input">
          <input
            type="color"
            value={hex}
            onChange={handleColorChange}
            className="w-full h-full p-0 cursor-pointer border-0"
            aria-label={`${label} color`}
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
