import { PRICING_OFFERS } from "./businessSettings";

// ============================================================================
// PRINTFLOW STUDIO — READY-MADE DESIGN SHOP CATALOG (MANUAL / NATIVE DATA)
// ============================================================================
// HOW TO UPDATE PRODUCTS:
// - This catalog is managed directly in this file and does NOT auto-sync with
//   Etsy or Printify inventory.
// - If you add a new product ID or change prices/sizes/colors for direct Stripe
//   checkout, also update PRODUCTS / ALLOWED_SIZES / ALLOWED_COLORS / UNIT_AMOUNT
//   in `api/create-shop-checkout.js`.
// - Optional `etsyListingUrl`: paste the full Etsy listing URL for a design if
//   you want an additional "Also available on Etsy" button on its product page.
// ============================================================================

export interface ShopProductImage {
  id: string;
  label: string;
  src: string;
  alt: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  slug: string;
  category: "Fall to Christmas" | "Fall" | "Halloween";
  featured?: boolean;
  price: number;
  garmentLabel: string;
  description: string;
  printPlacement?: string;
  printMethod: string;
  mockup: string;
  mockupAlt: string;
  artwork: string;
  artworkAlt: string;
  mockupStyleNote?: string;
  sizes?: string[];
  colors?: string[];
  additionalImages?: ShopProductImage[];
  // OWNER OPTIONAL: Paste exact Etsy listing URL if also listed on Etsy (leave "" if unused)
  etsyListingUrl?: string;
}

export const STANDARD_SIZES = ["S", "M", "L", "XL"];
export const STANDARD_COLORS = ["Black", "White", "Sand"];

export interface CollectionMeta {
  id: string;
  label: string;
  description: string;
}

export const SHOP_COLLECTIONS: CollectionMeta[] = [
  {
    id: "All",
    label: "All Designs",
    description: "Browse all ready-to-order PrintFlow Studio seasonal graphic tees.",
  },
  {
    id: "Featured",
    label: "Featured",
    description: "Customer-favorite seasonal designs from our current PrintFlow Studio collection.",
  },
  {
    id: "Fall to Christmas",
    label: "Fall to Christmas",
    description: "Cozy transitional designs that carry your wardrobe from pumpkin season into holiday lights.",
  },
  {
    id: "Fall",
    label: "Fall",
    description: "Warm autumn foliage, buffalo plaid, and spiced-coffee graphics.",
  },
  {
    id: "Halloween",
    label: "Halloween",
    description: "Playful spooky-season ghosts, jack-o'-lanterns, and October moonlight designs.",
  },
];

