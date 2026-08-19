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
| `assets/img`  | Photography, renders, floorplans, logo                               |
| `assets/fonts`| Bebas Neue + DM Sans, self-hosted (no Google Fonts request)          |

### Editing content

Add or change a project in `projects.js` and everything downstream updates — the
grid card and the overlay. The first entry in `images` is the grid thumbnail and
the first carousel slide, so lead with the strongest shot.

The desktop hero is a separate, hand-picked list — `HERO_IMAGES` at the top of
the same file. It isn't derived from `PROJECTS` because the hero needs wide,
high-resolution frames and most gallery shots aren't. Slides and dots are both
generated from it, so they can't fall out of sync.

### Photography

Image files are named after the project they belong to. All five projects now
have real photographs; the renderings that remain are genuine project marketing
renders and sit *after* the photography in each gallery.

| Project | Files |
| ------- | ----- |
| The Rose Club | `rose-1..5` (numbering matches the source `Rose*.png`), plus `render1`, `render2` |
| Shaw Street | `shaw-1`, plus `shaw-render` and `render3` (two crops of one rendering) |
| Eton Terrace | `eton-wide`, `eton-bay` (hi-res), `eton-1..6` (1000 px) |
| Chiara Gardens | `chiara-wide`, `chiara-portico` (hi-res), `chiara-1..5` (1000 px) |
| Deer Park | `deerpark-winter` (hi-res), `deerpark-1..3` (1000 px) |

Originals live in `~/Downloads/URBANQUEST WEB PHOTOS/` and were re-encoded with
`sips` — 1920 px for hero frames, 1600 px for gallery frames, all under ~380 KB.
Re-encode from the originals, never from the files in `assets/img/`, which are
already lossy.

Not yet on the site: **1022 Spadina Road** (`Spadina *.png`, four images). It
wasn't in the client's list of five projects — confirm before adding it.

## Design

| Token       | Value     | Used for                       |
| ----------- | --------- | ------------------------------ |
| `--black`   | `#0D0D0D` | Page background                |
| `--white`   | `#F5F4F0` | Primary text                   |
| `--accent`  | `#9BA4AD` | ICONIC / VISION only — see below |
| `--label`   | white 68% | Micro-labels, tags, eyebrows   |
| `--rule`    | white 22% | Hairlines, dividers, borders   |
| `--gutter`  | `56px`    | Horizontal rhythm (fluid)      |

Type: **Bebas Neue** for display, **DM Sans** for body.

The slate `--accent` is a cool blue-grey and `--white` is a warm off-white; used
together broadly they read as a third colour competing with the black-and-white
scheme. So the slate is now limited to the three display-emphasis words — ICONIC,
VISION, and the contact heading. For anything else that wants to be "grey", use
the tonal steps of `--white` (`--label`, `--label-dim`, `--rule`, `--rule-soft`).

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
- [ ] **Portfolio copy is still prototype text.** The five project *names* are
      confirmed. Locations, years, unit counts, square footages, and
      descriptions are not. Three descriptions now visibly contradict the
      photography — Deer Park and Chiara Gardens describe a motor court and a
      garden mews, but both are photographed as street-fronting rows. See the
      per-entry `TODO` comments in `projects.js`.
- [ ] **Hero stats are unverified** — "24+ projects", "16yr", "$2B portfolio
      value" came from the prototype. Confirm or change.
- [ ] **Decide on 1022 Spadina Road.** Four images are sitting in the shoot
      folder for a project that isn't on the site. Add it or set it aside.
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
