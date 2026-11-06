import { stripeClient } from '../server/stripe-client.js';
export function createCheckoutStatusHandler(getStripe = stripeClient) {
  return async function handler(request, response) {
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Robots-Tag', 'noindex, nofollow');
    if (request.method !== 'GET') return response.status(405).json({ error: 'Method not allowed.' });
    const id = request.query?.session_id;
    if (typeof id !== 'string' || !/^cs_(live|test)_[a-zA-Z0-9]{10,200}$/.test(id)) return response.status(400).json({ error: 'Invalid payment reference.' });
    try {
      const session = await getStripe().checkout.sessions.retrieve(id);
      if (session.metadata?.storefront !== 'printflow-web') return response.status(404).json({ error: 'Order not found.' });
      // Return no customer identity, contact information or delivery address.
      return response.status(200).json({ status: session.payment_status === 'paid' ? 'paid' : session.metadata?.payment_failed === 'true' ? 'failed' : session.status === 'expired' ? 'expired' : 'pending' });
    } catch {
      return response.status(503).json({ error: 'Payment status could not be confirmed right now.' });
    }
  };
}
export default createCheckoutStatusHandler();
