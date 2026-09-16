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
    // The courtyard the Rose Club copy is built around. It is a rendering, and
    // it carries "THE ROSE GARDEN COURTYARD" burned into the top of the
    // artwork — that band is cropped out of the file itself (the uncropped
    // 1920x947 original is in git history at the first commit, as render2.png).
    // Moved here from HERO_IMAGES, which is why the hero is now five frames.
    { src: 'assets/img/render2.jpg', alt: 'The Rose Club, garden courtyard' },
]

const PROJECTS = [
    {
        id: 1,
        name: 'THE ROSE CLUB',
        location: 'Yonge & Eglinton, Midtown Toronto',
        tag: 'Freehold Townhomes · 2022',
        year: 2022,
        homes: '12 townhomes',
        status: 'Sold-out',
        // Client's own wording. Deliberately does NOT borrow from the old
        // website, unlike the other five entries.
        desc: '12 luxurious contemporary courtyard townhomes with floor-to-ceiling glass throughout. Dramatic contemporary architecture, cloistered around an exclusive private courtyard. In prestigious Yonge & Eglinton, midtown Toronto.',
        // The twilight marketing render (client's pick, supplied specifically
        // to front this project). It sells the card, but it is a rendering,
        // so it stays out of the carousel where the built photography sits.
        // `contain` so the full render shows: at `cover` the 4:3 artwork was
        // cropped top and bottom to fill the 7:5 card.
        thumb: { src: 'assets/img/rose-render.jpg', fit: 'contain' },
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
        location: 'Little Italy, Toronto',
        tag: 'Freehold Townhomes · 2017',
        year: 2017,
        homes: '13 townhomes',
        status: 'Sold-out',
        desc: "Located at Shaw and Achtman Lane, on charming, tree-lined Shaw Street in the heart of Little Italy, steps from the neighbourhood's best restaurants, cafés, and parks. This freehold townhome development features dynamic contemporary architecture, fully private enclosed garages, imported Italian kitchens, soaring ceiling heights, floating staircases, and dramatic skylights.",
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
        location: 'Forest Hill Village, Toronto',
        tag: 'Freehold Townhomes · 1998',
        year: 1998,
        homes: '7 townhomes',
        status: 'Sold-out',
        desc: "Georgian style townhomes, known as 'the Gateway to Forest Hill'. These five storey homes boast private elevators, entire-floor Penthouse Master bedrooms and bathrooms, decks off the master bedroom, unique entrance parlours, and dramatic use of space, with private, fully enclosed garages offering direct entry to the home. Elegant homes recognised as encapsulating a luxurious and refined lifestyle, truly distinctive residences.",
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
        name: 'DEER PARK ON THE HEATH',
        location: 'Deer Park, Toronto',
        tag: 'Freehold Townhomes · 2004',
        year: 2004,
        homes: '4 townhomes',
        status: 'Sold-out',
        desc: "A splendid collection of residences in one of Midtown Toronto's most sought-after locations. This carefully detailed project includes individual design for each townhome, entire second storey master suites and private 'en spas', expansive decks and balconies, beautifully detailed wood kitchens and bathrooms, double car garages, free-standing tubs, Indiana limestone exteriors, oversized moldings and trim, soaring skylights, plus many extraordinary features which exemplify an exclusive and established neighbourhood such as Deer Park.",
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
        // Spelled "Ciara", not "Chiara" — the client's notes correct this.
        // The image files are still named chiara-*; only the display name moved.
        name: 'CIARA GARDENS',
        location: 'Forest Hill Village, Toronto',
        tag: 'Freehold Townhomes · 2001',
        year: 2001,
        homes: '6 townhomes',
        status: 'Sold-out',
        // The sky in every frame has been lifted toward blue in the files
        // themselves — a hue-selective boost that leaves the cream stucco,
        // foliage, and ironwork untouched. Done at the file level rather than
        // in CSS because a blanket filter tinted the whole facade.
        desc: 'A beautiful townhome collection at Walmer and St. Clair. Designed with French influence, overlooking a park with fountains and flowers. Elongated columns and French doors that open onto balconied outlooks, all designed in response to this charming locale.',
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
        name: '1020/1022 SPADINA ROAD',
        location: 'Toronto',
        tag: 'Private Residences · 2003',
        year: 2003,
        homes: '2 homes',
        // The one project not marked sold-out in the client's notes.
        status: 'Completed',
        // Kept as written: the client's note was "leave description as is".
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
