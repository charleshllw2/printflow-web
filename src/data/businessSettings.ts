// Centralized business settings, pricing offers, fulfillment notes, and privacy/advertising flags.
// Edit values in this file to update offers, contact details, external store links, or AdSense status site-wide.

export const BUSINESS_INFO = {
  name: "PrintFlow Studio",
  ownerName: "Charles Holloway",
  phone: "(423) 640-7705",
  phoneHref: "tel:+14236407705",
  email: "hello@printflowstudio.com",
  emailHref: "mailto:hello@printflowstudio.com",
  primaryMarket: "Chattanooga, Tennessee",
  serviceAreas: ["Chattanooga", "Hamilton County", "Hixson", "Cleveland"],
};

export const PRICING_OFFERS = {
  // Starting price for a single custom printed standard tee
  customShirtStartingPrice: 27.99,
  // Price for ready-made original design standard tees in /shop (must match UNIT_AMOUNT in api/create-shop-checkout.js)
  shopStandardTeePrice: 27.99,
  // Business Apparel Starter Pack offer
  businessStarterPackQty: 10,
  businessStarterPackStartingPrice: 199,
  // Ready-to-press Adult Standard DTF transfer multi-buy offer
  transferBundleQty: 3,
  transferBundlePrice: 27.99,
};

// OWNER ACTION: Add full external profile or storefront URLs below when ready to display them publicly.
// Leave any field as "" (empty string) to hide that external link rather than rendering a placeholder link.
export const EXTERNAL_LINKS = {
  etsyShopUrl: "", // e.g. "https://www.etsy.com/shop/PrintFlowStudio"
  googleReviewsUrl: "", // e.g. Google Business Profile review URL
  instagramUrl: "", // e.g. "https://www.instagram.com/..."
  facebookUrl: "", // e.g. "https://www.facebook.com/..."
  tiktokUrl: "", // e.g. "https://www.tiktok.com/@..."
};

export const CARE_INSTRUCTIONS = [
  "Wait at least 24 hours after pressing before the first wash.",
  "Turn the garment inside out and machine wash cold on a gentle cycle.",
  "Use mild detergent; avoid bleach and liquid fabric softeners.",
  "Tumble dry on low heat or hang dry for maximum print longevity.",
  "Do not dry clean or iron directly over the printed graphic.",
];

export const FULFILLMENT_POLICY = {
  pickupSummary: "Local pickup is available by arrangement in the Chattanooga, TN area.",
  shippingSummary: "Nationwide U.S. shipping is available for custom shirts, shop designs, and ready-to-press DTF transfers.",
  timingSummary:
    "Because orders are made to order, production timing depends on order quantity, blank garment availability, and artwork readiness. Production time is separate from carrier transit time—include your needed-by date when requesting a quote so we can confirm a realistic schedule.",
  returnsSummary:
    "Because custom apparel, ready-to-press transfers, and shop garments are made to order, sales are final unless an item arrives damaged, defective, or has a production error on our part.",
};

// OWNER ACTION: Privacy, analytics, and advertising configuration.
// Keep `adsenseApprovedAndActive` set to `false` unless Google AdSense has been approved and enabled.
// If enabled later, optional ad placements are restricted strictly to informational guide pages (/blog/*).
export const PRIVACY_AND_ADS_SETTINGS = {
  lastUpdated: "October 2026",
  analyticsEnabled: true,
  analyticsProvider: "Google Analytics (GA4)",
  adsenseApprovedAndActive: false,
  adsensePublisherNote:
    "PrintFlow Studio may apply for or use third-party advertising services such as Google AdSense on informational guide pages in the future. Advertising placements are not currently active across our shop, checkout, or quote pages.",
};
