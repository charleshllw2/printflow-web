// ============================================================================
// PRINTFLOW STUDIO — READY-TO-PRESS DTF TRANSFER CATALOG (/dtf-transfers)
// ============================================================================
// HOW TO UPDATE TRANSFERS:
// - Edit transfer sizes/prices in `getStandardSizes()` or add designs to `products`.
// - Direct card checkout is not yet wired to individual transfer SKUs; by default,
//   selecting a transfer sends the customer's chosen design, size, and quantity
//   into `/request-quote` so PrintFlow Studio can confirm and invoice the order.
// - OWNER OPTIONAL: Set `checkoutUrl` on any item if you add a direct Stripe
//   Payment Link or Etsy listing URL for that transfer.
// ============================================================================

export type TransferSize = {
    id: string;
    label: string;
    dimensions: string;
    price: number;
    inventory: number;
};

export type Product = {
    id: string;
    title: string;
    image: string;
    alt: string;
    category: string;
    description?: string;
    pressingInstructions?: string[];
    isNew?: boolean;
    isBestSeller?: boolean;
    sizes: TransferSize[];
    checkoutUrl?: string; // OWNER OPTIONAL: Direct Stripe Payment Link or Etsy listing URL
};

export const defaultDescription =
    "Create your own custom apparel with this vibrant, ready-to-press Direct-to-Film (DTF) transfer. The design arrives printed and cured on release film for application using a commercial heat press. Garment is not included.";

export const defaultPressingInstructions = [
    "Pre-press the garment for 5 seconds to remove moisture and wrinkles.",
    "Position the transfer with the printed side facing upward.",
    "Press at approximately 300–320°F for 10–15 seconds using medium-to-heavy pressure.",
    "Allow the transfer to cool completely before peeling (cold peel).",
    "Peel the carrier film smoothly from one corner.",
    "Cover the design with parchment paper or a finishing sheet and press again for 5 seconds."
];

export const getStandardSizes = (): TransferSize[] => [
    { id: "size-pocket", label: "Pocket", dimensions: "approximately 4 inches wide", price: 6.99, inventory: 100 },
    { id: "size-youth", label: "Youth", dimensions: "approximately 8 inches wide", price: 8.99, inventory: 100 },
    { id: "size-adult", label: "Adult Standard", dimensions: "approximately 10–11 inches wide", price: 10.99, inventory: 100 },
    { id: "size-large", label: "Adult Large", dimensions: "approximately 12 inches wide", price: 12.99, inventory: 100 },
    { id: "size-oversized", label: "Oversized", dimensions: "approximately 13–14 inches wide", price: 15.99, inventory: 100 },
];

export const products: Product[] = [
    {
        id: "prod-1",
        title: "Chattanooga River City Energy",
        image: "/shop/chattanooga-bridge.jpg",
        alt: "Chattanooga River City Energy bridge and river sunrise DTF transfer artwork",
        category: "Chattanooga",
        isBestSeller: true,
        sizes: getStandardSizes(),
        checkoutUrl: ""
    },
    {
        id: "prod-2",
        title: "Social Battery Out of Office",
        image: "/shop/social-battery.jpg",
        alt: "Social Battery Out of Office illustrated DTF transfer design",
        category: "Funny",
        isNew: true,
        sizes: getStandardSizes(),
        checkoutUrl: ""
    },
    {
        id: "prod-3",
        title: "Management Has Gone To The Dogs",
        image: "/shop/management-dogs.jpg",
        alt: "Management Has Gone To The Dogs office dogs DTF transfer design",
        category: "Business & Humor",
        sizes: getStandardSizes(),
        checkoutUrl: ""
    },
    {
        id: "prod-4",
        title: "Reading After Sundown",
        image: "/shop/reading-sundown.jpg",
        alt: "Reading After Sundown stacked western books and crescent moon DTF transfer design",
        category: "Book Lovers",
        sizes: getStandardSizes(),
        checkoutUrl: ""
    },
    {
        id: "prod-5",
        title: "Grace Grows Here",
        image: "/shop/grace-grows.jpg",
        alt: "Grace Grows Here floral faith DTF transfer artwork",
        category: "Faith",
        isNew: true,
        sizes: getStandardSizes(),
        checkoutUrl: ""
    },
    {
        id: "prod-6",
        title: "Scenic City Sweater Weather",
        image: "/shop/scenic-city-sweater-weather.jpg",
        alt: "Scenic City Sweater Weather Chattanooga autumn DTF transfer artwork",
        category: "Chattanooga",
        sizes: getStandardSizes(),
        checkoutUrl: ""
    },
    {
        id: "prod-7",
        title: "Autumn Runs Deep",
        image: "/shop/autumn-runs-deep.jpg",
        alt: "Autumn Runs Deep cozy mug, knit scarf, and fall leaves DTF transfer design",
        category: "Seasonal",
        sizes: getStandardSizes(),
        checkoutUrl: ""
    },
    {
        id: "prod-8",
        title: "Pass the Pie",
        image: "/shop/pass-the-pie.jpg",
        alt: "Pass the Pie autumn Thanksgiving dessert DTF transfer design",
        category: "Seasonal",
        sizes: getStandardSizes(),
        checkoutUrl: ""
    },
    {
        id: "prod-9",
        title: "Holiday Fuel",
        image: "/shop/holiday-fuel.jpg",
        alt: "Merry and Bright Running on Holiday Fuel thermos and camp mug DTF transfer design",
        category: "Seasonal",
        isNew: true,
        sizes: getStandardSizes(),
        checkoutUrl: ""
    },
    {
        id: "prod-10",
        title: "The Ghost Shift Bakery",
        image: "/shop/ghost-shift.jpg",
        alt: "The Ghost Shift Bakery Halloween ghost DTF transfer design",
        category: "Halloween",
        sizes: getStandardSizes(),
        checkoutUrl: ""
    },
    {
        id: "prod-11",
        title: "Midnight Mischief Club",
        image: "/shop/midnight-mischief.jpg",
        alt: "Midnight Mischief Club spooky Halloween DTF transfer design",
        category: "Halloween",
        sizes: getStandardSizes(),
        checkoutUrl: ""
    }
];

export const getActiveCategories = (): string[] => {
    const cats = new Set<string>();
    products.forEach((p) => cats.add(p.category));
    return Array.from(cats).sort();
};
