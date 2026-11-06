// ============================================================================
// PRINTFLOW STUDIO — PORTFOLIO & PRODUCTION SHOWCASE DATA
// ============================================================================
// HOW TO UPDATE PORTFOLIO ITEMS:
// 1. Add finished garment photos, close-up print detail shots, or studio equipment
//    images to `/public/` and add an entry to `PORTFOLIO_ITEMS` below.
// 2. Keep captions factual and avoid customer names or implied client endorsements
//    unless you have explicit written permission to feature them.
// 3. Set `featuredOnHome: true` on up to 6 items to display them on the homepage.
// 4. OWNER OPTIONAL: To display in-house production or heat-pressing videos on
//    `/our-work`, place `.mp4` or `.webm` clips in `/public/` and add entries to
//    `PRODUCTION_VIDEOS` below.
// ============================================================================

export type PortfolioCategory =
  | "All Work"
  | "Finished Garments"
  | "Print Detail & Artwork"
  | "Studio & Production";

export type PortfolioItem = {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, "All Work">;
  garmentOrFormat: string;
  caption: string;
  image: string;
  alt: string;
  featuredOnHome?: boolean;
};

export type ProductionVideoItem = {
  id: string;
  title: string;
  caption: string;
  videoSrc: string; // e.g. "/videos/heat-press-peel.mp4"
  poster?: string; // e.g. "/printer/assembled.png"
};

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "All Work",
  "Finished Garments",
  "Print Detail & Artwork",
  "Studio & Production",
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "pf-work-river-city-tee",
    title: "Chattanooga River City Tee",
    category: "Finished Garments",
    garmentOrFormat: "Short-Sleeve Cotton Tee • Full-Front DTF Print",
    caption:
      "Multi-color vintage emblem with crisp halftone sunbeams, river reflections, and clean white-ink edge opacity on dark navy fabric.",
    image: "/showcase-1.jpg",
    alt: "Navy short-sleeve t-shirt printed with the Chattanooga River City Energy bridge and sunrise graphic",
    featuredOnHome: true,
  },
  {
    id: "pf-work-truth-hoodie",
    title: "Heavyweight Fleece Pullover Print",
    category: "Finished Garments",
    garmentOrFormat: "Pullover Hoodie • Large Center-Chest DTF Print",
    caption:
      "Distressed multi-tone typography pressed onto black fleece, maintaining stretch and solid ink coverage above the kangaroo pocket.",
    image: "/truth_hoodie.png",
    alt: "Front and back view of a black pullover hoodie printed with multi-color distressed typography",
    featuredOnHome: true,
  },
  {
    id: "pf-work-moon-rose-tee",
    title: "Filigree Rose Flat-Lay Print Detail",
    category: "Print Detail & Artwork",
    garmentOrFormat: "Black Crewneck Tee • Fine-Line DTF Detail",
    caption:
      "Flat-lay view demonstrating sharp cream linework, deep burgundy crackle shading, and clean negative space on a black cotton tee.",
    image: "/moon_rose_shirt_framed.png",
    alt: "Flat-lay black t-shirt showing fine-line ivory filigree frame and dark rose DTF print detail",
    featuredOnHome: true,
  },
  {
    id: "pf-work-management-tee",
    title: "Illustrated Small-Business & Humor Tee",
    category: "Finished Garments",
    garmentOrFormat: "Natural / Cream Short-Sleeve Tee • Full-Color DTF",
    caption:
      "Detailed character illustration with smooth color gradients and fine outlines pressed onto a light neutral tee.",
    image: "/showcase-2.jpg",
    alt: "Natural cream short-sleeve shirt printed with the Management Has Gone To The Dogs illustrated graphic",
    featuredOnHome: true,
  },
  {
    id: "pf-work-reading-longsleeve",
    title: "Western Book Club Long-Sleeve",
    category: "Finished Garments",
    garmentOrFormat: "Long-Sleeve Tee • Center-Chest Full-Color DTF",
    caption:
      "Warm turquoise and rust palette printed with full white underbase so colors stay vivid against dark espresso fabric.",
    image: "/showcase-4.jpg",
    alt: "Dark brown long-sleeve shirt printed with the Reading After Sundown stacked books and cowboy hat graphic",
    featuredOnHome: true,
  },
  {
    id: "pf-work-dtf-printer",
    title: "In-House Roll-Fed DTF Transfer Printer",
    category: "Studio & Production",
    garmentOrFormat: "Direct-to-Film Printing Equipment • Chattanooga Studio",
    caption:
      "PrintFlow Studio's roll-fed Direct-to-Film printer setup used to output full-color CMYK + White transfers before curing and heat pressing.",
    image: "/printer/assembled.png",
    alt: "PrintFlow Studio teal roll-fed Direct-to-Film DTF transfer printer unit",
    featuredOnHome: true,
  },
  {
    id: "pf-work-moon-rose-hoodie",
    title: "Gothic Filigree Pullover Hoodie",
    category: "Finished Garments",
    garmentOrFormat: "Black Fleece Hoodie • Oversized Vertical Graphic",
    caption:
      "Same artwork scaled for heavyweight fleece, illustrating how a single print-ready file adapts cleanly across tees and hoodies.",
    image: "/moon_rose_hoodie.png",
    alt: "Black fleece pullover hoodie printed with an ornate ivory and burgundy rose medallion graphic",
  },
  {
    id: "pf-work-river-city-longsleeve",
    title: "Athletic Heather Long-Sleeve Apparel",
    category: "Finished Garments",
    garmentOrFormat: "Heather Grey Long-Sleeve • Full-Front DTF Print",
    caption:
      "Full-front regional graphic pressed onto heather cotton-blend knitwear for cool-weather events and local retail.",
    image: "/showcase-5.jpg",
    alt: "Heather grey long-sleeve shirt printed with the Chattanooga River City Energy bridge graphic",
  },
  {
    id: "pf-work-management-rust",
    title: "Rust Heather Long-Sleeve Variation",
    category: "Finished Garments",
    garmentOrFormat: "Rust Long-Sleeve Tee • Multi-Garment Run Example",
    caption:
      "Because DTF transfers carry their own white underbase, one design can be pressed across multiple shirt colors and sleeve styles in a single order.",
    image: "/showcase-3.jpg",
    alt: "Rust red long-sleeve shirt printed with the Management Has Gone To The Dogs graphic",
  },
  {
    id: "pf-work-grace-detail",
    title: "Botanical Faith Graphic Close-Up",
    category: "Print Detail & Artwork",
    garmentOrFormat: "Artwork Close-Up • Soft Floral Gradients & Script",
    caption:
      "Close-up of delicate botanical petals, warm terracotta tones, and thin script lettering suited for church women's ministry and retreat shirts.",
    image: "/shop/grace-grows.jpg",
    alt: "Close-up of Grace Grows Here botanical floral artwork for DTF shirt printing",
  },
  {
    id: "pf-work-scenic-city-detail",
    title: "Scenic City Seasonal Graphic Close-Up",
    category: "Print Detail & Artwork",
    garmentOrFormat: "Artwork Close-Up • Multi-Color Seasonal Detail",
    caption:
      "High-detail seasonal illustration combining crisp badge lettering, autumn foliage, and layered shading without screen-count limits.",
    image: "/shop/scenic-city-sweater-weather.jpg",
    alt: "Close-up of Scenic City Sweater Weather autumn Chattanooga graphic design",
  },
  {
    id: "pf-work-creator-detail",
    title: "Bold Creator Merch Artwork Close-Up",
    category: "Print Detail & Artwork",
    garmentOrFormat: "Artwork Close-Up • High-Contrast Spot & Halftone Color",
    caption:
      "Vibrant neon-accented graphic artwork showing clean edge definition for creator merch and small-batch apparel drops.",
    image: "/shop/social-battery.jpg",
    alt: "Close-up of Social Battery Out of Office illustrated graphic artwork",
  },
];

// OWNER OPTIONAL: Add real in-house pressing or printing video clips here when available.
export const PRODUCTION_VIDEOS: ProductionVideoItem[] = [];
