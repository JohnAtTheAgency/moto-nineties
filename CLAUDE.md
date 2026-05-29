# Moto Nineties — Project Brief
_Generated May 29, 2026 from The Agency. Regenerate with `generate_project_brief(16)` as the project evolves._

## Client
Feature-length motocross documentary. McGrath vs Emig rivalry, late 90s era. Coming Summer 2026.
- **Trailer:** thehammerfactory.com
- **Instagram:** @moto.nineties
- **Stage:** active

## Project
- **Phase:** build
- **Repo:** https://github.com/JohnAtTheAgency/moto-nineties
- **Cloudflare project:** moto-nineties
- **Live URL:** https://moto-nineties.john-cf7.workers.dev/

## Design Tokens
These map to the Tailwind theme in `src/styles/global.css`:

| Token | Value | Tailwind class |
|---|---|---|
| Primary / action | `#d81d28` | `text-red`, `bg-red` |
| Secondary | `#04377c` | `text-blue`, `bg-blue` |
| Background | `#080808` | `bg-ink`, `text-ink` |
| Foreground | `#f0ebe3` | `text-paper`, `bg-paper` |
| Muted | `#9a9a9a` | `text-smoke` |

**Fonts:**
- `font-display` → Anton (headlines, nav, buttons — always uppercase)
- `font-sans` → Inter (body copy, captions)
- `font-racing` → RacingMarkRace (loaded from /public/fonts/ — use sparingly)

**Utilities:**
- `.red-rule` — 3px red horizontal rule, used as a section divider
- `.photo-bw` — grayscale + contrast treatment for photos
- `.section` — standard section padding via clamp()

## Sitemap
All 5 pages exist. Do not add pages without updating the sitemap in The Agency app.

| Page | File | Status |
|---|---|---|
| Home | `src/pages/index.astro` | Built |
| The Film | `src/pages/the-film.astro` | Built |
| The Riders | `src/pages/the-riders.astro` | Built |
| Merch | `src/pages/merch.astro` | Built — Shopify placeholder |
| Where to Watch | `src/pages/where-to-watch.astro` | Built — dates TBA |

## Open Items
1. **Email capture** — forms write to `localStorage` only. Needs Klaviyo or Mailchimp.
2. **Trailer player** — placeholder linking to thehammerfactory.com. Real embed TBD.
3. **Screening dates** — all TBA placeholders on Where to Watch.
4. **Shopify embed** — Merch page placeholder. Shop launches with the film.

## Session Start
At the start of any Claude Code session for this project:
1. Call `get_brief(16)` via the prop-os MCP tool to get the latest tokens, sitemap, and notes
2. Check for new open items or content changes since this file was generated
3. Read the relevant page file before editing — don't assume structure from memory
4. Use real content only — no placeholder text

_The global design principles are in ~/.claude/CLAUDE.md. This file is the client-specific layer on top._

## Deploy
**After every session — commit and push so Cloudflare rebuilds automatically:**

```bash
git add .
git commit -m "describe what changed"
git push
```

Cloudflare detects the push and rebuilds in ~2 minutes. The live URL updates automatically.

To force a rebuild without new code: open The Agency app → Moto Nineties → Web Project → Deploy → **Deploy Now**.

Do not skip the commit step. Changes that aren't pushed aren't deployed.
