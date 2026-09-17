export type TransferSize = {
    id: string;
    label: string; // e.g. "Pocket", "Adult Standard"
    dimensions: string; // e.g. "approximately 4 inches"
    price: number;
    inventory: number;
};

export type Product = {
    id: string;
    title: string;
    image: string;
    category: string;
    description?: string;
    pressingInstructions?: string[];
    isNew?: boolean;
    isBestSeller?: boolean;
    sizes: TransferSize[];
};

export const defaultDescription = "Create your own custom apparel with this vibrant, ready-to-press DTF transfer. The design arrives printed and ready for application to a compatible garment using a heat press. Garment is not included.";

export const defaultPressingInstructions = [
    "Pre-press the garment for 5 seconds to remove moisture and wrinkles.",
    "Position the transfer with the printed side facing upward.",
    "Press at approximately 300–320°F for 10–15 seconds using medium pressure.",
    "Allow the transfer to cool according to the transfer instructions.",
    "Peel the carrier film as directed.",
    "Cover the design with parchment paper or a finishing sheet and press again for 5 seconds."
];

// Reusable standard sizes configuration
export const getStandardSizes = (): TransferSize[] => [
    { id: 'size-pocket', label: 'Pocket', dimensions: 'approximately 4 inches', price: 6.99, inventory: 100 },
    { id: 'size-youth', label: 'Youth', dimensions: 'approximately 8 inches', price: 8.99, inventory: 100 },
    { id: 'size-adult', label: 'Adult Standard', dimensions: 'approximately 10–11 inches', price: 10.99, inventory: 100 },
    { id: 'size-large', label: 'Adult Large', dimensions: 'approximately 12 inches', price: 12.99, inventory: 100 },
    { id: 'size-oversized', label: 'Oversized', dimensions: 'approximately 13–14 inches', price: 15.99, inventory: 100 },
];

export const products: Product[] = [
    {
        id: 'prod-1',
        title: 'Chattanooga River City Energy',
        image: '/shop/chattanooga-bridge.jpg',
        category: 'Chattanooga',
        isBestSeller: true,
        sizes: getStandardSizes()
    },
    {
        id: 'prod-2',
        title: 'Social Battery Out of Office',
        image: '/shop/social-battery.jpg',
        category: 'Funny',
        isNew: true,
        sizes: getStandardSizes()
    },
    {
        id: 'prod-3',
        title: 'Management Has Gone To The Dogs',
        image: '/shop/management-dogs.jpg',
        category: 'Funny',
        sizes: getStandardSizes()
    },
    {
        id: 'prod-4',
        title: 'Reading After Sundown',
        image: '/shop/reading-sundown.jpg',
        category: 'Inspirational',
        sizes: getStandardSizes()
    },
    {
        id: 'prod-5',
        title: 'Grace Grows Here',
        image: '/shop/grace-grows.jpg',
        category: 'Faith',
        isNew: true,
        sizes: getStandardSizes()
    }
];

// Helper to get all categories that have at least one product
export const getActiveCategories = (): string[] => {
    const cats = new Set<string>();
    products.forEach(p => cats.add(p.category));
    return Array.from(cats).sort();
};
