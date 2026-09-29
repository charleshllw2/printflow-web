// Retired after the Shopify replacement passed catalog/cart/checkout tests.
// Old clients must refresh; never create a second order through Stripe.
export default function handler(_request, response) {
  response.setHeader('Cache-Control', 'no-store');
  return response.status(410).json({ error: 'Checkout has moved. Please refresh the shop and use your cart.' });
}
