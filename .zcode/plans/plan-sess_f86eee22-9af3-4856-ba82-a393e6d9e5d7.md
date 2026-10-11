# Plan: Use the supplied SVG logo in header, preloader, and footer

Goal: the animated SIBAQ SVG (`D:\EEK ADS\sibaq-preloader.svg`) becomes the brand mark everywhere the logo appears — sticky top header, preloader, footer — replacing the old `/media/brand-lockup.jpg`. No routes, DB, or backend changes.

## 1. Add two SVG assets (new files)

The SVG currently exists only in `D:\EEK ADS\` — nothing in the project references any `.svg` yet. Static assets are served Vite-style from `public/` with root-relative URLs.

- **`public/media/sibaq-preloader.svg`** — verbatim copy of the supplied file, with one addition inside its embedded `<style>`: a `@media (prefers-reduced-motion: reduce)` block that turns off the animations (accessibility; visually identical for everyone else).
- **`public/media/sibaq-logo.svg`** — derived header/footer variant, same artwork with:
  - the `<g id="loading-indicator">` capsule loading bar removed (a perpetual loading bar makes no sense in a persistent header/footer),
  - viewBox tightened from `0 0 1020 375` to `0 30 1020 300` (artwork spans y=38–326) so no dead space pads the lockup,
  - the same reduced-motion guard.
  Colors, gradients, shimmer sweep, and outline-trace animations stay exactly as supplied. (Both files used via `<img>`, so their internal gradient/animation IDs can't collide.)

## 2. Header — `src/components/SiteHeader.tsx` (sticky behavior already exists)

The header is already `fixed inset-x-0 top-0 z-50` with a scroll-blur state, so the logo already "sticks" while scrolling — no positioning change needed. Only the logo block (lines 50–56) changes:

- Replace `{s && <img src={s.logo} ...rounded-md bg-cream/95 p-1...>}` **plus the duplicate "SIBAQ / Kuttikkattur" text span** with a single `<img src="/media/sibaq-logo.svg" alt="SIBAQ @Kuttikkattur" className="h-10 w-auto" />` (height fine-tuned during visual check).
- Drop the cream chip/padding — the SVG is transparent and self-contained.
- Per your choices: full lockup (wordmark + @KUTTIKKATTUR), animations kept, duplicate text removed.
- Hardcode the path instead of the DB-driven `s.logo`: no admin UI edits the site logo anyway, and this removes an API dependency from the brand mark. `s` stays in use for the drawer's date/venue block.

## 3. Preloader — `src/components/Preloader.tsx`

- Swap the logo `<img>` (line 54) to `src="/media/sibaq-preloader.svg"` — the full artwork with its own animated green/yellow/orange capsule loader. Transparent SVG directly on `bg-paper`, so drop the cream chip/shadow; size by width (`w-72 max-w-[80vw] h-auto animate-pop`) so the 2.72:1 artwork fits mobile.
- Remove the now-duplicate text block ("SIBAQ" + "Kuttikkattur · 2K26", lines 58–61) — the artwork carries it. Keep the existing gradient progress bar + timing logic (honest, hard-capped at 2.6s) as the percentage indicator.
- Since the src is hardcoded, render it unconditionally and remove the now-unused `useSite` import/`site` variable and the placeholder branch.

## 4. Footer — `src/components/SiteFooter.tsx`

- Line 14: swap to `src="/media/sibaq-logo.svg"` (`h-10 w-auto`, no chip) and remove the adjacent duplicate "SIBAQ / Kuttikkattur · 2K26" text block — the tagline line below keeps the edition info.

## 5. Verification

1. `npm run dev`, then browser screenshots at desktop (1280px) and mobile (390px): preloader on a fresh session, header at top and scrolled (confirm the SVG logo stays pinned with the blur bar), footer.
2. Confirm: crisp rendering, no duplicate text, capsule loading bar only in the preloader, animations looping, no layout shift or horizontal overflow.
3. `npm run build` — confirm both SVGs are emitted to `dist/media/`.

## Files touched

New: `public/media/sibaq-preloader.svg`, `public/media/sibaq-logo.svg` · Modified: `src/components/SiteHeader.tsx`, `src/components/Preloader.tsx`, `src/components/SiteFooter.tsx` · Untouched: DB, seed, routes, all other pages. (The full CHANGE-09 preloader lifecycle rework from your brief remains a separate task — this only swaps its artwork.)