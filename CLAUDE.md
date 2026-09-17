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

Use `preview_start` with the `site` config in `.claude/launch.json`, which runs
`.claude/serve.py` at http://localhost:4321. Verify changes in the browser
rather than asking the user to check by hand.

`serve.py` is a few lines of stdlib around `SimpleHTTPRequestHandler` (no
dependency — the no-build rule still holds). It exists because plain
`python3 -m http.server` breaks the edit-and-reload loop two ways: it sends no
cache headers, so browsers serve stale `projects.js`/`styles.css` after an edit,
and it omits `SO_REUSEADDR`, so a quick restart dies with "Address already in
use". Both are fixed there. **If a change does not appear in the browser, the
tab is holding a cache entry from before this server existed** — load the page
once with a query string (`/?x=1`) to replace it.

## Deploying

Hosted on MSP corporate hosting via cPanel, uploaded by hand. **Nothing pulls
from GitHub — merging a PR does not put anything live.** See the Deploying
section of `README.md` for the full loop.

The part that bites: if **NGINX caching** is on, it must be turned off in
cPanel before uploading and turned back on (and the cache cleared) afterwards,
or the old `styles.css` / `projects.js` keeps being served. It is currently
**inactive**, so uploads appear immediately — but do not assume that.

Never upload the whole repo. Only `index.html`, `styles.css`, `projects.js`,
`app.js`, and `assets/`.

## Files

| File            | Purpose                                                           |
| --------------- | ----------------------------------------------------------------- |
| `index.html`    | All markup — nav, hero, about, portfolio, contact, footer, overlay |
| `styles.css`    | All styling. Tokens at the top, responsive rules at the bottom     |
| `projects.js`   | **Content.** Portfolio entries and marquee text                   |
| `app.js`        | Behaviour — slideshow, grid, overlay, nav, form, copy-email        |
| `assets/img/`   | Photography (`eton-*`, `chiara-*`, `shaw-*`, …), renders, logo     |
| `assets/fonts/` | Bebas Neue + DM Sans, self-hosted                                 |
| `.claude/serve.py` | Dev server. Not part of the deployed site                      |

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

`1200` gutters tighten, the hero's Design/Develop/Build rail drops · `1024`
portfolio to 2-up, overlay stacks · `900` nav becomes a drawer · `768` single
column · `560` small phones.

Always check a change at both mobile (390px) and desktop (1440px) before
calling it done. The original prototype had no responsive rules whatsoever, so
anything inherited from it is suspect until verified at narrow widths.

## Load-bearing weirdness

Four rules look wrong and are not. Do not "clean up" any of them:

1. **The nav's background lives on `nav::before`, never on `nav` itself.**
   `backdrop-filter` makes an element a containing block for its
   `position: fixed` descendants. Putting it on `<nav>` traps the mobile drawer
   inside the 80px bar — it renders 402×80 instead of covering the viewport.

2. **The logo uses `filter: invert(1)` + `mix-blend-mode: screen`.**
   `logo.png` is black artwork on an opaque white background with **no alpha
   channel**. Inverting flips it to white-on-black; `screen` drops the black to
   transparent. If a real transparent PNG or SVG logo ever arrives, delete both
   properties and this note. `favicon.png` is the same mark pre-inverted and
   padded square — browsers squash the 413×210 `logo.png` in a favicon slot.

3. **`.nav-logo::before/::after` are held at `opacity: 0` until hover.**
   They draw the stroke that forms around the logo. At their collapsed size
   their 1px borders still paint, which showed as two stray dots beside the
   mark. The opacity is what hides them, not the zero width/height.

4. **The carousel arrows' four `drop-shadow()`s are declared at low alpha,
   never omitted.** They are zero-blur offsets — one per direction — that trace
   a hard outline around the glyph rather than a glow. A filter list can only
   animate into another list of the same length, so dropping them from the base
   state would make the hover snap instead of ease.

## Content status

Most user-facing copy is still placeholder until told otherwise:

- Contact address and phone in `index.html` are invented. The email
  (`glen@urbanquestinc.com`) is **real** — it has a copy-to-clipboard button.
- **"Established 1996"** is confirmed and appears in both the hero eyebrow and
  the hero subtitle.
- All six project **names** in `projects.js` are confirmed. Everything else —
  location, year, units, description — is still prototype copy.
- **All six projects carry real photography.** The renderings (`render1–3`,
  `rose-render`) are genuine marketing renders, not AI placeholders. They sit
  behind the photography in each gallery, except at Rose Club where the client
  asked for the twilight render to lead.
- **Every project needs a build year.** Five have one; `1020–1022 Spadina Road`
  still shows `—` for year, units, and status, because the shoot folder supplied
  only a name and four images.

Descriptions that contradict their photographs — Deer Park's "concealed motor
court" and Chiara Gardens' "central garden mews" were both shot as
street-fronting rows; Rose Club's "hand-laid stone and warm oak" is a
stacked-stone and cedar row. Flagged per-entry in `projects.js`; rewrite before
launch.

Door numbers do not match two project names: Shaw Street's photography shows
466/468/470/478 *and* 31/33/35/39, and the project is called 456. Eton Terrace
shows 239/333 on St Clair Ave W while its location reads "Midtown".

Never present placeholder figures as real, and flag them when touching
surrounding code.

**"Eton", not "Eaton".** The project is Eton Terrace; the prototype had it
misspelled and it has been corrected.

## Known gaps

- The contact form validates and fakes a send. There is no backend. See the
  `TODO` in `app.js`.
- Several sources are low-resolution and must not be upscaled: the first shoot
  exports (`eton-1..6`, `chiara-3..5`, `deerpark-1..3`) are 1000 px, and
  `rose-render`/`render1` are 800 px. They are fine at gallery and thumbnail
  size but too soft for a full-bleed hero slide — which is why `HERO_IMAGES`
  uses the 1800–3024 px files.
- **Chiara skies are colour-corrected in the files themselves.** A hue-selective
  blue lift, applied per-pixel via Core Image, gated on brightness *and*
  blue-dominance. Both gates matter: shadowed cream stucco sits in the same hue
  band, and without them the whole facade turns blue. Re-exporting any
  `chiara-*` file from the original drops the correction.
- Footer privacy link points to `#`.

## Conventions

- Four-space indentation, single quotes in JS, no semicolons.
- Canadian/British spelling in user-facing copy ("neighbourhood", "optimise") —
  the firm is Toronto-based.
- Sentence case for UI text; uppercase is a styling choice via CSS, not baked
  into the markup.
- Keep `index.html` semantic and accessible: the skip link, ARIA state on the
  nav toggle and carousel, and visible focus styles are all deliberate.
