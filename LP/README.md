# MP Assessoria Design System

Design system and UI kit for **MP Assessoria Digital** — a Brazilian digital-marketing consultancy helping revenue-generating business owners achieve **predictable, controlled growth**.

This folder is a living reference for designers and AI agents. It contains brand colors, type, logos, iconography, a React/HTML UI kit, and ready-to-use CSS tokens.

---

## About MP Assessoria Digital

**What they do.** Performance-driven digital marketing and paid-media consulting.
**Who they serve.** Brazilian business owners who *already have revenue* and want to scale in a controlled, measurable way.
**Proof points.** Concrete ROI metrics shown as bold callouts (e.g. "+130% de Faturamento").
**Brand voice.** Professional, direct, ROI-focused. Not playful. Serious and performance-oriented.
**Language.** Portuguese (Brazilian) — all copy examples use PT-BR.

## Sources provided

- `uploads/logo MP Assessoria (3).pdf` — original logo file supplied by the client. Copied to `assets/logo-mp-original.pdf`. The PDF is a layout sheet using the **M|P** monogram and the letter-spaced **ASSESSORIA** wordmark. **Caveat:** automated PDF → PNG rasterization failed in the sandbox, so logo SVGs in `assets/` are **reconstructions** based on the monogram + wordmark description. Please supply a vector export (AI/SVG) if available so we can swap them in pixel-perfect.
- Brand direction and component list provided in-chat (colors, type intent, sections).

No codebase or Figma was provided, so UI kit components are built **from the brand brief**, not from an existing site.

---

## Index — what's in this folder

```
README.md                       ← you are here
SKILL.md                        ← agent skill manifest (for Claude Code / skill invocation)
colors_and_type.css             ← CSS custom-property tokens (import everywhere)

assets/
  logo-mp-mark.svg              yellow M|P monogram
  logo-mp-mark-white.svg        white M|P monogram (for dark-on-light variants)
  logo-mp-full.svg              monogram + ASSESSORIA wordmark (yellow + white)
  logo-mp-full-black.svg        monogram + wordmark (black — for light surfaces)
  logo-mp-original.pdf          original PDF (reference)

preview/                        ← cards registered in the Design System tab
  colors-*.html
  type-*.html
  spacing-*.html
  components-*.html
  brand-*.html

ui_kits/
  website/                      Marketing-site UI kit
    index.html                  Interactive demo page (nav, hero, services, clients,
                                testimonials, contact form)
    README.md
    *.jsx                       Component files (Nav, Hero, ServiceCard, Metric,
                                Testimonial, ContactForm, Footer, Button)
```

---

## CONTENT FUNDAMENTALS

**Language.** PT-BR. Use Brazilian Portuguese spelling and phrasing. Examples: *"Faturamento"*, *"Resultados"*, *"Assessoria"*, *"Tráfego pago"*, *"ROI mensurável"*.

**Voice.**
- **Direct and assertive** — short, declarative sentences. No hedging.
- **Numbers-first** — lead with metrics whenever possible (*"+130% de Faturamento em 90 dias"*).
- **Second-person, formal-professional** — address the reader as *"você"*, not *"tu"*. Not corporate-stiff, but respectful.
- **Not playful.** No jokes, puns, or exclamation points. No emoji in marketing copy.
- **Outcome-oriented verbs.** *Escalar, crescer, dominar, previsível, controlado, mensurável, performance, resultado.*

**Casing.**
- Headlines: **Sentence case** for long titles; **UPPERCASE** for eyebrows/CTA labels.
- CTA labels: **UPPERCASE** + bold + tracking (`.08em`). Example: `AGENDAR DIAGNÓSTICO`.
- Navigation: Title Case or sentence case, never uppercase.
- Metrics: always prefixed with `+` or `x` where applicable (`+130%`, `x3`, `+R$ 2.4M`).

**Emoji.** ❌ Not used. Replace with icons or bold numerals.

