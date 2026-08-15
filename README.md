# shadcn Theme Lab

Local-first theme laboratory for [shadcn/ui](https://ui.shadcn.com/). Edit semantic OKLCH tokens, stress-test components and blocks, audit contrast, export Tailwind v4 CSS or a `registry:theme` item.

|            |                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------- |
| **Docs**   | [Theme Lab on itamiforge](https://itamiforge.github.io/itamiforge/docs/projects/theme-lab/) |
| **Demo**   | [GitHub Pages](https://itamiforge.github.io/shadcn-theme-builder/)                          |
| **Policy** | [SUPPORT.md](SUPPORT.md) · [pending_steps.md](pending_steps.md)                             |

## Quick start

```bash
bun install
bun dev          # http://localhost:3000
bun check        # typecheck + lint + format + unit tests + build
bun check:fix    # auto-fix lint/format, then the same gate
bun preview      # static export served from out/
```

`bun check` is the only quality command you need before a PR. Playwright (`bun test:e2e`) stays separate — it needs browsers and a built `out/` in CI.

## What this is

A verification tool: import or craft a theme, see it on real installed components, catch token/contrast problems, export installable output. Not a paid block catalog.

## License

MIT
