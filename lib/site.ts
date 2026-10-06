// Single source of truth for business facts. Sources: intake form (2026-09-25),
// live site mrpaintinghousesaz.com, Google Business Profile (checked 2026-09-29).

export const BIZ = {
  name: "Mr Painting Houses LLC",
  short: "Mr Painting Houses",
  phone: "(623) 340-6818",
  phoneHref: "tel:+16233406818",
  smsHref: "sms:+16233406818",
  email: "mrpaintinghouses2022@gmail.com",
  street: "8513 S 55th Dr",
  city: "Laveen",
  region: "AZ",
  zip: "85339",
  roc: "344330",
  years: "30+", // confirmed by client (Loom review, Oct 2026): show as "30+"
  google: { rating: "5.0", count: 28, url: "https://maps.google.com/maps?cid=1716042076630463227" },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mrpaintinghousesaz.com",
};

// Intake-form hours. Old site footer showed "6:00am – 6:00am" (a bug) and Google shows "closes 6 PM" — confirm.
export const HOURS: [string, string][] = [
  ["Monday", "6:00am – 7:00pm"],
  ["Tuesday", "6:00am – 7:00pm"],
  ["Wednesday", "6:00am – 7:00pm"],
  ["Thursday", "6:00am – 7:00pm"],
  ["Friday", "6:00am – 7:00pm"],
  ["Saturday", "7:00am – 5:00pm"],
  ["Sunday", "8:00am – 3:00pm"],
];

export const SOCIAL = [
  { label: "Facebook", href: "https://www.facebook.com/536995469493348" },
  { label: "Instagram", href: "https://www.instagram.com/mrpaintinghouses/" },
  { label: "TikTok", href: "https://www.tiktok.com/@user057374911" },
  { label: "Google", href: "https://maps.google.com/maps?cid=1716042076630463227" },
  { label: "Nextdoor", href: "https://nextdoor.com/pages/mr-painting-houses-llc-laveen-az/" },
  { label: "BBB", href: "https://www.bbb.org/us/az/laveen/profile/commercial-painting-contractors/mr-painting-houses-llc-1126-1000113769" },
];

// Photos live on the old site builder's CDN. media() serves resized JPGs from it (≈100 KB each instead of multi-MB originals).
// After `npm run images:mirror` and NEXT_PUBLIC_LOCAL_MEDIA=1, the same helper serves copies from /public/media instead.
const LOCAL = process.env.NEXT_PUBLIC_LOCAL_MEDIA === "1";
export const mediaId = (url: string) => (url.match(/media\/([0-9a-f-]{36}\.\w+)/) || [])[1] || "";
export function media(urlOrId: string, size = 1600) {
  const id = urlOrId.includes("/") ? mediaId(urlOrId) : urlOrId;
  if (!id) return urlOrId;
  if (LOCAL) return `/media/${id.replace(/\.\w+$/, "")}.jpg`;
  return `https://d3p2r6ofnvoe67.cloudfront.net/fit-in/${size}x${size}/filters:format(jpg)/filters:strip_exif()/filters:no_upscale()/media/${id}`;
}

