import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Theme Lab smoke", () => {
  test("home loads and drawer toggles", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Theme workspace" })).toBeVisible();
    await page.getByRole("button", { name: "Open theme builder" }).click();
    await expect(page.getByRole("complementary", { name: "Theme editor" })).toBeVisible();
  });

  test("navigates lab sections", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Lab sections" });
    await nav.getByRole("link", { name: "Components" }).click();
    await expect(page.getByRole("heading", { name: "Component laboratory" })).toBeVisible();
    await nav.getByRole("link", { name: "Blocks" }).click();
    await expect(page.getByRole("heading", { name: "Diagnostic blocks" })).toBeVisible();
    await nav.getByRole("link", { name: "Audit" }).click();
    await expect(page.getByRole("heading", { name: "Theme audit" })).toBeVisible();
  });

  test("export dialog shows CSS", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open theme builder" }).click();
    await page.getByRole("button", { name: "Export theme" }).click();
    await expect(page.getByRole("heading", { name: "Export Theme" })).toBeVisible();
    await expect(page.getByText(":root")).toBeVisible();
  });

  test("import CSS round trip updates workspace", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open theme builder" }).click();
    await page.getByRole("button", { name: "Import theme" }).click();
    const css = `:root {
  --background: oklch(0.98 0.02 250);
  --foreground: oklch(0.2 0.02 250);
  --primary: oklch(0.55 0.2 250);
  --primary-foreground: oklch(0.98 0 0);
  --radius: 1rem;
}
.dark {
  --background: oklch(0.2 0.02 250);
  --foreground: oklch(0.98 0.02 250);
  --primary: oklch(0.7 0.2 250);
  --primary-foreground: oklch(0.15 0 0);
}`;
    await page.locator("textarea").first().fill(css);
    await page.getByRole("button", { name: "Import CSS" }).click();
    await expect(page.getByText("1rem").first()).toBeVisible();
  });

  test("edit page has no serious structural axe violations", async ({ page }) => {
    await page.goto("/");
    // Exclude the off-canvas theme drawer and color-contrast: the lab intentionally
    // surfaces theme contrast issues; structural a11y is what we gate in CI.
    const results = await new AxeBuilder({ page })
      .exclude("aside")
      .disableRules(["color-contrast"])
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(serious).toEqual([]);
  });
});
