import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import Stripe from 'stripe';
import { createCheckoutStatusHandler } from '../api/checkout-status.js';
import { createOrderWebhook } from '../api/stripe-webhook.js';
import { paidOrderMessage } from '../server/order-notification.js';
function response() { return { code: 200, setHeader() {}, status(code) { this.code = code; return this; }, json(data) { this.data = data; return this; } }; }
const session = { id: 'cs_test_abcdefghijklmno', metadata: { storefront: 'printflow-web', designName: 'Test tee', size: 'M', color: 'Black', deliveryMethod: 'shipping' }, status: 'complete', payment_status: 'paid', currency: 'usd', amount_total: 2799, customer_details: { email: 'buyer@example.com', name: 'Test buyer' }, line_items: { data: [{ quantity: 1, description: 'Test tee', amount_total: 2799 }] } };
for (const payment of ['paid', 'unpaid']) test(`status verifies ${payment} with Stripe and returns no customer data`, async () => {
 const res = response(); await createCheckoutStatusHandler(() => ({ checkout: { sessions: { retrieve: async () => ({ ...session, payment_status: payment }) } } }))({ method: 'GET', query: { session_id: session.id } }, res);
 assert.deepEqual(res.data, { status: payment === 'paid' ? 'paid' : 'pending' });
});
test('URL flag without a Stripe session never confirms payment', async () => { const res = response(); await createCheckoutStatusHandler(() => { throw Error('must not call'); })({ method: 'GET', query: { paid: '1' } }, res); assert.equal(res.code, 400); });
test('unrelated Stripe sessions are not exposed', async () => { const res = response(); await createCheckoutStatusHandler(() => ({ checkout: { sessions: { retrieve: async () => ({ ...session, metadata: {} }) } } }))({ method: 'GET', query: { session_id: session.id } }, res); assert.equal(res.code, 404); });
const sdk = new Stripe('sk_test_fixture_only');
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_fixture_only';
async function invoke(type, current = session, badSignature = false) {
 let notified = 0; const updates = [];
 const payload = JSON.stringify({ id: 'evt_fixture', type, data: { object: current } });
 const req = Readable.from([payload]); req.method = 'POST'; req.headers = { 'stripe-signature': badSignature ? 'bad' : sdk.webhooks.generateTestHeaderString({ payload, secret: process.env.STRIPE_WEBHOOK_SECRET }) };
 const stripe = { webhooks: sdk.webhooks, checkout: { sessions: { retrieve: async () => current, update: async (id, data) => updates.push({ id, data }) } } };
 const res = response(); await createOrderWebhook(() => stripe, async () => { notified++; return 'email_fixture'; })(req, res);
 return { res, notified, updates };
}
test('signed paid session sends order notification and persists delivery marker', async () => { const result = await invoke('checkout.session.completed'); assert.equal(result.res.code, 200); assert.equal(result.notified, 1); assert.equal(result.updates[0].data.metadata.owner_notification_id, 'email_fixture'); });
test('invalid signatures cannot send an order email', async () => { const result = await invoke('checkout.session.completed', session, true); assert.equal(result.res.code, 400); assert.equal(result.notified, 0); });
test('unpaid completion cannot trigger fulfillment', async () => { assert.equal((await invoke('checkout.session.completed', { ...session, payment_status: 'unpaid' })).notified, 0); });
test('already notified order is ignored on webhook replay', async () => { assert.equal((await invoke('checkout.session.async_payment_succeeded', { ...session, metadata: { ...session.metadata, owner_notification_id: 'existing' } })).notified, 0); });
test('failed asynchronous payment records failure without fulfillment', async () => { const result = await invoke('checkout.session.async_payment_failed', { ...session, payment_status: 'unpaid' }); assert.equal(result.notified, 0); assert.equal(result.updates[0].data.metadata.payment_failed, 'true'); });
test('paid order email goes to fixed owner address', () => { const message = paidOrderMessage(session); assert.ok(JSON.stringify(message.to).includes('hello@printflowstudio.com')); assert.ok(message.text.includes('Test tee')); assert.ok(message.text.includes('27.99')); });
