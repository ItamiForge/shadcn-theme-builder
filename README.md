# Shadcn Theme Builder

A **visual, interactive theme editor** for [shadcn/ui](https://ui.shadcn.com/) built with Next.js, React, and TypeScript. Customize your design system in real-time with live preview, then export production-ready CSS.

![Shadcn Theme Builder](https://img.shields.io/badge/Next.js-16-black?style=flat-square) ![React 19](https://img.shields.io/badge/React-19-61dafb?style=flat-square) ![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square) ![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square)

## ✨ Features

### 🎨 Visual Color Editor

- **Real-time preview** of theme changes across a live dashboard
- **OKLch color space** for perceptually uniform colors
- Dual light/dark mode editing with independent color control
- **24 theme colors** (backgrounds, surfaces, brand, UI, chart colors)

### 🎭 Theme Presets

Pre-built themes ready to customize:

- **Default** – Clean, neutral palette
- **Ocean Breeze** – Cool, professional blues
- **Sunset** – Warm oranges and ambers
- **Forest** – Natural greens
- **Rose** – Elegant pinks and roses
- **Midnight** – Deep, sophisticated dark
- **Catppuccin** – Popular developer-friendly lavender theme
- **Nord** – Cool blue-gray palette

One-click preset selection in the theme drawer.

### 💾 Persistent Themes

- **Auto-save to localStorage** – Theme persists across sessions
- **Reset to defaults** – Restore original theme with one click
- **No configuration required** – Works out of the box

### 📦 Export System

- **Dual CSS output** – Generates both `:root` (light) and `.dark` (dark) blocks
- **Copy-to-clipboard** – One-click export
- **Tailwind v4 compatible** – Drop into any Next.js or React project
- **Production-ready** – Fully optimized CSS variables

### 🔤 Dynamic Typography

- Load any of 8 Google Fonts dynamically
- Instant font preview across the dashboard
- Fonts: Inter, Roboto, Open Sans, Playfair Display, Montserrat, Poppins, Lato, Geist

### 📐 Customizable Spacing

- Adjust border radius globally (rem units)
- Live preview of rounded corners

### 📊 Live Dashboard Preview

- Real-time preview with charts, tables, and cards
- See your theme colors in action immediately
- Responsive design showcase

### ⚡ Developer Experience

- **Zero-config setup** – Clone and run `bun dev`
- **Type-safe** – Full TypeScript support with strict mode
- **Fast tooling** – oxlint + oxfmt (50-100x faster than ESLint/Prettier)
- **Pre-built components** – 29 shadcn/ui components included

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/itamiforge/shadcn-theme-builder.git
cd shadcn-theme-builder

# Install dependencies (requires Bun)
bun install

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) and click the settings icon (⚙️) in the bottom-right corner to open the theme builder.

> **Note:** This project uses [Bun](https://bun.sh/) as the package manager and runtime. [Install Bun](https://bun.sh/docs/installation) if you haven't already.

## 📖 Usage

### 1. **Select a Preset**

Click the dropdown in the theme drawer to choose from 8 pre-made themes.

### 2. **Customize Colors**

- Browse color groups: Base, Brand, UI, Charts
- Click on any color swatch to open the color picker
- Edit hex values or click to choose from a visual picker
- Changes apply instantly to the live preview

### 3. **Adjust Typography & Spacing**

- Change the global border radius
- Select a Google Font from the dropdown
- Fonts load dynamically without page reload

### 4. **Toggle Dark Mode**

- Click the sun/moon icon to switch between light and dark themes
- Customize dark mode colors independently
- All colors update live

### 5. **Export Your Theme**

- Click the download icon (⬇️) to open the export dialog
- Copy the generated CSS (includes both light and dark blocks)
- Paste into your `globals.css` or theme CSS file
- Done! Your shadcn/ui theme is ready to use

### 6. **Reset or Save**

- Use the reset button (↻) to return to defaults
- Your theme auto-saves to localStorage
- Reload the page to restore your custom theme

## 📦 NPM Scripts

```bash
bun dev           # Start development server (Turbopack)
bun build         # Build for production
bun start         # Start production server

# Quality checks
bun lint          # Run oxlint (ESLint replacement)
bun lint:fix      # Auto-fix linting issues
bun fmt           # Format with oxfmt (Prettier replacement)
bun fmt:check     # Check formatting without writing
bun typecheck     # TypeScript strict type checking
bun check         # Run all checks (lint + typecheck + fmt:check)
```

## 🏗️ Architecture

### Tech Stack

- **Next.js 16.2** – App Router, Turbopack, server components
- **React 19** – Latest React with server component support
- **Tailwind CSS v4** – New OKLch color space support
- **TypeScript 5** – Strict mode, bundler resolution
- **shadcn/ui** – 29 unstyled components
- **Recharts** – Dashboard charts (interactive area chart)
- **@tanstack/react-table** – Advanced table with sorting
- **Bun 1.3** – Fast runtime and package manager

### Project Structure

```
src/
├── app/
│   ├── globals.css              # Tailwind v4 + CSS variables
│   ├── layout.tsx               # Root layout with ThemeProvider
│   ├── page.tsx                 # Home (dashboard + theme builder)
│   └── dashboard/
│       ├── page.tsx             # Dashboard route
│       └── data.json            # Mock data
├── components/
│   ├── app-sidebar.tsx          # Main app navigation
│   ├── chart-area-interactive.tsx # Dashboard chart
│   ├── data-table.tsx           # Task table component
│   ├── section-cards.tsx        # Stats cards
│   ├── theme-builder/           # Theme editor components
│   │   ├── color-picker.tsx     # Hex input + color picker
│   │   ├── export-code.tsx      # CSS export dialog
│   │   ├── font-selector.tsx    # Google Fonts dropdown
│   │   ├── radius-selector.tsx  # Border radius slider
│   │   └── theme-drawer.tsx     # Main theme panel
│   └── ui/                      # shadcn/ui components (29 files)
├── hooks/
│   └── use-mobile.ts            # Responsive design helper
└── lib/
    ├── utils.ts                 # CLI helpers
    └── theme/
        ├── presets.ts           # 8 theme presets
        ├── theme-context.tsx    # Global theme state
        └── utils.ts             # OKLch color conversion
```

### Color System

The project uses **OKLch** (Oklch) color space, a modern perceptually uniform color model:

- More consistent lightness across different hues
- Better for accessibility (WCAG contrast calculations)
- Aligns with Tailwind CSS v4's native color space

Color conversion functions in `src/lib/theme/utils.ts`:

- `hexToOklch(hex: string): string` – Convert hex → OKLch
- `oklchToHex(oklch: string): string` – Convert OKLch → hex

### State Management

Theme state (colors, radius, font, mode) is managed via React Context:

- `ThemeProvider` – Root context provider (wraps entire app)
- `useTheme()` – Hook to access theme state anywhere

Features:

- Auto-save to localStorage on mount/change
- Presets via `setPreset(presetId)`
- Reset via `resetTheme()`
- Dark mode toggle via `setMode("dark" | "light")`

## 🎯 Customization

### Adding a New Theme Preset

1. Open `src/lib/theme/presets.ts`
2. Add light and dark color variants:

```typescript
const myThemeLight: ThemeColors = {
  background: "1 0 0", // OKLch: lightness chroma hue
  foreground: "0.145 0 0",
  // ... other 22 colors
};

const myThemeDark: ThemeColors = {
  background: "0.145 0 0",
  foreground: "0.985 0 0",
  // ... other 22 colors
};
```

3. Add to `THEME_PRESETS` array:

```typescript
{
  id: "my-theme",
  name: "My Theme",
  label: "My",
  light: myThemeLight,
  dark: myThemeDark,
}
```

4. Preset now appears in the theme drawer dropdown!

### Adding a New Google Font

1. Open `src/lib/theme/utils.ts`
2. Add to `GOOGLE_FONTS_MAP`:

```typescript
export const GOOGLE_FONTS_MAP: Record<string, string> = {
  // ... existing fonts
  "My Font": "https://fonts.googleapis.com/css2?family=My+Font:wght@300;400;600;700&display=swap",
};
```

3. Font appears in the font selector!

### Exporting Custom CSS

The export system generates both light and dark blocks:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... other colors ... */
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... other colors ... */
}
```

Paste this into your project's global CSS file. Tailwind will automatically use these CSS variables.

## 🛠️ Development

### Code Quality

This project uses the **Oxc toolchain** for modern, fast linting and formatting:

```bash
# Linting with oxlint (50-100x faster than ESLint)
bun lint       # Check for issues
bun lint:fix   # Auto-fix issues

# Formatting with oxfmt (30x faster than Prettier)
bun fmt        # Format all files
bun fmt:check  # Check formatting

# Type checking
bun typecheck  # Full TypeScript check
```

All code is:

- ✅ Formatted with oxfmt (Tailwind class sorting + import sorting built-in)
- ✅ Linted with oxlint (700+ rules, React, TypeScript included)
- ✅ Type-checked with TypeScript (strict mode)
- ✅ Tested with Next.js builder

### Git Workflow

```bash
# Make changes
git add .
git commit -m "feat: add new preset"

# Before pushing
bun check    # Runs all quality checks

# Push to main
git push origin main
```

## 📝 Configuration Files

- **`next.config.ts`** – Next.js 16 with Turbopack
- **`tsconfig.json`** – Strict TypeScript, zero unused variables
- **`tailwind.config.ts`** – Tailwind v4 with auto-import
- **`components.json`** – Shadcn config (new-york style, RSC enabled)
- **`postcss.config.mjs`** – PostCSS with Tailwind plugin
- **`.editorconfig`** – EditorConfig for consistent formatting
- **`oxlint.json`** – (optional) Oxlint configuration
- **`oxfmt.toml`** – (optional) Oxfmt configuration

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and ensure all checks pass: `bun check`
4. Commit: `git commit -am 'Add your feature'`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

### Adding Features

- **New theme presets?** Edit `src/lib/theme/presets.ts` and add to guide above
- **New fonts?** Add to `GOOGLE_FONTS_MAP` in `src/lib/theme/utils.ts`
- **Bug fixes?** Open an issue first to discuss
- **Performance improvements?** Benchmark and document

## 📄 License

MIT © 2026 itamiforge

This project is open source and available under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** – Beautifully designed React components
- **Tailwind CSS** – Utility-first CSS framework
- **Next.js** – React framework for production
- **Oxc** – Fast JavaScript toolchain
- **Recharts** – Composable charting library

## 📚 Resources

- [Shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [OKLch Color Space](https://oklab.pages.dev/)
- [Oxc Documentation](https://oxc.rs/)

---

**Made with ❤️ by [itamiforge](https://github.com/itamiforge)**

Questions? Open an [issue](https://github.com/itamiforge/shadcn-theme-builder/issues) on GitHub.
