/**
 * UrbanQuest — site content.
 *
 * This is the single source of truth for the portfolio. Edit here; the hero
 * slideshow, the grid, and the project overlay all read from it.
 *
 * TODO: the written copy below is still prototype seed text. Names are
 * confirmed; locations, years, unit counts, square footages, and descriptions
 * are NOT. Do not treat any figure here as verified.
 *
 * images — first entry is the grid thumbnail and the first slide in the
 *          overlay carousel, so lead with the strongest shot of each project.
 * tone   — optional. 'warm' lifts and warms a project's photography via CSS
 *          (see .tone-warm in styles.css). Non-destructive; the files on disk
 *          are untouched. Used where a shoot came back cool and flat.
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
    { src: 'assets/img/deerpark-winter.jpg', position: 'center 40%', alt: 'Deer Park in winter' },
    // This rendering shipped with "THE ROSE GARDEN COURTYARD" burned into the
    // top of the artwork, which collided with the hero stats. The top band is
    // cropped out of the file itself (the uncropped 1920×947 original is in git
    // history at the first commit, as render2.png) — background-position could
    // not solve it, because at this aspect ratio the frame crops horizontally.
    { src: 'assets/img/render2.jpg', position: 'center 50%', alt: 'The Rose Club garden courtyard' },
    { src: 'assets/img/rose-2.jpg', position: 'center 55%', alt: 'The Rose Club entrance detail' },
]

const PROJECTS = [
    {
        id: 1,
        name: 'THE ROSE CLUB LIVING',
        location: 'Roselawn Avenue, Toronto',
        tag: 'Boutique Townhomes · 2024',
        year: 2024,
        units: 10,
        sqft: '2,800–4,200',
        status: 'Completed',
        // Photographed. Street signage in the images reads 117–131 Roselawn Ave.
        // TODO: the description below is prototype copy — the built project is a
        // stacked-stone, blackened-steel and cedar row, not the "hand-laid stone
        // and warm oak" described here. Rewrite.
        desc: "Ten garden-fronted residences arranged around a private landscaped courtyard. Hand-laid stone facades, full-height glazing, and warm oak detailing draw on the neighbourhood's heritage while speaking an unmistakably contemporary language.",
        images: [
            // Lead is the twilight marketing render (client's pick — supplied
            // specifically to front this project, replacing the old rose-1
            // street photo). The exception to "photography before renderings"
            // below is deliberate and client-directed.
            'assets/img/rose-render.jpg',
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
        sqft: '1,560',
        status: 'Completed',
        // TODO: the photograph shows door number 478, but the project is named
        // 456 Shaw Street. Confirm which is right before launch.
        desc: 'Freehold urban townhomes on Shaw Street with direct garage access, open-plan second-floor living, and a master ensuite occupying the entire third floor. Each home offers 223 sq ft of private exterior space across two decks.',
        images: [
            'assets/img/shaw-1.jpg',
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
        sqft: '2,729–3,069',
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
        sqft: '3,800–6,000',
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
        sqft: '2,100–3,600',
        status: 'Completed',
        // The Chiara shoot came back cool and overcast — see `tone` below.
        // Ordered brightest-first; the shaded portico detail sits last.
        // TODO: copy says "central garden mews" and a palette of "limestone,
        // blackened steel, and warm timber", but the photography shows a
        // street-fronting beige stucco row with columned porticos and juliette
        // balconies (door numbers 417–421). Rewrite to match.
        desc: 'Fourteen light-filled townhomes wrapped around a central garden mews. Limestone, blackened steel, and warm timber create a calm, enduring palette at the heart of a vibrant cultural corridor.',
        tone: 'warm',
        images: [
            'assets/img/chiara-wide.jpg',
            'assets/img/chiara-1.jpg',
            'assets/img/chiara-2.jpg',
            'assets/img/chiara-4.jpg',
            'assets/img/chiara-5.jpg',
            'assets/img/chiara-3.jpg',
            'assets/img/chiara-portico.jpg',
        ],
    },
    {
        id: 6,
        name: '1022 SPADINA ROAD',
        location: 'Spadina Road, Toronto',
        tag: 'Private Residences',
        // TODO: every spec below is unknown — the shoot folder gave us the name
        // and four images, nothing else. Year, unit count, square footage, and
        // status all need real values before launch, and the description is a
        // neutral placeholder written only from what the photographs show.
        year: '—',
        units: '—',
        sqft: '—',
        status: '—',
        desc: 'A pair of stucco residences on Spadina Road, fronted by columned porticos, oculus windows, and wrought-iron juliette balconies. Inside, a skylit stair in pale oak and copper rises through the full height of the house.',
        images: [
            'assets/img/spadina-1.jpg',
            'assets/img/spadina-2.jpg',
            'assets/img/spadina-3.jpg',
            'assets/img/spadina-4.jpg',
        ],
    },
]

const MARQUEE_ITEMS = [
    'LUXURY TOWNHOMES',
    'ARCHITECTURAL DESIGN',
    'TORONTO',
    'URBAN DEVELOPMENT',
    'BESPOKE LIVING',
    'TIMELESS CRAFT',
]
