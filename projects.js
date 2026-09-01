/**
 * UrbanQuest — site content.
 *
 * This is the single source of truth for the portfolio. Edit here; the hero
 * slideshow, the grid, and the project overlay all read from it.
 *
 * TODO: the written copy below is still prototype seed text. Names are
 * confirmed; locations, years, unit counts, and descriptions are NOT. Do not
 * treat any figure here as verified.
 *
 * There is no `sqft` field: the "Size Range" spec was removed from every
 * project, so the data behind it went too. `year` is required on all six.
 *
 * images — the overlay carousel, in order. The first entry is also the grid
 *          thumbnail unless `thumb` overrides it, so lead with the strongest
 *          shot of each project.
 * thumb  — optional. Sets the grid card image independently of the carousel,
 *          for a frame that sells the project on the card but would only
 *          repeat itself once the overlay is open.
 * tone   — optional. 'warm' lifts a project's photography via CSS (see
 *          .tone-warm in styles.css). Non-destructive; the files on disk are
 *          untouched. Used where a shoot came back cool and flat.
 */

/**
 * Desktop hero slideshow.
 *
 * Deliberately curated rather than derived from PROJECTS: the hero needs wide,
 * high-resolution, high-contrast frames, and most gallery shots are neither.
 * Mixing the marketing renderings with built photography is intentional — the
 * renderings carry the drama, the photographs carry the proof.
 *
 * `position` feeds background-position, so each frame can be aimed at its own
 * focal point rather than defaulting to centre.
 */
const HERO_IMAGES = [
    { src: 'assets/img/render3.jpg', position: 'center 55%', alt: 'Shaw Street at dusk' },
    { src: 'assets/img/rose-4.jpg', position: 'center 45%', alt: 'The Rose Club, Roselawn Avenue' },
    { src: 'assets/img/shaw-row.jpg', position: 'center 55%', alt: 'Shaw Street, the built row' },
    { src: 'assets/img/deerpark-winter.jpg', position: 'center 40%', alt: 'Deer Park in winter' },
    // This rendering shipped with "THE ROSE GARDEN COURTYARD" burned into the
    // top of the artwork, which collided with the right rail. The top band is
    // cropped out of the file itself (the uncropped 1920x947 original is in git
    // history at the first commit, as render2.png). background-position could
    // not solve it, because at this aspect ratio the frame crops horizontally.
    { src: 'assets/img/render2.jpg', position: 'center 50%', alt: 'The Rose Club garden courtyard' },
    { src: 'assets/img/rose-2.jpg', position: 'center 55%', alt: 'The Rose Club entrance detail' },
]

/**
 * The Approach section's slideshow.
 *
 * Must stay disjoint from HERO_IMAGES — a frame appearing in both makes the
 * page feel like it is running short of photography. One shot per project,
 * chosen so the four together cover the range of work. Check this list
 * against HERO_IMAGES whenever either changes.
 */
const APPROACH_IMAGES = [
    { src: 'assets/img/rose-3.jpg', alt: 'The Rose Club, street elevation on Roselawn Avenue' },
    // The entry detail rather than the corner elevation: the elevation is a
    // wide street shot that lost its ends in this 3:2 frame, and the road
    // along its bottom edge read as a pale line against the black page.
    // Centred, not aimed high: at 42% the crop cut the top of the doorway and
    // the frame read as leaning. Dead centre keeps the verticals square.
    { src: 'assets/img/shaw-door.jpg', alt: '456 Shaw Street, entrance detail' },
    { src: 'assets/img/eton-wide.jpg', alt: 'Eton Terrace, St Clair Avenue West' },
    // Portico and oculus sit high in this frame, so the crop is aimed up.
    { src: 'assets/img/spadina-1.jpg', position: 'center 38%', alt: '1020-1022 Spadina Road' },
    // Looking up through the gap between two Shaw units. The only frame in the
    // set shot as architecture rather than as a record of a building, so it
    // closes the sequence. Already 3:2, so it needs no crop aiming.
    { src: 'assets/img/shaw-sky.jpg', alt: '456 Shaw Street, looking up between two units' },
]

