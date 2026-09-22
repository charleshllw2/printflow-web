import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const SITE_URL = process.env.SITE_URL || "https://www.printflowstudio.com";
const PRODUCTS = {
  "PF-001": "Pumpkin Sips Become Twinkle-Light Nights",
  "PF-002": "Autumn Bows Before Christmas Glows",
  "PF-003": "Cozy Starts With Leaves and Ends in Lights",
  "PF-004": "When the Pumpkins Glow, the Sleigh Bells Follow",
  "PF-005": "Grateful by Day, Ghostly by Night",
  "PF-006": "October Dressed the World in My Colors",
  "PF-007": "My Happy Place Has Pumpkins and Moonlight",
  "PF-008": "Wrapped in Warmth, Stirred with Spice",
};
const ALLOWED_SIZES = new Set(["S", "M", "L", "XL"]);
const ALLOWED_COLORS = new Set(["Black", "White", "Sand"]);
const UNIT_AMOUNT = 2799;

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });
  if (!process.env.STRIPE_SECRET_KEY) return response.status(503).json({ error: "Online checkout is not connected yet." });

  try {
    const { productId, size, color, quantity = 1 } = request.body || {};
    const safeQuantity = Number(quantity);
    if (!PRODUCTS[productId] || !ALLOWED_SIZES.has(size) || !ALLOWED_COLORS.has(color)) {
      return response.status(400).json({ error: "Please choose a valid design, size, and color." });
    }
    if (!Number.isInteger(safeQuantity) || safeQuantity < 1 || safeQuantity > 5) {
      return response.status(400).json({ error: "Quantity must be between 1 and 5." });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_creation: "always",
      phone_number_collection: { enabled: true },
      shipping_address_collection: { allowed_countries: ["US"] },
      line_items: [{
        quantity: safeQuantity,
        price_data: {
          currency: "usd",
          unit_amount: UNIT_AMOUNT,
          product_data: {
            name: `${PRODUCTS[productId]} — Standard Tee`,
            description: `${productId} · ${color} · Size ${size}`,
          },
        },
      }],
      metadata: { designId: productId, designName: PRODUCTS[productId], size, color },
      success_url: `${SITE_URL}/shop?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/shop?checkout=cancelled`,
    });
    return response.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return response.status(500).json({ error: "Secure checkout could not be opened. Please try again." });
  }
}
