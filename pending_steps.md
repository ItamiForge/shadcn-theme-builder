# Pending steps — Theme Lab

Open work after the Theme Lab salvage. Split by who needs to act.

## You (human)

1. **Enable GitHub Pages** in this repo: Settings → Pages → Source = **GitHub Actions**. First successful `deploy-pages` run publishes the demo.
2. **Confirm the live URL** after deploy: `https://itamiforge.github.io/shadcn-theme-builder/`. If the org/user Pages site uses a different host, update README + SUPPORT + itamiforge docs.
3. **Push is done from this session** — verify CI (`.github/workflows/ci.yml`) and Pages deploy are green.
4. **Decide whether to keep the repo name** `shadcn-theme-builder` vs renaming to `theme-lab`. A rename needs GitHub repo rename + Pages URL + doc link updates.
5. **Optional: custom domain** for the lab if you do not want the `github.io` project path.
6. **Do not grow the catalog** unless a new scenario/block tests a distinct design-system risk (see [SUPPORT.md](SUPPORT.md)).

## Agent / next coding session

1. Watch CI + Pages after this push; fix any first-run Pages permission or `basePath` issues.
2. If Pages is live, add a screenshot or short GIF to the itamiforge Theme Lab landing page.
3. Pin `oxlint` / `oxfmt` to exact versions instead of `latest` once the toolchain is stable.
4. Add a keyboard-only Playwright path through the drawer (preset → edit token → export).
5. Consider a tiny “last verified against shadcn” badge wired to `SUPPORT.md`.
6. Only add components/blocks when they expose a new token or composition failure mode.

## Done in this pass

- Dual light/dark theme engine, import/export, audit, component matrix, diagnostic blocks
- Distinctive presets, static export, CI + Pages workflow
- Unused starter assets and unused UI (`drawer`/`vaul`, `collapsible`, `popover`) removed
- Single quality gate: `bun check` (typecheck + lint + format + unit tests + build)
