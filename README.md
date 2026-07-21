# UrbanQuest Inc. — website

Static marketing site. No build step, no framework, no dependencies.
Open `index.html` through any web server and it runs.

## Local development

```sh
cd ~/Projects/urbanquest-site
python3 -m http.server 4321
# → http://localhost:4321
```

Edit a file, reload the browser. That's the whole loop.

## Files

| File          | Purpose                                                              |
| ------------- | -------------------------------------------------------------------- |
| `index.html`  | Page markup — nav, hero, about, portfolio, contact, footer, overlay  |
| `styles.css`  | All styling. Design tokens at the top, responsive rules at the bottom |
| `projects.js` | **Content lives here.** Portfolio entries and marquee text           |
| `app.js`      | Behaviour — slideshow, grid, filters, overlay carousel, nav, form    |
| `assets/img`  | Renders, floorplans, logo                                            |
| `assets/fonts`| Bebas Neue + DM Sans, self-hosted (no Google Fonts request)          |

### Editing content

Add or change a project in `projects.js` and everything downstream updates —
the grid card, the filter chips, and the overlay. The `category` field drives
the filter buttons, so a new category appears on its own. The first entry in
`images` is the grid thumbnail; the rest become the overlay carousel.

## Design

| Token       | Value     | Used for                       |
| ----------- | --------- | ------------------------------ |
| `--black`   | `#0D0D0D` | Page background                |
| `--white`   | `#F5F4F0` | Primary text                   |
| `--accent`  | `#9BA4AD` | Slate accent, buttons, rules    |
| `--gutter`  | `56px`    | Horizontal rhythm (fluid)      |

Type: **Bebas Neue** for display, **DM Sans** for body.

Breakpoints: `1200` (tighter gutters, hero stats drop) · `1024` (portfolio to
2-up, overlay stacks) · `900` (nav becomes a drawer) · `768` (single column) ·
`560` (small phones).

## Open items

**Before launch:**

- [ ] **Contact form has no backend.** It validates and fakes a send. Wire the
      submit handler in `app.js` to a real endpoint (Formspree, Netlify Forms,
      or an API route) — see the `TODO` there.
- [ ] **Placeholder contact details.** The address (320 Bay Street), phone
      (`+1 416 555 0182`), and email in `index.html` are invented. Replace them.
- [ ] **Seed portfolio data.** All five projects in `projects.js` carry
      prototype copy and specs. Replace with real project data.
- [ ] **Hero stats are unverified** — "24+ projects", "16yr", "$2B portfolio
      value" came from the prototype. Confirm or change.
- [ ] **Swap in real photography.** 14 professional shots are sitting in
      `~/Downloads/URBANQUEST WEB PHOTOS/`. The site currently runs on AI
      renders.
- [ ] **Optimise images.** `render3.png` is 4.3 MB and `render2.png` is 3.0 MB —
      about 8 MB of PNG total. Convert to WebP/JPEG (target < 300 KB each) and
      add `<picture>` fallbacks. Do this after the real photos land.
- [ ] Privacy link in the footer points to `#`.

**Nice to have:**

- [ ] Open Graph / Twitter card meta tags for link previews.
- [ ] A real favicon set (currently reuses `logo.png`).
- [ ] `sitemap.xml` + `robots.txt`.

## Notes for future edits

Two things in `styles.css` look odd but are load-bearing:

1. **The nav's background lives on `nav::before`, never on `nav`.**
   `backdrop-filter` on an element makes it a containing block for its
   `position: fixed` descendants — putting it on `<nav>` traps the mobile
   drawer inside the 80px bar instead of letting it cover the screen.

2. **The logo uses `filter: invert(1)` + `mix-blend-mode: screen`.**
   `logo.png` is black artwork on an opaque white background with no alpha
   channel. Inverting flips it to white-on-black, and `screen` drops the black
   to transparent. If you ever get a proper transparent-PNG or SVG logo,
   delete both properties.

## Deploying

It's static, so anything works. Drag the folder onto Netlify, or:

```sh
npx vercel deploy
```

No build command, no output directory — the repository root *is* the site.
