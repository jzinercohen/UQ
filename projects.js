/**
 * UrbanQuest — site content.
 *
 * This is the single source of truth for the portfolio. Edit here; the grid,
 * the filter chips, and the project overlay all read from it.
 *
 * TODO: all five entries below are placeholder/seed data carried over from the
 * prototype. Replace names, locations, specs, and copy with real project data.
 *
 * category  — drives the filter chips. Any new value appears automatically.
 * images    — first image is the grid thumbnail; the rest fill the overlay carousel.
 */
const PROJECTS = [
    {
        id: 1,
        name: 'THE ROSE CLUB LIVING',
        location: 'Toronto, Ontario',
        tag: 'Boutique Townhomes · 2024',
        category: 'Townhomes',
        year: 2024,
        units: 10,
        sqft: '2,800–4,200',
        status: 'Completed',
        desc: "Ten garden-fronted residences arranged around a private landscaped courtyard. Hand-laid stone facades, full-height glazing, and warm oak detailing draw on the neighbourhood's heritage while speaking an unmistakably contemporary language.",
        images: ['assets/img/render2.png', 'assets/img/render1.png', 'assets/img/floorplan1.png'],
    },
    {
        id: 2,
        name: '456 SHAW STREET',
        location: 'Trinity Bellwoods, Toronto',
        tag: 'Freehold Townhomes · 2023',
        category: 'Townhomes',
        year: 2023,
        units: 12,
        sqft: '1,560',
        status: 'Completed',
        desc: 'Freehold urban townhomes on Shaw Street with direct garage access, open-plan second-floor living, and a master ensuite occupying the entire third floor. Each home offers 223 sq ft of private exterior space across two decks.',
        images: ['assets/img/render3.png', 'assets/img/floorplan2.png', 'assets/img/render1.png'],
    },
    {
        id: 3,
        name: 'EATON TERRACE',
        location: 'Midtown, Toronto',
        tag: '3 Bed · 3.5 Bath Townhomes · 2022',
        category: 'Townhomes',
        year: 2022,
        units: 8,
        sqft: '2,729–3,069',
        status: 'Completed',
        desc: 'Three-storey terraced residences with private gardens and rooftop terraces. The signature floor plan delivers 2,729 sq ft of interior space with 340 sq ft of exterior living across basement and main levels.',
        images: ['assets/img/render1.png', 'assets/img/render3.png', 'assets/img/floorplan1.png'],
    },
    {
        id: 4,
        name: 'DEER PARK',
        location: 'Deer Park, Toronto',
        tag: 'Private Residences · 2021',
        category: 'Residential',
        year: 2021,
        units: 5,
        sqft: '3,800–6,000',
        status: 'Completed',
        desc: "Five ultra-private residences set behind a concealed motor court, offering exceptional scale and privacy in one of Toronto's most sought-after established neighbourhoods.",
        images: ['assets/img/render3.png', 'assets/img/render2.png'],
    },
    {
        id: 5,
        name: 'CHIARA GARDENS',
        location: 'West Toronto',
        tag: 'Boutique Townhomes · 2023',
        category: 'Townhomes',
        year: 2023,
        units: 14,
        sqft: '2,100–3,600',
        status: 'Completed',
        desc: 'Fourteen light-filled townhomes wrapped around a central garden mews. Limestone, blackened steel, and warm timber create a calm, enduring palette at the heart of a vibrant cultural corridor.',
        images: ['assets/img/render2.png', 'assets/img/render1.png', 'assets/img/floorplan1.png'],
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