**Copy examples (brand-voice tested).**
- Hero: *"Transforme tráfego em faturamento previsível."*
- Secondary: *"Gestão de marketing digital para empresas que querem crescer com controle, não com sorte."*
- Metric callout: *"+130% de faturamento médio em 6 meses"*
- CTA primary: `AGENDAR DIAGNÓSTICO GRATUITO`
- CTA secondary: `Conheça nossos cases`
- Service card title: *"Tráfego Pago"* / *"CRM e Automação"* / *"Consultoria Estratégica"*.

---

## VISUAL FOUNDATIONS

**Overall vibe.** Dark, premium, high-contrast. A single yellow accent carries *all* emphasis — CTAs, highlights, numbers, eyebrows. Think *financial-dashboard premium*, not *consumer app*.

**Color.**
- **Two surfaces, one accent.** `#0A0A0A` page, `#1A1A1A` cards, `#F5A623` accent. Avoid introducing new hues; use the neutral scale (0–1000) for depth.
- **No gradients** as primary backgrounds. A faint yellow radial glow is OK behind hero metrics (≤ 15% opacity). No bluish-purple tech gradients.
- **Accents are binary** — an element is either yellow (emphasized) or neutral. No half-yellow states.

**Typography.**
- **Display:** Montserrat — 800/900 for hero and metrics, 700 for section titles. Tight tracking (`-0.02em`).
- **Body:** Inter, 400/500, 16px, line-height 1.6. White (`#FFF`) for primary, `--gray-700` for secondary.
- **Eyebrows:** 12px Montserrat 700 uppercase, tracked `+0.08em`, colored `--accent`.
- **Wordmark echo.** The "ASSESSORIA" part of the logo uses ~0.18em letter-spacing — reserve that extreme tracking *only* for the logo lockup.

**Spacing.** 4px base grid. Sections breathe: `clamp(64px, 9vw, 128px)` vertical padding. Cards: 24px internal padding; 16px between stacked cards; 24–32px between grid cards.

**Backgrounds.**
- Page: flat `#0A0A0A`.
- Sections alternate `#0A0A0A` ↔ `#111111` for rhythm.
- Hero: flat black with an optional low-opacity yellow radial *behind* the metric number only.
- No full-bleed photos, no repeating patterns, no hand-drawn illustrations, no textures.

**Borders.**
- Hairline `1px solid #262626` on all cards (yes, every card). This is the defining card treatment.
- Accent border (`1px solid #F5A623`) only for the currently-active nav/tab or the featured testimonial.

**Shadows.**
- Very restrained on dark. Default: `0 12px 24px rgba(0,0,0,0.35)` + inset 1px top-highlight for subtle bevel.
- **Yellow glow** (`0 10px 40px rgba(245,166,35,0.25)`) only on the primary CTA on hover, or behind a hero metric.

**Corner radii.**
- Cards: **12px** (default) / **16px** (feature card).
- Inputs: 8px.
- CTA buttons: **pill** (`999px`) — this is the signature shape.
- Images/logo tiles: 8px.

**Cards.** Flat `#1A1A1A` fill + 1px `#262626` border + 12px radius + 24px padding. On hover: background `#1F1F1F`, border lifts to `#333`, translate-y `-2px`, 200ms ease-out. No big drop shadows.

**Buttons.**
- **Primary:** yellow `#F5A623` fill, **black** text, uppercase, bold, tracked `.08em`, pill shape, 14–16px height 48–56px. Hover: `#E0921A` + yellow glow + lift `-1px`. Active: `#C47C0F` + shrink `scale(0.98)`.
- **Ghost/secondary:** transparent fill, 1px white border 40% opacity, white text. Hover: border 100% opacity, background `rgba(255,255,255,0.04)`.

