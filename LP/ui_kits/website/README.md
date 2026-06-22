# Website UI Kit — MP Assessoria Digital

Interactive recreation of the MP Assessoria marketing website, broken into small reusable components.

## Files

- `index.html` — wires everything together into a scrollable, click-through marketing page
- `Button.jsx` — primary / ghost / dark pill buttons with hover + active states
- `Nav.jsx` — fixed top navigation, blurs on scroll
- `Hero.jsx` — headline + dual CTA + metric grid (includes `MetricTile`)
- `Services.jsx` — 3-column service grid (includes `ServiceCard`)
- `Clients.jsx` — animated logo carousel + stats strip
- `Testimonials.jsx` — 3-column testimonial grid with avatars
- `ContactForm.jsx` — full validated form (includes `Input`, `Contact`)
- `Footer.jsx` — 4-column footer with logo + contact info

## Usage

Components register themselves on `window`, so import them sequentially as Babel scripts:

```html
<script src="../../colors_and_type.css" rel="stylesheet">
<script src="https://unpkg.com/lucide@latest"></script>
<script type="text/babel" src="Button.jsx"></script>
<script type="text/babel" src="Nav.jsx"></script>
...
```

See `index.html` for the full working demo.