const PROJECTS = [
    {
        id: 1,
        name: 'THE ROSE CLUB LIVING',
        location: 'Roselawn Avenue, Toronto',
        tag: 'Boutique Townhomes · 2024',
        year: 2024,
        units: 10,
        status: 'Completed',
        // Photographed. Street signage in the images reads 117–131 Roselawn Ave.
        // TODO: the description below is prototype copy — the built project is a
        // stacked-stone, blackened-steel and cedar row, not the "hand-laid stone
        // and warm oak" described here. Rewrite.
        desc: "Ten garden-fronted residences arranged around a private landscaped courtyard. Hand-laid stone facades, full-height glazing, and warm oak detailing draw on the neighbourhood's heritage while speaking an unmistakably contemporary language.",
        // The twilight marketing render (client's pick, supplied specifically
        // to front this project). It sells the card, but it is a rendering,
        // so it stays out of the carousel where the built photography sits.
        thumb: 'assets/img/rose-render.jpg',
        images: [
            'assets/img/rose-4.jpg',
            'assets/img/rose-3.jpg',
            'assets/img/rose-5.jpg',
            'assets/img/rose-2.jpg',
            'assets/img/render2.jpg',
            'assets/img/render1.jpg',
            'assets/img/floorplan1.png',
        ],
    },
    {
        id: 2,
        name: '456 SHAW STREET',
        location: 'Trinity Bellwoods, Toronto',
        tag: 'Freehold Townhomes · 2023',
        year: 2023,
        units: 12,
        status: 'Completed',
        // TODO: door numbers across the shoot do not agree with the project
        // name — the street elevations show 466/468/470/478, and two frames
        // (shaw-row, shaw-path) show 31/33/35/39, which look like a second
        // frontage. Confirm the real address before launch.
        desc: 'Freehold urban townhomes on Shaw Street with direct garage access, open-plan second-floor living, and a master ensuite occupying the entire third floor. Each home offers 223 sq ft of private exterior space across two decks.',
        // The row shot earns its place on the grid card, where it has to say
        // "townhomes" at a glance, but it repeats what the frames below already
        // show once the overlay is open. `thumb` keeps it on the card and out
        // of the carousel.
        thumb: 'assets/img/shaw-row.jpg',
        images: [
            // Dropped from this gallery: shaw-1 (the corner elevation) and
            // shaw-entry (doors 468/470). Both files are still in assets/img
            // and shaw-door is reused in APPROACH_IMAGES, so nothing here is
            // safe to delete without checking that list first.
            'assets/img/shaw-facade.jpg',
            // Door 466 sits well left of centre, so a centred crop sliced it.
            { src: 'assets/img/shaw-door.jpg', position: '22% center' },
            'assets/img/shaw-path.jpg',
            'assets/img/shaw-interior.jpg',
            // Marketing rendering and floor plan behind the built photography.
            'assets/img/render3.jpg',
            'assets/img/floorplan2.png',
        ],
    },
    {
        id: 3,
        name: 'ETON TERRACE',
        location: 'Midtown, Toronto',
        tag: '3 Bed · 3.5 Bath Townhomes · 2022',
        year: 2022,
        units: 8,
        status: 'Completed',
        // TODO: photography shows a white stucco row with curved bay windows on
        // St Clair Ave W (door numbers 239 and 333) — confirm the location
        // field, and whether "rooftop terraces" below is accurate.
        desc: 'Three-storey terraced residences with private gardens and rooftop terraces. The signature floor plan delivers 2,729 sq ft of interior space with 340 sq ft of exterior living across basement and main levels.',
        images: [
            'assets/img/eton-wide.jpg',
            'assets/img/eton-bay.jpg',
            'assets/img/eton-1.jpg',
            'assets/img/eton-2.jpg',
            'assets/img/eton-3.jpg',
            'assets/img/eton-4.jpg',
            'assets/img/eton-5.jpg',
            'assets/img/eton-6.jpg',
        ],
    },
    {
        id: 4,
        name: 'DEER PARK',
        location: 'Deer Park, Toronto',
        tag: 'Private Residences · 2021',
        year: 2021,
        units: 5,
        status: 'Completed',
        // TODO: copy says "concealed motor court", but the photography shows a
        // street-fronting red brick row with stepped entries (door numbers 39
        // and 137). Rewrite this description to match what was actually built.
        desc: "Five ultra-private residences set behind a concealed motor court, offering exceptional scale and privacy in one of Toronto's most sought-after established neighbourhoods.",
        images: [
            'assets/img/deerpark-1.jpg',
            'assets/img/deerpark-2.jpg',
            'assets/img/deerpark-3.jpg',
            // The winter frame reads as the moodiest of the set — kept, but last.
            'assets/img/deerpark-winter.jpg',
        ],
    },
    {
        id: 5,
        name: 'CHIARA GARDENS',
        location: 'West Toronto',
        tag: 'Boutique Townhomes · 2023',
        year: 2023,
        units: 14,
        status: 'Completed',
        // The sky in every Chiara frame has been lifted toward blue in the
        // files themselves — a hue-selective boost that leaves the cream
        // stucco, foliage, and ironwork untouched. Done at the file level
        // rather than in CSS because a blanket filter tinted the whole facade.
        // TODO: copy says "central garden mews" and a palette of "limestone,
        // blackened steel, and warm timber", but the photography shows a
        // street-fronting beige stucco row with columned porticos and juliette
        // balconies (door numbers 417–421). Rewrite to match.
        desc: 'Fourteen light-filled townhomes wrapped around a central garden mews. Limestone, blackened steel, and warm timber create a calm, enduring palette at the heart of a vibrant cultural corridor.',
        tone: 'warm',
        images: [
            'assets/img/chiara-3.jpg',
            'assets/img/chiara-wide.jpg',
            'assets/img/chiara-4.jpg',
            'assets/img/chiara-5.jpg',
        ],
    },
    {
        id: 6,
        name: '1020–1022 SPADINA ROAD',
        location: 'Spadina Road, Toronto',
        tag: 'Private Residences',
        // TODO: every spec below is still unknown — the shoot folder gave us
        // the name and four images, nothing else. `year` is required on every
        // project and is the one still showing a placeholder dash: get the
        // real build year before launch. Units, status, and the description
        // (written only from what the photographs show) also need confirming.
        year: 'TBC',
        units: 'TBC',
        status: 'TBC',
        desc: 'A pair of stucco residences on Spadina Road, fronted by columned porticos, oculus windows, and wrought-iron juliette balconies. Inside, a skylit stair in pale oak and copper rises through the full height of the house.',
        images: [
            'assets/img/spadina-2.jpg',
            'assets/img/spadina-1.jpg',
            'assets/img/spadina-3.jpg',
            'assets/img/spadina-4.jpg',
        ],
    },
]

// The ◆ separator between items is added by initMarquee() — list terms only.
const MARQUEE_ITEMS = [
    'ARCHITECTURAL DESIGN',
    'URBAN DEVELOPMENT',
    'BESPOKE LIVING',
    'TIMELESS LUXURY',
    'BOUTIQUE TOWNHOMES',
]