**Animation.**
- **Fades and subtle lifts** only. No bounces, no spring overshoots.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out) for 90% of transitions.
- Durations: hover 120ms, entrance 200–400ms, page scroll-ins 400–600ms.
- Scroll reveal: 16px upward + fade-in, staggered 60ms per card.
- Metric counters animate up on first view (0 → target over ~1.2s).
- Client-logo carousel: continuous linear scroll, 30s loop, pauses on hover.

**Hover states.** Slight lift (`translateY(-1px` to `-2px`), border brightening, yellow glow for CTAs. Never a color-shift from neutral → saturated for non-CTA elements.

**Press states.** Shrink `scale(0.98)` + darker fill (`--accent-active` for CTA). 80ms.

**Focus.** Yellow ring `0 0 0 2px var(--bg), 0 0 0 4px var(--accent)` — never skip focus rings.

**Transparency & blur.** Navbar: `rgba(10,10,10,0.8)` + `backdrop-filter: blur(12px)` when scrolled. Modals: `rgba(10,10,10,0.85)` backdrop, no blur. Otherwise avoid transparency.

**Imagery vibe.** If photos are used, they should be **warm-toned, grainy, high-contrast** — or, preferably, replaced with metric callouts and client logos. The brand leans on *numbers as imagery*.

**Layout rules.**
- Nav is **fixed top**, 72px tall, full-width, blurs on scroll.
- Max content width 1280px, centered, with `clamp(20px, 4vw, 48px)` side padding.
- Hero is 2-column on desktop, stacks on mobile; headline left, CTA stack left, optional metric panel right.
- Services grid: 3 columns desktop / 2 tablet / 1 mobile.
- Always leave a minimum 64px gap between sections.

---

## ICONOGRAPHY

**Primary icon library: [Lucide](https://lucide.dev/)** (CDN) — consistent 1.5–2px stroke weight, geometric, monochrome. Matches Montserrat's tone and the brand's minimalist-premium feel.

**Usage rules.**
- **Stroke weight** `2px`, never filled versions. Size defaults: 20px inline, 24px in buttons, 32px in service cards.
- **Color** `--accent` (yellow) on dark surfaces for *emphasis* icons (service cards, bullet checks). `--fg-2` (off-white) for *utility* icons (nav, menu, close).
- **Do not fill** icons with backgrounds. No rounded-square icon "chips" — icons sit on the card, not in a chip.
- **No emoji, no unicode symbols as icons.** The only unicode char intentionally used decoratively is the pipe `|` inside the M|P logo.
- **Common mappings** for MP services:
  - Tráfego Pago → `trending-up`
  - CRM / Automação → `workflow` or `zap`
  - Consultoria → `target`
  - Analytics → `bar-chart-3`
  - Social → `users`
  - Resultados → `rocket`

**Load via CDN (recommended for prototypes):**
```html
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="trending-up"></i>
<script>lucide.createIcons();</script>
```

**Logo usage.**
- `assets/logo-mp-mark.svg` — yellow monogram. Use in nav (24–32px tall), favicons, footers.
- `assets/logo-mp-full.svg` — monogram + wordmark. Use in hero, footer lockups, loading screens.
- `assets/logo-mp-mark-white.svg` / `logo-mp-full-black.svg` — alternates for non-standard backgrounds.
- Clear space: 1× the M's cap-height on all sides.
- Never stretch, recolor (beyond the approved yellow/white/black variants), or layer on complex backgrounds.

**Caveat.** The SVG logos in `assets/` are reconstructions of the monogram + wordmark from the original PDF (automated rasterization failed). If the client can provide the vector source, swap the SVGs for pixel-parity.

---

## Usage

Import tokens:
```html
<link rel="stylesheet" href="/colors_and_type.css">
```

All colors, type sizes, spacing, radii, and shadows are available as CSS custom properties (`var(--accent)`, `var(--bg-card)`, `var(--r-md)`, etc.).

See `ui_kits/website/` for a full working marketing-site implementation.
