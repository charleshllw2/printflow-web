// Retired Shopify endpoint. Product pages are now generated from the real native catalog.
export default function handler(_request, response) {
  response.setHeader('X-Robots-Tag', 'noindex, nofollow');
  return response.status(410).json({ error: 'This endpoint has been retired.' });
}
