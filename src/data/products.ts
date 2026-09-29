export type TransferSize = {
    id: string;
    label: string; // e.g. "Pocket", "Adult Standard"
    dimensions: string; // e.g. "approximately 4 inches"
    price: number;
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