export const IMG = {
  logo: LOCAL ? "/media/logo.png" : "https://landing-page-app-hero-images.s3.amazonaws.com/media/bcb5e698-0361-4a63-9b78-3f5a1de63595.png",
  crew: media("ff15967d-8cbb-48d4-acdb-6cdc2953ff21.jpeg"),
  pool: media("2ab3e3ef-7f0a-414f-9421-cd924f572b8e.jpeg"),
  twoStory: media("43dd8ba5-ec41-4de9-a0e7-b9543adbe406.jpeg", 2000),
  twoStoryB: media("f394d605-7bf9-4c98-a5a9-690987104c57.jpeg"),
  twoStoryC: media("0dcf9a62-a945-4c88-94dd-57d2e25bc536.jpeg"),
  kitchen: media("11f5ee5d-51ab-4712-807f-fec1ffe9d94d.png"),
  cabinets: media("6c0760bb-9000-4e04-968f-ba91474dd271.jpeg"),
  swatches: media("1f7d2ae1-bd84-497d-984c-368a8946c7c9.png"),
  singleStory: media("a9f66059-d06e-48f3-8ace-db8d5cc05c4a.png"),
  modern: media("6b47df48-3526-4af3-8ee5-641ee5b5ec37.jpeg"),
  ranch: media("6889acd3-affc-49a2-b2bb-b6fe02525f5e.jpeg"),
  front: media("a6a4fe58-033f-4ae8-8670-1a14c3c71a36.jpeg"),
  interior: media("14c8bde9-870e-433a-9d0e-44190be62720.jpeg"),
  // Client-supplied job photos (public/work)
  yardSign: "/work/yard-sign-stucco.jpg",
  stoneSign: "/work/stone-exterior-sign.jpg",
  truck: "/work/truck-trailer.jpg",
  exteriorMasking: "/work/exterior-masking.jpg",
  interiorRolling: "/work/interior-rolling.jpg",
  kitchenProtected: "/work/kitchen-protected.jpg",
  kitchenFinished: "/work/kitchen-finished.jpg",
  cabinetsProgress: "/work/cabinets-in-progress.jpg",
  cabinetDoors: "/work/cabinet-doors-spraying.jpg",
  // Client photos from the "EDITS x Mr Painting Houses Photos" Drive folder (Oct 2026)
  heroHouse: "/work/exterior-two-story-driveway.jpg",
  extStone: "/work/exterior-two-story-stone.jpg",
  extCrew: "/work/exterior-crew-on-ladders.jpg",
  intBeams: "/work/interior-beam-ceiling.jpg",
  intKitchen: "/work/interior-kitchen-great-room.jpg",
  intArch: "/work/interior-archway-painting.jpg",
  cabBlackAfter: "/work/cabinets-black-after.jpg",
  cabBlackBefore: "/work/cabinets-black-before.jpg",
  cabWhiteGray: "/work/cabinets-white-gray-island.jpg",
  cabPrep: "/work/cabinets-prep-masking.jpg",
  pergolaSaguaro: "/work/pergola-saguaro.jpg",
  pergolaLights: "/work/pergola-string-lights.jpg",
  pergolaKitchen: "/work/pergola-outdoor-kitchen.jpg",
};

export type Photo = { src: string; caption: string };
export type ServiceMeta = { slug: string; name: string; short: string; img: string; featured?: boolean; gallery: Photo[] };
export const SERVICES: ServiceMeta[] = [
  {
    slug: "exterior-painting", name: "Exterior Painting", short: "Stucco, fascia, trim, doors and block walls", img: IMG.twoStoryB, featured: true,
    gallery: [
      { src: IMG.extStone, caption: "Two-story stucco and stone exterior" },
      { src: IMG.heroHouse, caption: "Full exterior repaint, two-story home" },
      { src: IMG.extCrew, caption: "Our crew painting a stucco exterior" },
    ],
  },
  {
    slug: "interior-painting", name: "Interior Painting", short: "Walls, ceilings, trim and doors", img: IMG.interiorRolling, featured: true,
    gallery: [
      { src: IMG.intBeams, caption: "Great room with wood beams, furniture covered" },
      { src: IMG.intKitchen, caption: "Kitchen and great room walls and ceilings" },
      { src: IMG.intArch, caption: "Cutting in an archway and hallway" },
    ],
  },
  {
    slug: "kitchen-cabinet-repainting", name: "Kitchen Cabinet Repainting", short: "A factory-smooth finish without replacing cabinets", img: IMG.cabBlackAfter, featured: true,
    gallery: [
      { src: IMG.cabBlackBefore, caption: "Before: original oak cabinets, doors off" },
      { src: IMG.cabBlackAfter, caption: "After: the same kitchen painted black" },
      { src: IMG.cabWhiteGray, caption: "White perimeter cabinets with a gray island" },
      { src: IMG.cabPrep, caption: "Counters and appliances masked before spraying" },
      { src: IMG.cabinetDoors, caption: "Cabinet doors sprayed off-site" },
      { src: IMG.cabinetsProgress, caption: "Cabinet boxes in progress" },
    ],
  },
  {
    slug: "deck-fence-pergola-staining", name: "Deck, Fence & Pergola Staining", short: "Pergolas, decks and fences protected from sun and monsoon", img: IMG.pergolaSaguaro,
    gallery: [
      { src: IMG.pergolaSaguaro, caption: "Stained pergola over an outdoor kitchen" },
      { src: IMG.pergolaLights, caption: "Dark-stained pergola, backyard patio" },
      { src: IMG.pergolaKitchen, caption: "Pergola and outdoor kitchen, desert landscape" },
    ],
  },
  {
    slug: "detailed-surface-preparation", name: "Detailed Surface Preparation", short: "Wash, scrape, patch and prime so paint lasts", img: IMG.exteriorMasking,
    gallery: [
      { src: IMG.exteriorMasking, caption: "Masking windows and trim before spraying" },
      { src: IMG.kitchenProtected, caption: "Floors and counters covered before work starts" },
      { src: IMG.cabPrep, caption: "Kitchen masked for cabinet painting" },
    ],
  },
];

