# mido website

The landing page for [mido](https://github.com/alessandromalacarne/mido) — the
guardrail runner for AI-built software. Built with [Astro](https://astro.build)
as a fully static site.

- English (default): `/`
- Portuguese: `/pt/`

This is a separate repository from `mido`. It is not part of the mido crate and
must not be committed to the parent repository.

## Requirements

- Node.js **>= 22.23.4** (Astro 7's minimum)
- npm >= 9.6.5

The Node version pinned by the mido dev shell is older than Astro 7 accepts. If
`npm run dev` or `npm run build` fails on the Node version check, run the
commands through a newer Node, for example:

```sh
nix shell nixpkgs#nodejs_24 -c npm --prefix . run build
```

## Commands

```sh
npm install       # install dependencies
npm run dev       # dev server at http://localhost:4321
npm run build     # static build into dist/
npm run preview   # serve the built site
npm run check     # Astro + TypeScript diagnostics
```

`dist/` is the deployable artifact. Upload it to any static host (Cloudflare
Pages, Netlify, GitHub Pages, an object store, …). No server runtime is needed.

## Editing content

All copy lives in two typed dictionaries:

- `src/i18n/en.ts` — English (the source of truth for the `Copy` type)
- `src/i18n/pt.ts` — Portuguese, must satisfy the same `Copy` type

Update both files together; `npm run check` fails if the Portuguese dictionary
drifts from the English shape. CLI output and verdict names (`SHIP-READY`,
`INCOMPLETE`, `SKIPPED`, …) stay in English in both versions because they are
literal mido output.

## Structure

```text
src/
  components/    page sections and shared UI
  i18n/          English and Portuguese copy
  layouts/       document shell, metadata, hreflang, OG tags
  lib/           outbound links and install command
  pages/         index.astro (/) and pt/index.astro (/pt/)
  scripts/       menu, clipboard, header and reveal behavior
  styles/        tokens, typography and global styles
public/          favicon, touch icon, OG image, manifest, robots.txt
```

Fonts are self-hosted through Fontsource (Fraunces, Manrope, JetBrains Mono),
so the page makes no third-party font requests.

## Before deploying

`astro.config.mjs` does not set `site` yet. Once the production domain is known,
set it there so canonical and social URLs can be absolute. The Open Graph image
is `public/og.png` (1200×630) and is served from `/og.png` on both locales.
