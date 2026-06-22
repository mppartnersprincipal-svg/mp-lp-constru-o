---
name: mp-assessoria-design
description: Use this skill to generate well-branded interfaces and assets for MP Assessoria Digital, either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, logos, iconography, and UI kit components for prototyping a performance-driven, dark-themed marketing brand.
user-invocable: true
---

# MP Assessoria Design Skill

Read `README.md` at the root of this skill/project for full brand context, content tone, visual foundations, and iconography rules.

Key files:
- `README.md` — brand overview, CONTENT FUNDAMENTALS, VISUAL FOUNDATIONS, ICONOGRAPHY
- `colors_and_type.css` — CSS custom properties (colors, type, spacing, radii, shadows, motion)
- `assets/` — logo SVGs (full lockup, monogram, black and white variants)
- `ui_kits/website/` — marketing-site UI kit with React/JSX components and a working `index.html` demo
- `preview/` — atomic design-system cards (colors, type, spacing, components, brand)

## When working on this brand

If creating visual artifacts (slides, mocks, throwaway prototypes), **copy assets out** of `assets/`, **import** `colors_and_type.css`, and create static HTML files for the user to view.

If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without further guidance, ask what they want to build, ask a few targeted questions (audience, surface, tone, length), and act as an expert designer who outputs HTML artifacts *or* production-ready code depending on need.

## Non-negotiables

- Dark-first surfaces (`#0A0A0A` page / `#1A1A1A` cards). Never a white page by default.
- One accent: yellow `#F5A623`. No other hues except semantic (success/danger).
- Montserrat 900 for display + metrics; Inter 400/500 for body.
- Pill-shaped CTAs, uppercase labels, tracked `.08em`, black text on yellow.
- 1px `#262626` hairline border on every card.
- No emoji, no gradients as backgrounds, no playful tone. Portuguese (BR) copy.
- Use Lucide icons at 2px stroke; yellow for emphasis, neutral for utility.
