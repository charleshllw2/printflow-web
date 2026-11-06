import { stripeClient } from '../server/stripe-client.js';
import { notifyPaidOrder } from '../server/order-notification.js';
export const config = { api: { bodyParser: false } };
async function rawBody(request) {
  const chunks = []; let size = 0;
  for await (const chunk of request) { const bytes = Buffer.from(chunk); size += bytes.length; if (size > 1024 * 1024) throw new Error('Webhook too large.'); chunks.push(bytes); }
  return Buffer.concat(chunks);
}
export function createOrderWebhook(getStripe = stripeClient, notify = notifyPaidOrder) {
  return async function handler(request, response) {
    response.setHeader('Cache-Control', 'no-store');
    if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed.' });
    if (!process.env.STRIPE_WEBHOOK_SECRET) return response.status(503).json({ error: 'Webhook is not configured.' });
    const signature = request.headers['stripe-signature'];
    if (typeof signature !== 'string') return response.status(400).json({ error: 'Missing signature.' });
    let stripe, event;
    try { stripe = getStripe(); event = stripe.webhooks.constructEvent(await rawBody(request), signature, process.env.STRIPE_WEBHOOK_SECRET); }
    catch { return response.status(400).json({ error: 'Invalid webhook signature.' }); }
    if (!['checkout.session.completed', 'checkout.session.async_payment_succeeded', 'checkout.session.async_payment_failed'].includes(event.type)) return response.status(200).json({ received: true });
    const eventSession = event.data.object;
    if (eventSession.metadata?.storefront !== 'printflow-web') return response.status(200).json({ received: true });
    try {
      const session = await stripe.checkout.sessions.retrieve(eventSession.id, { expand: ['line_items'] });
      if (event.type === 'checkout.session.async_payment_failed') {
        if (session.payment_status !== 'paid') await stripe.checkout.sessions.update(session.id, { metadata: { payment_failed: 'true' } });
        return response.status(200).json({ received: true });
      }
      if (session.metadata?.storefront !== 'printflow-web' || session.payment_status !== 'paid' || session.metadata?.owner_notification_id) return response.status(200).json({ received: true });
      const emailId = await notify(session);
      // Persist a delivery marker on Stripe's order record so later webhook replays do not email again.
      await stripe.checkout.sessions.update(session.id, { metadata: { owner_notification_id: emailId } });
      return response.status(200).json({ received: true });
    } catch {
      console.error('Paid order notification failed; awaiting Stripe retry');
      return response.status(500).json({ error: 'Order notification is pending retry.' });
    }
  };
}
export default createOrderWebhook();
