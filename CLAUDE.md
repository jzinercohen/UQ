# UrbanQuest Inc. — website

Marketing site for a Toronto real estate development and architectural design
firm specializing in luxury boutique townhomes.

**This project is standalone.** It has no relationship to any other repository
on this machine, shares no tooling with them, and has no dependencies at all.

## Stack

Plain HTML, CSS, and JavaScript. No framework, no build step, no `package.json`,
no `node_modules`. Editing a file and reloading the browser is the entire
development loop.

Keep it that way. Do not introduce a bundler, a framework, a CSS preprocessor,
or an npm dependency without asking first — the whole point of this setup is
that anyone can open the files and edit them.

## Running it

Use `preview_start` with the `site` config in `.claude/launch.json`, which
serves the folder at http://localhost:4321. Verify changes in the browser
rather than asking the user to check by hand.

## Files

| File           | Purpose                                                           |
| -------------- | ----------------------------------------------------------------- |
| `index.html`   | All markup — nav, hero, about, portfolio, contact, footer, overlay |
| `styles.css`   | All styling. Tokens at the top, responsive rules at the bottom     |
| `projects.js`  | **Content.** Portfolio entries and marquee text                   |
| `app.js`       | Behaviour — slideshow, grid, filters, overlay, nav, form          |
| `assets/img/`  | Renders, floorplans, logo                                         |
| `assets/fonts/`| Bebas Neue + DM Sans, self-hosted                                 |

Content changes belong in `projects.js`, not in markup. The grid, the filter
chips, and the project overlay all derive from it — including the filter
categories, so a new `category` value creates its own chip.

## Design system

| Token          | Value     | Role                        |
| -------------- | --------- | --------------------------- |
| `--black`      | `#0D0D0D` | Page background             |
| `--black-deep` | `#080808` | Portfolio section           |
| `--white`      | `#F5F4F0` | Primary text                |
| `--accent`     | `#9BA4AD` | Slate accent, buttons, rules |
| `--gutter`     | `56px`    | Horizontal rhythm (fluid)   |

Type: **Bebas Neue** display, **DM Sans** body. The look is dark editorial —
wide letter-spacing, uppercase micro-labels, generous negative space, restrained
motion. Match that register; avoid rounded corners, drop shadows, and bright
colour.

### Breakpoints

`1200` gutters tighten, hero stats drop · `1024` portfolio to 2-up, overlay
stacks · `900` nav becomes a drawer · `768` single column · `560` small phones.

Always check a change at both mobile (390px) and desktop (1440px) before
calling it done. The original prototype had no responsive rules whatsoever, so
anything inherited from it is suspect until verified at narrow widths.

## Load-bearing weirdness

Two rules in `styles.css` look wrong and are not. Do not "clean up" either:

1. **The nav's background lives on `nav::before`, never on `nav` itself.**
   `backdrop-filter` makes an element a containing block for its
   `position: fixed` descendants. Putting it on `<nav>` traps the mobile drawer
   inside the 80px bar — it renders 402×80 instead of covering the viewport.

2. **The logo uses `filter: invert(1)` + `mix-blend-mode: screen`.**
   `logo.png` is black artwork on an opaque white background with **no alpha
   channel**. Inverting flips it to white-on-black; `screen` drops the black to
   transparent. If a real transparent PNG or SVG logo ever arrives, delete both
   properties and this note.

## Content status

Everything user-facing is placeholder until told otherwise:

- Contact address, phone, and email in `index.html` are invented.
- All five projects in `projects.js` carry prototype copy and specs.
- Hero stats ("24+ projects", "16yr", "$2B") are unverified.
- Images are AI renders. Real photography is pending.

Never present placeholder figures as real, and flag them when touching
surrounding code.

## Known gaps

- The contact form validates and fakes a send. There is no backend. See the
  `TODO` in `app.js`.
- `render3.png` (4.3 MB) and `render2.png` (3.0 MB) are unoptimised — roughly
  8 MB of PNG total. Convert to WebP/JPEG when the real photos land.
- Footer privacy link points to `#`.

## Conventions

- Four-space indentation, single quotes in JS, no semicolons.
- Canadian/British spelling in user-facing copy ("neighbourhood", "optimise") —
  the firm is Toronto-based.
- Sentence case for UI text; uppercase is a styling choice via CSS, not baked
  into the markup.
- Keep `index.html` semantic and accessible: the skip link, ARIA state on the
  nav toggle and carousel, and visible focus styles are all deliberate.