// OWNER OPTIONAL: Once your exact blank tee model (e.g., Printify / in-house blank brand)
// is standardized across every color, you can enter exact chest width & body length inches here.
export const GARMENT_FIT_DETAILS = {
  fitType: "Unisex Retail / Classic Crewneck Fit",
  availableOnlineSizes: STANDARD_SIZES,
  extendedSizesNote:
    "Need Youth sizes or Adult 2XL–3XL? Use the Custom Order button on any product page and we will quote your preferred size and blank style.",
  // Leave empty until exact blank brand measurements are confirmed by owner
  confirmedBlankBrand: "",
  measurementRows: [] as Array<{ size: string; chestWidthInches: string; bodyLengthInches: string }>,
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "PF-001",
    name: "Pumpkin Sips Become Twinkle-Light Nights",
    slug: "pumpkin-sips-become-twinkle-light-nights",
    category: "Fall to Christmas",
    featured: true,
    price: PRICING_OFFERS.shopStandardTeePrice,
    garmentLabel: "Unisex Standard Short-Sleeve Tee",
    description:
      "Celebrate the transition from crisp autumn mornings to festive December evenings. This original PrintFlow Studio illustration pairs a whipped-cream pumpkin latte, cinnamon sticks, plaid bows, pine boughs, candy canes, and glowing holiday bulbs in rich full-color DTF detail.",
    printPlacement: "Centered Full-Front Graphic (approx. 10–11 in. wide)",
    printMethod: "Full-Color Direct-to-Film (DTF) Print",
    mockup: "/shop/7bbb19ac89c8587f68dbd3b70e5f680106d86c03.jpg",
    mockupAlt: "Pumpkin Sips Become Twinkle-Light Nights graphic tee flat-lay mockup in natural sand tone",
    artwork: "/shop/d699f89ee93e2371b8d2d493972c65a93d936195.jpg",
    artworkAlt: "Full artwork detail for Pumpkin Sips Become Twinkle-Light Nights showing pumpkin mug, plaid ribbon, and holiday lights",
    sizes: STANDARD_SIZES,
    colors: STANDARD_COLORS,
    etsyListingUrl: "",
  },
  {
    id: "PF-002",
    name: "Autumn Bows Before Christmas Glows",
    slug: "autumn-bows-before-christmas-glows",
    category: "Fall to Christmas",
    featured: true,
    price: PRICING_OFFERS.shopStandardTeePrice,
    garmentLabel: "Unisex Standard Short-Sleeve Tee",
    description:
      "Designed for anyone who loves fall harvest colors just as much as holiday evergreens. Featuring buffalo-plaid lettering, sunflowers, pumpkins, wrapped gifts, and golden sleigh bells, printed to order with crisp edges and vibrant color contrast.",
    printPlacement: "Centered Full-Front Graphic (approx. 10–11 in. wide)",
    printMethod: "Full-Color Direct-to-Film (DTF) Print",
    mockup: "/shop/8541e6e3c1127721ee5c255dc0c7ba40f1d545c5.jpg",
    mockupAlt: "Autumn Bows Before Christmas Glows short-sleeve T-shirt flat-lay mockup",
    artwork: "/shop/1960bb5e4efe7618e8bf0a7cba6b46023c23be5a.jpg",
    artworkAlt: "Full artwork detail for Autumn Bows Before Christmas Glows by PrintFlow Studio",
    sizes: STANDARD_SIZES,
    colors: STANDARD_COLORS,
    etsyListingUrl: "",
  },
  {
    id: "PF-003",
    name: "Cozy Starts With Leaves and Ends in Lights",
    slug: "cozy-starts-with-leaves-and-ends-in-lights",
    category: "Fall to Christmas",
    featured: false,
    price: PRICING_OFFERS.shopStandardTeePrice,
    garmentLabel: "Unisex Standard Short-Sleeve Tee",
    description:
      "A cheerful seasonal character wrapped in a knit beanie and plaid scarf holding a warm mug surrounded by autumn leaves, pinecones, pumpkins, and string lights. Pressed to order on a comfortable unisex standard tee.",
    printPlacement: "Centered Full-Front Graphic (approx. 10–11 in. wide)",
    printMethod: "Full-Color Direct-to-Film (DTF) Print",
    mockup: "/shop/3f77ba27750e4e06a673b22fb34108659de7bfa8.jpg",
    mockupAlt: "Cozy Starts With Leaves and Ends in Lights lifestyle apparel mockup",
    artwork: "/shop/d368ee8059198f60961fd15c877d6b58f67ffe1c.jpg",
    artworkAlt: "Full artwork detail for Cozy Starts With Leaves and Ends in Lights",
    mockupStyleNote:
      "Photo shows artwork styled on a fleece pullover for visual reference. Direct online checkout is for the Unisex Standard Short-Sleeve Tee (Black, White, or Sand)—or request a sweatshirt/hoodie below.",
    sizes: STANDARD_SIZES,
    colors: STANDARD_COLORS,
    etsyListingUrl: "",
  },
  {
    id: "PF-004",
    name: "When the Pumpkins Glow, the Sleigh Bells Follow",
    slug: "when-the-pumpkins-glow-the-sleigh-bells-follow",
    category: "Fall to Christmas",
    featured: false,
    price: PRICING_OFFERS.shopStandardTeePrice,
    garmentLabel: "Unisex Standard Short-Sleeve Tee",
    description:
      "Playful Halloween ghosts wearing Santa hats and tangled in holiday string lights bridge spooky season right into Christmas. Full-color DTF printing preserves every bright orange, purple, red, and green accent on light or dark tees.",
    printPlacement: "Centered Full-Front Graphic (approx. 10–11 in. wide)",
    printMethod: "Full-Color Direct-to-Film (DTF) Print",
    mockup: "/shop/2f2c338be686639adba926e5207583164ab1d67f.jpg",
    mockupAlt: "When the Pumpkins Glow, the Sleigh Bells Follow lifestyle apparel mockup in black",
    artwork: "/shop/bb0f22e6831a5733995186f0146930374b085979.jpg",
    artworkAlt: "Full artwork detail for When the Pumpkins Glow, the Sleigh Bells Follow",
    mockupStyleNote:
      "Photo shows artwork styled on a fleece pullover for visual reference. Direct online checkout is for the Unisex Standard Short-Sleeve Tee (Black, White, or Sand)—or request a sweatshirt/hoodie below.",
    sizes: STANDARD_SIZES,
    colors: STANDARD_COLORS,
    etsyListingUrl: "",
  },
  {
    id: "PF-005",
    name: "Grateful by Day, Ghostly by Night",
    slug: "grateful-by-day-ghostly-by-night",
    category: "Halloween",
    featured: true,
    price: PRICING_OFFERS.shopStandardTeePrice,
    garmentLabel: "Unisex Standard Short-Sleeve Tee",
    description:
      "Can't decide between pumpkin pie and spooky October nights? This friendly ghost in a sunflower-trimmed witch hat brings autumn gratitude and Halloween fun together on a soft unisex tee.",
    printPlacement: "Centered Full-Front Graphic (approx. 10–11 in. wide)",
    printMethod: "Full-Color Direct-to-Film (DTF) Print",
    mockup: "/shop/3ee47f3cdc64ee6164ee8cae480890fe166146e7.jpg",
    mockupAlt: "Grateful by Day, Ghostly by Night black short-sleeve T-shirt flat-lay mockup",
    artwork: "/shop/b950526891c46a4258ce2723c1ff18af6818286c.jpg",
    artworkAlt: "Full artwork detail for Grateful by Day, Ghostly by Night showing friendly ghost holding pumpkin pie",
    sizes: STANDARD_SIZES,
    colors: STANDARD_COLORS,
    etsyListingUrl: "",
  },
  {
    id: "PF-006",
    name: "October Dressed the World in My Colors",
    slug: "october-dressed-the-world-in-my-colors",
    category: "Fall",
    featured: true,
    price: PRICING_OFFERS.shopStandardTeePrice,
    garmentLabel: "Unisex Standard Short-Sleeve Tee",
    description:
      "Made for true autumn fans. Bold buffalo-check lettering framed by maple leaves, acorns, pinecones, leopard-print pumpkins, and iced fall coffee—printed in crisp, durable full color.",
    printPlacement: "Centered Full-Front Graphic (approx. 10–11 in. wide)",
    printMethod: "Full-Color Direct-to-Film (DTF) Print",
    mockup: "/shop/3569748afbc7c0b555774e732abe891ba472e501.jpg",
    mockupAlt: "October Dressed the World in My Colors black short-sleeve T-shirt mockup",
    artwork: "/shop/fd9d0ed8b74d5da6a98ef1f8f0d6688906efb2e7.jpg",
    artworkAlt: "Full artwork detail for October Dressed the World in My Colors by PrintFlow Studio",
    sizes: STANDARD_SIZES,
    colors: STANDARD_COLORS,
    etsyListingUrl: "",
  },
  {
    id: "PF-007",
    name: "My Happy Place Has Pumpkins and Moonlight",
    slug: "my-happy-place-has-pumpkins-and-moonlight",
    category: "Halloween",
    featured: false,
    price: PRICING_OFFERS.shopStandardTeePrice,
    garmentLabel: "Unisex Standard Short-Sleeve Tee",
    description:
      "Vibrant purple, orange, and glowing yellow Halloween lettering topped with smiling bow-wearing ghosts, carved jack-o'-lanterns, candy corn, and a crescent moon.",
    printPlacement: "Centered Full-Front Graphic (approx. 10–11 in. wide)",
    printMethod: "Full-Color Direct-to-Film (DTF) Print",
    mockup: "/shop/40f23fbc6b241c6b863053d93e2322d514cbe34b.jpg",
    mockupAlt: "My Happy Place Has Pumpkins and Moonlight short-sleeve T-shirt mockup",
    artwork: "/shop/59635ef52b946d3724fdd3becd623e1edb836139.jpg",
    artworkAlt: "Full artwork detail for My Happy Place Has Pumpkins and Moonlight",
    sizes: STANDARD_SIZES,
    colors: STANDARD_COLORS,
    etsyListingUrl: "",
  },
  {
    id: "PF-008",
    name: "Wrapped in Warmth, Stirred with Spice",
    slug: "wrapped-in-warmth-stirred-with-spice",
    category: "Fall",
    featured: false,
    price: PRICING_OFFERS.shopStandardTeePrice,
    garmentLabel: "Unisex Standard Short-Sleeve Tee",
    description:
      "Cozy folded sweaters, a steaming plaid-heart spice latte, pumpkins, cinnamon sticks, and autumn leaves come together in a warm seasonal graphic pressed to order.",
    printPlacement: "Centered Full-Front Graphic (approx. 10–11 in. wide)",
    printMethod: "Full-Color Direct-to-Film (DTF) Print",
    mockup: "/shop/64021007cb9ddeea692c834e41ffb2cb1ed51e63.jpg",
    mockupAlt: "Wrapped in Warmth, Stirred with Spice lifestyle apparel mockup in cream",
    artwork: "/shop/0608fabf51e3d0626f1bc51724b4701807109707.jpg",
    artworkAlt: "Full artwork detail for Wrapped in Warmth, Stirred with Spice",
    mockupStyleNote:
      "Photo shows artwork styled on a fleece pullover for visual reference. Direct online checkout is for the Unisex Standard Short-Sleeve Tee (Black, White, or Sand)—or request a sweatshirt/hoodie below.",
    sizes: STANDARD_SIZES,
    colors: STANDARD_COLORS,
    etsyListingUrl: "",
  },
];