export type City = { slug: string; name: string; oldSlug?: string; showcaseCity?: string; lat: number; lon: number };
// Existing 5 city pages keep their content; 4 added from the intake form's service-area list.
export const CITIES: City[] = [
  { slug: "laveen-village", name: "Laveen Village", oldSlug: "single-area-served", lat: 33.36, lon: -112.17 },
  { slug: "gilbert", name: "Gilbert", oldSlug: "single-area-served-2", showcaseCity: "Gilbert, AZ", lat: 33.35, lon: -111.79 },
  { slug: "chandler", name: "Chandler", oldSlug: "single-area-served-3", showcaseCity: "Chandler, AZ", lat: 33.3, lon: -111.84 },
  { slug: "scottsdale", name: "Scottsdale", oldSlug: "single-area-served-4", showcaseCity: "Scottsdale, AZ", lat: 33.49, lon: -111.93 },
  { slug: "phoenix", name: "Phoenix", oldSlug: "single-area-served-5", showcaseCity: "Phoenix, AZ", lat: 33.45, lon: -112.07 },
  { slug: "goodyear", name: "Goodyear", lat: 33.44, lon: -112.36 },
  { slug: "paradise-valley", name: "Paradise Valley", lat: 33.54, lon: -111.96 },
  { slug: "fountain-hills", name: "Fountain Hills", lat: 33.61, lon: -111.72 },
  { slug: "san-tan-valley", name: "San Tan Valley", lat: 33.19, lon: -111.53 },
];

// Full list shown on the old site footer (kept verbatim).
export const FOOTER_AREAS = [
  "Laveen Village", "Gilbert", "Chandler", "Scottsdale", "Phoenix", "Glendale", "Maryvale", "Peoria", "Tempe",
  "Tempe Junction", "Alhambra", "Ahwatukee Foothills", "Mesa", "Queen Creek", "San Tan Heights", "Gold Canyon", "Fountain Hills",
];

export const NAV = [
  { href: "/services/exterior-painting", label: "Exterior" },
  { href: "/services/interior-painting", label: "Interior" },
  { href: "/services/kitchen-cabinet-repainting", label: "Cabinets" },
  { href: "/services", label: "All services" },
  { href: "/showcases", label: "Our work" },
  { href: "/reviews", label: "Reviews" },
  { href: "/service-areas", label: "Areas" },
];

export const PROJECT_TYPES = ["Exterior", "Interior", "Kitchen cabinets", "Stucco repair", "Deck / fence / pergola"];

export const FAQS: { q: string; a: string }[] = [
  { q: "Do you offer free estimates?", a: "Yes. Every estimate is free and comes with no obligation. We walk the property, talk through colors and prep, and give you a detailed written quote for your project." },
  { q: "Are you licensed and insured?", a: "Yes. Mr Painting Houses LLC holds Arizona ROC license #344330 and is licensed, bonded and insured." },
  { q: "What paint do you use?", a: "We use Sherwin-Williams product lines matched to each surface — Emerald® and Duration® topcoats, Emerald® Urethane Trim Enamel and Scuff Tuff® for cabinets, doors and trim, and Pro-Cryl® Universal Primer and DTM Acrylic for metal and patched areas." },
  { q: "How do you prep stucco and fascia before painting?", a: "We power wash every surface, inspect and fix cracks, scrape loose paint and prime for adhesion, and cover walls, windows, floors, lights and landscaping. Where fascia needs it, we apply an elastomeric coating for added durability." },
  { q: "Which cities do you serve?", a: "We're based in Laveen and paint across the Valley, including Phoenix, Gilbert, Chandler, Scottsdale, Paradise Valley, Fountain Hills, San Tan Valley and Goodyear." },
];
