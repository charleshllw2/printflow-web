import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import handler, { MAX_ARTWORK_BYTES } from '../api/submit-inquiry.js';
const originalFetch = global.fetch;
const originalEnv = { ...process.env };
let captured;
let ip = 0;
const quote = () => ({ kind: 'quote', requestId: randomUUID(), contactName: 'Website Test', contactEmail: 'customer@example.com', quantity: '10–24 items', purpose: 'Business / Crew', locations: 'Front', artworkStatus: 'I need a design created', dateNeeded: '2026-12-30', deliveryMethod: 'Not sure yet', notes: 'Delivery test, no order.' });
beforeEach(() => {
  process.env.RESEND_API_KEY = 'test-placeholder';
  delete process.env.VERCEL_ENV;
  captured = [];
  global.fetch = async (url, options) => { captured.push({ url, ...options, body: JSON.parse(options.body) }); return { ok: true, status: 200, json: async () => ({ id: 'mail-test-id' }) }; };
});
afterEach(() => { global.fetch = originalFetch; process.env = { ...originalEnv }; });
async function run(body = quote(), options = {}) {
  const req = { method: 'POST', body, headers: { origin: 'https://www.printflowstudio.com', 'content-type': 'application/json', 'x-real-ip': `test-${++ip}` }, ...options };
  const res = { headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(code) { this.code = code; return this; }, json(data) { this.body = data; return this; } };
  await handler(req, res); return res;
}
test('quotes go to the fixed owner inbox, with customer reply-to and all project details', async () => {
  const input = { ...quote(), to: 'attacker@example.com' }; const r = await run(input);
  assert.equal(r.code, 200); assert.equal(r.body.success, true);
  assert.deepEqual(captured[0].body.to, ['hello@printflowstudio.com']);
  assert.equal(captured[0].body.reply_to, input.contactEmail);
  assert.match(captured[0].body.text, /Requested date \(subject to confirmation\): 2026-12-30/);
  assert.match(captured[0].body.text, /Quantity: 10–24 items/);
  assert.match(captured[0].body.text, new RegExp(input.requestId));
  assert.equal(captured[0].url, 'https://api.resend.com/emails');
});
test('contact and custom artwork use the same verified delivery path', async () => {
  const base = { kind: 'contact', requestId: randomUUID(), contactName: 'Test', contactEmail: 'customer@example.com', notes: 'Hello' };
  assert.equal((await run(base)).code, 200);
  const content = Buffer.from('%PDF-1.4\nOwner-requested artwork delivery test.').toString('base64');
  assert.equal((await run({ ...base, kind: 'artwork', requestId: randomUUID(), attachment: { name: 'delivery-test.pdf', type: 'application/pdf', content } })).code, 200);
  assert.equal(captured[1].body.attachments[0].content, content);
  assert.equal(captured[1].body.attachments[0].filename, 'delivery-test.pdf');
});
test('retries use the same provider idempotency key; changed project details use a different key', async () => {
  const input = quote(); await run(input); await run(input); await run({ ...input, notes: 'Changed project' });
  assert.equal(captured[0].headers['Idempotency-Key'], captured[1].headers['Idempotency-Key']);
  assert.notEqual(captured[1].headers['Idempotency-Key'], captured[2].headers['Idempotency-Key']);
});
test('missing credentials do not claim success', async () => { delete process.env.RESEND_API_KEY; const r = await run(); assert.equal(r.code, 503); assert.equal(r.body.success, undefined); assert.equal(captured.length, 0); });
test('provider rejection, malformed acceptance and network errors never return success', async () => {
  for (const provider of [async () => ({ ok: false, status: 403, json: async () => ({ error: 'provider detail' }) }), async () => ({ ok: true, status: 200, json: async () => ({ success: true }) }), async () => { throw new Error('network failure'); }]) {
    global.fetch = provider; const r = await run(); assert.equal(r.code, 502); assert.equal(r.body.success, undefined); assert.doesNotMatch(r.body.error, /provider detail|network failure/);
  }
});
test('cross-origin posts and non-JSON requests are rejected before delivery', async () => {
  assert.equal((await run(quote(), { headers: { origin: 'https://unrelated.example', 'content-type': 'application/json' } })).code, 403);
  assert.equal((await run(quote(), { headers: { origin: 'https://www.printflowstudio.com', 'content-type': 'text/plain' } })).code, 415);
  assert.equal(captured.length, 0);
});
test('missing required fields, invalid email, injected headers and honeypots are rejected', async () => {
  for (const changed of [{ contactName: '' }, { contactEmail: 'bad-address' }, { contactName: 'Test\nBcc:attacker@example.com' }, { quantity: '' }, { requestId: 'invalid' }, { website: 'spam' }, { notes: 'a'.repeat(6001) }]) assert.equal((await run({ ...quote(), ...changed })).code, 400);
  assert.equal(captured.length, 0);
});
test('invalid, disguised, missing and oversized artwork is rejected', async () => {
  const base = { ...quote(), kind: 'artwork' };
  for (const attachment of [undefined, { name: 'bad.png', type: 'image/png', content: Buffer.from('not a PNG').toString('base64') }, { name: 'bad.exe', type: 'application/pdf', content: Buffer.from('%PDF-1.4').toString('base64') }, { name: 'big.pdf', type: 'application/pdf', content: Buffer.alloc(MAX_ARTWORK_BYTES + 1).toString('base64') }]) assert.equal((await run({ ...base, attachment })).code, 400);
  assert.equal(captured.length, 0);
});
test('rate limiting bounds new inquiries while allowing retries of the same request', async () => {
  const headers = { origin: 'https://www.printflowstudio.com', 'content-type': 'application/json', 'x-real-ip': 'rate-test' };
  const first = quote(); assert.equal((await run(first, { headers })).code, 200);
  for (let i = 0; i < 4; i++) assert.equal((await run(quote(), { headers })).code, 200);
  assert.equal((await run(quote(), { headers })).code, 429);
  assert.equal((await run(first, { headers })).code, 200);
});
test('GET cannot submit a request', async () => { assert.equal((await run(quote(), { method: 'GET' })).code, 405); assert.equal(captured.length, 0); });
