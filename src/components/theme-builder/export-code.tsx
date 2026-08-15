"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Download, Link2, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/lib/theme/theme-context";
import { serializeThemeCss } from "@/lib/theme/css-codec";
import { serializeRegistryThemeJson } from "@/lib/theme/registry-codec";
import { buildShareUrl } from "@/lib/theme/url-state";
import { auditTheme, summarizeAudit } from "@/lib/theme/audit";

export function ExportCode() {
  const { theme } = useTheme();
  const [copied, setCopied] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const css = serializeThemeCss(theme);
  const registryJson = serializeRegistryThemeJson(theme);
  const summary = summarizeAudit(auditTheme(theme));

  useEffect(() => {
    setShareUrl(buildShareUrl(theme));
  }, [theme]);

  const copy = async (label: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const download = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Export theme">
          <Download className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>Export Theme</DialogTitle>
          <DialogDescription>
            Deterministic Tailwind v4 CSS and registry:theme JSON from your current light and dark
            palettes. Audit snapshot: {summary.errors} errors, {summary.warnings} warnings.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="css">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="registry">Registry</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
          </TabsList>

          <TabsContent value="css" className="space-y-3">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => copy("css", css)}>
                {copied === "css" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                Copy CSS
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => download("theme.css", css, "text/css")}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
            <pre className="text-xs overflow-auto max-h-[320px] whitespace-pre-wrap font-mono rounded-md bg-muted p-4">
              {css}
            </pre>
          </TabsContent>

          <TabsContent value="registry" className="space-y-3">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => copy("json", registryJson)}>
                {copied === "json" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <FileJson className="h-4 w-4" />
                )}
                Copy JSON
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => download("theme-lab.json", registryJson, "application/json")}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Save as a registry item and install with the shadcn CLI, or paste into a local
              registry. This export does not claim official schema certification beyond the
              documented cssVars shape.
            </p>
            <pre className="text-xs overflow-auto max-h-[320px] whitespace-pre-wrap font-mono rounded-md bg-muted p-4">
              {registryJson}
            </pre>
          </TabsContent>

          <TabsContent value="share" className="space-y-3">
            {shareUrl ? (
              <>
                <Button size="sm" variant="outline" onClick={() => copy("url", shareUrl)}>
                  {copied === "url" ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
                  Copy share URL
                </Button>
                <p className="text-xs text-muted-foreground break-all font-mono bg-muted p-3 rounded-md">
                  {shareUrl}
                </p>
                <p className="text-xs text-muted-foreground">
                  Themes are encoded in the URL. Nothing is uploaded. Very large customizations may
                  exceed URL length limits.
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Theme payload is too large for a reliable share URL. Use CSS or registry export
                instead.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
