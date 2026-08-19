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
| `assets/img/`  | Photography (`eton-*`, `chiara-*`, `deerpark-*`), renders, logo    |
| `assets/fonts/`| Bebas Neue + DM Sans, self-hosted                                 |

Content changes belong in `projects.js`, not in markup. The hero slideshow, the
grid, and the project overlay all derive from it.

- `HERO_IMAGES` — the desktop hero. Deliberately hand-picked, *not* derived from
  `PROJECTS`: the hero needs wide, high-resolution, high-contrast frames and most
  gallery shots are neither. Slides and dots are both generated from it, so the
  two can never fall out of sync.
- `PROJECTS[].images` — first entry is the grid thumbnail *and* the first
  carousel slide, so lead with the strongest shot. Built photography goes before
  marketing renderings.

There are no portfolio filter chips. They previously split the work into
"Townhomes" and "Residential", which the client considers the same thing, so the
filter UI and the `category` field it read are both gone. Don't reintroduce them.

## Design system

| Token          | Value     | Role                        |
| -------------- | --------- | --------------------------- |
| `--black`      | `#0D0D0D` | Page background             |
| `--black-deep` | `#080808` | Portfolio section           |
| `--white`      | `#F5F4F0` | Primary text                |
| `--accent`     | `#9BA4AD` | **ICONIC / VISION only** — see below |
| `--label`      | white 68% | Micro-labels, tags, eyebrows |
| `--rule`       | white 22% | Hairlines, dividers, borders |
| `--gutter`     | `56px`    | Horizontal rhythm (fluid)   |

Type: **Bebas Neue** display, **DM Sans** body. The look is dark editorial —
wide letter-spacing, uppercase micro-labels, generous negative space, restrained
motion. Match that register; avoid rounded corners, drop shadows, and bright
colour.

### The slate accent is rationed

`--accent` (`#9BA4AD`) is a *cool* blue-grey; `--white` is a *warm* off-white.
Used broadly the two read as a third colour fighting the black-and-white scheme,
which is exactly what it used to do — it was on buttons, rules, borders, labels,
the marquee band, and every active dot.

It now appears in three places only: the **ICONIC** line in the hero, **VISION**
in the about heading, and the emphasis word in the contact heading. That is the
display-emphasis device, and it is the whole budget.

Everywhere else, use the tonal steps of `--white` — `--label`, `--label-dim`,
`--rule`, `--rule-soft`. They carry the same hierarchy without adding a hue.
**When you want "a grey", reach for those, never for `--accent`.** Solid fills
(buttons, marquee band, active dots, skip link) are `--white` on `--black`.

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
- The five project **names** in `projects.js` are confirmed and correct.
  Everything else about them — location, year, units, sq ft, description — is
  still prototype copy.
- Hero stats ("24+ projects", "16yr", "$2B") are unverified.
- **All five projects now carry real photography.** The remaining renderings
  (`render1–3`, `shaw-render`) are genuine project marketing renders, not AI
  placeholders, and sit behind the photography in each gallery.
- There is a sixth project in the shoot folder — **1022 Spadina Road** (four
  images, exterior and interior). It is not in `PROJECTS` because the client's
  list of five did not include it. Ask before adding it.

Three descriptions actively contradict the photographs now sitting next to them
— Deer Park claims a "concealed motor court" and Chiara Gardens a "central
garden mews", but both were shot as street-fronting rows. Those conflicts are
flagged per-entry in `projects.js` and should be rewritten before launch.

Never present placeholder figures as real, and flag them when touching
surrounding code.

**"Eton", not "Eaton".** The project is Eton Terrace; the prototype had it
misspelled and it has been corrected.

## Known gaps

- The contact form validates and fakes a send. There is no backend. See the
  `TODO` in `app.js`.
- The first batch of shoot exports (`eton-1..6`, `chiara-1..5`, `deerpark-1..3`)
  are only 1000 px wide and are used as supporting gallery frames. The later
  hi-res files (`*-wide`, `*-bay`, `*-portico`, `*-winter`, `rose-*`) are
  3024 px originals and carry the hero and the grid thumbnails.
- Footer privacy link points to `#`.

## Conventions

- Four-space indentation, single quotes in JS, no semicolons.
- Canadian/British spelling in user-facing copy ("neighbourhood", "optimise") —
  the firm is Toronto-based.
- Sentence case for UI text; uppercase is a styling choice via CSS, not baked
  into the markup.
- Keep `index.html` semantic and accessible: the skip link, ARIA state on the
  nav toggle and carousel, and visible focus styles are all deliberate.
