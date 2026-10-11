# SIBAQ KUTTIKKATTUR — Full Build Plan (v2, updated direction)

## Changes from your feedback
- **English only** — no Malayalam words anywhere; no Malayalam font.
- **Minimal text, rich art** — short punchy headlines and micro-copy; storytelling through illustration, pattern and motion instead of paragraphs.
- **Moody festive creativity instead of white** — deep, celebratory color world with vibrant festival energy (details below). The white remark is discarded as requested.

## What exists today (preserved, nothing deleted)
- Broken static site (`index.html`, `sponsor.html` — missing `style.css`/`script.js`) → harvest facts: venue (Mavoor–Kozhikode Road), phone/WhatsApp +91 95620 08296, Edumart Book Fest '26, donation portal, ₹150 Edumart voucher concept, stats.
- `sibaqlogo.jpg` → official logo asset. `SIBAQ FNL BROUCHER 1.pdf` → fact source (stats, sponsor tiers, book fest).
- All 4 originals move intact into `_legacy/`.

## Imagery policy (enforced everywhere)
1. **No images of women anywhere.** 2. Prefer non-figurative art: geometric diamonds, patterns, calligraphy-inspired motifs, architecture/venue shots. 3. Every image extracted from the old HTML is vetted visually before reuse. 4. Team page uses geometric monogram avatars; admin shows a content-policy notice.

## Design direction — moody festive
- **Palette:** deep festive base (near-black plum/maroon, e.g. `#16090E` / `#1D0F14`) with vibrant red-orange `#FF4D2E`, marigold `#FFB300`, festival green `#2FB86B`, gold accents; occasional light cream panels for contrast and breathing room.
- **Typography:** Archivo Black / Anton-style heavy display + Plus Jakarta Sans body. English only.
- **Art & illustration:** geometric diamond systems, radiating festival motifs, marquee ribbons, abstract "stage lights" glows, confetti geometry, patterned section dividers — CSS/SVG art, no stock illustrations, no figurative people.
- **Mood:** celebration — subtle glow, motion, color blocking; disciplined typography keeps it premium, not noisy. Text stays minimal everywhere.

## Stack (works out of the box, no external credentials)
- **Frontend:** Vite + React + TypeScript + React Router, Tailwind CSS, CSS keyframes for animation.
- **Backend:** Node + Express + SQLite (`better-sqlite3`) — API, session-cookie admin auth (bcrypt), uploads, serves the built site in production. `npm run dev` / `npm start`.
- Requires Node.js ≥ 18 — checked first; if missing I stop and report.

## Pages (mobile-first)
`/` → `/about` → `/partners` → `/game` → `/edumart-book-fest` → `/team` → `/media` → `/donation` → `/promote` → `/sponsors` → `/admin` → 404.

**Home:** session-once preloader (logo + geometric build-up) → "What is SIBAQ?" intro (~5–6 s typographic/visual sequence, then **auto-scroll** — canceled by any touch/scroll, skippable, reduced-motion-safe) → stats (10,000+ / 4,000+ / 400+ / 35+, count-up once) → moving festival ribbon → partner showcase → "Ready to PLAY?" card → footer.

**Floating:** circular Play button (pulsing ring → `/game`) + FAQ chat widget (admin-managed, no fake AI).

## Game system (server-validated)
Daily quiz (answer never sent to client; server timestamps) → leaderboard (earliest correct wins; tie rules documented; today vs past days; winner shown only after admin confirms) → vouchers (admin-configured, empty until real data) → native Share + copy-link fallback.

## Admin CMS (`/admin`)
Authenticated CRUD + uploads for: settings/copy, stats, partners, team, media, book fest, donation QR + text, sponsor packages (conflicting brochure prices stay unpublished), quiz questions + schedule, leaderboard review, vouchers, FAQs, nav/footer.

## Data & config
SQLite tables: `settings, stats, partners, team_members, media_items, quiz_questions, quiz_submissions, vouchers, sponsor_packages, enquiries, faqs`. `.env.example`: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `PORT`.

## Build & verification
1. Scaffold; extract + vet legacy images; harvest facts (incl. brochure pages).
2. Design tokens + shell (header, drawer, footer, floating controls).
3. Home experience → all pages.
4. Backend API + admin CMS + quiz/leaderboard/vouchers.
5. Test: typecheck, lint, production build; browser GUI testing at 390×844 (nav, intro auto-scroll cancel, quiz submit, admin CRUD, forms); visual judge pass on screenshots of every page; fix failures.
6. Deliver README (run/deploy/admin login/leaderboard rules), `.env.example`, and a checklist of assets the committee must still supply (final logo, compliant photos/videos, partner logos, real questions, voucher details).