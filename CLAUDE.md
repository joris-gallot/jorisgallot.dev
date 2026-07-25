# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal website (portfolio + blog) built with Astro, deployed as static assets to Cloudflare. Positioning: independent software engineer, apps (Reviu, Kinora) + open source + freelance availability.

## Commands

- `pnpm dev` - dev server (`dev:network` to expose on LAN); usually already running on `localhost:4321`
- `pnpm build` - runs `astro check` (typecheck) then `astro build`; output to `dist/`
- `pnpm check` - typecheck only (`astro check`)
- `pnpm lint` / `pnpm lint:fix` - ESLint
- `pnpm preview` - serve built `dist/`

No test suite exists.

## Toolchain

Node and pnpm versions are pinned in `package.json` (`engines.node`, `packageManager`) and enforced by CI. pnpm 11 blocks postinstall build scripts by default; approved ones live under `allowBuilds` in `pnpm-workspace.yaml` (currently esbuild, sharp). New deps with build scripts get auto-appended there as placeholders that must be set to `true`/`false`.

`pnpm-workspace.yaml` also carries the supply-chain policy (`trustPolicy: no-downgrade`, required by the `pnpm/yaml-enforce-settings` lint rule) and two escape hatches: `trustPolicyExclude` for `chokidar@4.0.3` (pinned by `@astrojs/check`, published before chokidar moved to trusted publishing) and a `peerDependencyRules` entry letting `eslint-plugin-jsx-a11y` accept eslint 10. Verify any new `trustPolicyExclude` entry (publisher, repo, provenance) before adding it, and pin the exact version.

TypeScript stays on 6.x: 7.x is the native (Go) compiler with no JS API, which breaks `astro check` (`@astrojs/language-server`) and typescript-eslint. `eslint-plugin-jsx-a11y` is not a direct dep; antfu's config only loads it when `jsx.a11y` is on, and there are no JSX/TSX files here.

## Architecture

**Design concept**: the whole site is a terminal session. Each page is a sequence of prompt lines (`Cmd.astro` renders `joris@dev:~$ <cmd>`, as `h2` when `heading` is set) followed by indented output blocks (`.term-out`, left border). Home (`TerminalHome.astro`, shared component) runs `whoami` (with avatar) / `ls products/` / `ls -t open-source/` / `ls -t writing/` / `cat contact.txt` and ends with a static block cursor. Detail pages are `cat open-source/<id>.md` with markdown rendered glow-style (`.prose-term`: green `##` pseudo-prefixes on headings). 404 is a `bash: cd:` error. `TermRow.astro` is the shared `ls`-style listing row (name in blue, ISO date dim, description).

**Session-replay animation**: on load, commands "type" via a `clip-path` steps() animation (`.cmd-type`) and their output blocks fade in right after (`.seq-out`); stagger is driven by a `--seq` CSS var set inline (Cmd takes an `index` prop, outputs set `style="--seq: n"`). The final prompt cursor blinks (`.cursor-blink`). Everything is wrapped in `prefers-reduced-motion: no-preference`; layout is static (opacity/clip only, no CLS). When adding a home section, increment the `--seq` chain including the final prompt.

**Theming**: GitHub VS Code palettes (primer primitives): GitHub Light in `:root`, GitHub Dark Default under `:root[data-theme='dark']` plus a `prefers-color-scheme: dark` block guarded by `:not([data-theme='light'])`. Three-state selector (system/dark/light): `[theme: x]` button in the Layout header cycles and persists to `localStorage('theme')`; an inline head script applies the stored theme before paint. When changing palette values, update all three blocks plus the matching Shiki blocks.

**Layout** (`src/layouts/Layout.astro`): owns the full SEO head (canonical, OG/Twitter, JSON-LD via `structuredData` prop, RSS/sitemap links), the umami analytics script (prod-only, config in `UMAMI` const), the theme init script and toggle button. Renders the "Last login" line (build-time date) above every page.

**Content collections** (`src/content.config.ts`): `blog` and `projects`, loaded via Astro's `glob` loader from `src/content/<collection>/<slug>/index.md`. `generateId` strips the trailing `/index.md` so the folder name becomes the entry id (and the URL slug). Both schemas share `title`/`description`/`date`/`draft`; `projects` adds optional `demoURL`/`repoURL`, `blog` optional `repoURL`.

**Routing**: dynamic pages (`src/pages/blog/[...slug].astro`, `projects/[...slug].astro`) build from `getStaticPaths()`, which filters out `draft: true` entries; index pages sort by `date` desc. Non-HTML endpoints: `rss.xml.ts`, `robots.txt.ts`, plus sitemap via integration.

**Site config** (`src/consts.ts`): single source for site identity, email, availability line, umami config, `PRODUCTS` (Reviu, Kinora with spec rows), socials. Edit here, not in components. Product screenshots live in `src/images/products/<key>-{light,dark}.png` and render under each `ls products/` row (light/dark swap via the `dark:` variant, which is redefined in `global.css` to follow the 3-state theme).

**Imports**: path alias `@*` -> `src/*` (e.g. `@components/...`, `@layouts/...`, `@consts`, `@types`). Use it instead of relative paths.

**Whitespace**: Astro 7 defaults `compressHTML` to `'jsx'`, so a newline between two inline elements is stripped instead of collapsing to a space. Visible gaps in normal flow are written as explicit `{' '}` (prompt/command in `Cmd.astro`, `#` before detail-page titles, the hero `→` before the mailto link, prompt before the block cursor). Keep them; source indentation alone no longer renders a space. Rows built with `grid`/`flex` + `gap-*` (`TermRow.astro`, product rows, `[site]/[demo]/[src]` groups) need nothing.

**Styling**: Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config`; tokens live in `src/styles/global.css`). Terminal palette as `--t-*` CSS vars mapped through `@theme inline`: `back`, `soft`, `fg`, `bright`, `dim`, `line`, `blue` (single accent: file names, links, `##` prefixes), `red` (errors). Mono-blue on gray by owner choice: prompts are `dim`, no green/yellow/orange accents. Dark background uses Primer's canvas.inset (#010409), not canvas.default. Single font: IBM Plex Mono (fontsource, weights 400/500/600). Long-form markdown uses `.prose-term`; code blocks use Shiki dual themes `github-light-default`/`github-dark-default` with `defaultColor: false`.

**Design guardrails**: no pulsing/blinking elements (static block cursor only), no em-dashes in copy, keep the terminal metaphor consistent (real shell commands: `ls -t`, `cat`, `whoami`; ISO dates). og.png is the owner's recognizable avatar image; do not regenerate it. Favicons are generated from `src/images/avatar.png` (his GitHub/Reddit avatar, recognition matters).

## Deploy

`wrangler.jsonc` serves `dist/` as Cloudflare static assets. `astro.config.ts` sets `site` (used for sitemap/RSS absolute URLs).

## Conventions

ESLint uses `@antfu/eslint-config` (`eslint.config.js`) with Astro support and built-in formatters for CSS/HTML/Markdown. No Prettier. Run `pnpm lint:fix` for formatting.
