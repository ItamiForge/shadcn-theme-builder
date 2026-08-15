"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { parseThemeCss, type ImportDiagnostic } from "@/lib/theme/css-codec";
import { parseRegistryTheme } from "@/lib/theme/registry-codec";
import { useTheme } from "@/lib/theme/theme-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ImportTheme() {
  const { importTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [cssText, setCssText] = useState("");
  const [jsonText, setJsonText] = useState("");
  const [diagnostics, setDiagnostics] = useState<ImportDiagnostic[]>([]);
  const [error, setError] = useState<string | null>(null);

  const applyCss = () => {
    setError(null);
    const result = parseThemeCss(cssText);
    setDiagnostics(result.diagnostics);
    if (result.diagnostics.some((d) => d.severity === "error")) {
      setError("Import failed — fix errors and try again.");
      return;
    }
    importTheme(result.theme);
    setOpen(false);
  };

  const applyJson = () => {
    setError(null);
    try {
      const parsed = JSON.parse(jsonText) as unknown;
      const result = parseRegistryTheme(parsed);
      setDiagnostics(result.diagnostics);
      if (!result.theme || result.diagnostics.some((d) => d.severity === "error")) {
        setError("Import failed — fix errors and try again.");
        return;
      }
      importTheme(result.theme);
      setOpen(false);
    } catch {
      setError("Invalid JSON");
      setDiagnostics([{ severity: "error", message: "Could not parse JSON" }]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Import theme">
          <Upload className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>Import Theme</DialogTitle>
          <DialogDescription>
            Paste Tailwind v4 / shadcn CSS (`:root` + `.dark`) or a `registry:theme` JSON item.
            Unsupported tokens are reported — values are never invented silently for known keys.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="css">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="json">Registry JSON</TabsTrigger>
          </TabsList>
          <TabsContent value="css" className="space-y-3">
            <Textarea
              value={cssText}
              onChange={(e) => setCssText(e.target.value)}
              placeholder={`:root {\n  --background: oklch(1 0 0);\n  ...\n}\n\n.dark {\n  ...\n}`}
              className="min-h-[220px] font-mono text-xs"
            />
            <Button onClick={applyCss}>Import CSS</Button>
          </TabsContent>
          <TabsContent value="json" className="space-y-3">
            <Textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder={`{\n  "name": "my-theme",\n  "type": "registry:theme",\n  "cssVars": { "light": {}, "dark": {} }\n}`}
              className="min-h-[220px] font-mono text-xs"
            />
            <Button onClick={applyJson}>Import JSON</Button>
          </TabsContent>
        </Tabs>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {diagnostics.length > 0 && (
          <ul className="max-h-40 overflow-auto space-y-1 text-xs rounded-md border p-3">
            {diagnostics.map((d, i) => (
              <li
                key={`${d.message}-${i}`}
                className={
                  d.severity === "error"
                    ? "text-destructive"
                    : d.severity === "warning"
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-muted-foreground"
                }
              >
                [{d.severity}] {d.message}
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
