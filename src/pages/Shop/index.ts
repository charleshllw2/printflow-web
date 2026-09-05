// Future Product Catalog Structure
// DO NOT PUBLISH OR LINK UNTIL PRODUCTS/PRICING/IMAGES ARE READY

/*
Structure to implement:
/src/pages/Shop/
  - index.tsx (Main Shop listing)
  - ProductDetail.tsx (Individual product page)
  - /categories/
    - CustomTShirts.tsx
    - BusinessApparel.tsx
    - DTFTransfers.tsx

Required Product Data Model:
interface Product {
    id: string;
    sku: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    garmentStyle: string;
    availableColors: string[];
    availableSizes: string[];
    personalizationOptions: any[];
    minQuantity: number;
    productionTime: string;
    deliveryOptions: ('pickup' | 'shipping')[];
    careInstructions: string;
    returnPolicy: string;
    seoTitle: string;
    seoDescription: string;
}
*/
