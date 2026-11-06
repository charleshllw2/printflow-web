import { createHash } from 'node:crypto';

export const MAX_ARTWORK_BYTES = 2 * 1024 * 1024;
const MAX_BODY_BYTES = 3 * 1024 * 1024;
const RECIPIENT = 'hello@printflowstudio.com';
const attempts = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const fields = {
  contactPhone: 'Phone', contactOrg: 'Organization', quantity: 'Quantity',
  purpose: 'Project purpose', locations: 'Print placement', artworkStatus: 'Artwork readiness',
  dateNeeded: 'Requested date (subject to confirmation)', deliveryMethod: 'Pickup or shipping',
  initialService: 'Service', preselectedDesign: 'Design reference',
  preselectedDesignName: 'Design name', preselectedSize: 'Selected size',
  preselectedQty: 'Selected quantity', preselectedVariant: 'Garment or variant',
  notes: 'Project details',
};

function fail(message) { throw new Error(message); }
function validate(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) fail('Please complete the form.');
  if (!['quote', 'contact', 'artwork'].includes(body.kind)) fail('Invalid inquiry type.');
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(body.requestId || '')) fail('Please reload the page and try again.');
  if (body.website) fail('Unable to submit this request.');
  const name = typeof body.contactName === 'string' ? body.contactName.trim() : '';
  const email = typeof body.contactEmail === 'string' ? body.contactEmail.trim() : '';
  if (!name || name.length > 120 || /[\r\n\x00]/.test(name)) fail('Please enter your name (up to 120 characters).');
  if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) fail('Please enter a valid email address.');
  const clean = { kind: body.kind, requestId: body.requestId, contactName: name, contactEmail: email };
  for (const key of Object.keys(fields)) {
    if (body[key] !== undefined && typeof body[key] !== 'string') fail('Invalid project details.');
    const value = (body[key] || '').trim();
    if (value.length > (key === 'notes' ? 6000 : 250) || value.includes('\x00')) fail('Please shorten your project details.');
    clean[key] = value;
  }
  if (clean.kind === 'quote' && (!clean.quantity || !clean.purpose || !clean.locations || !clean.artworkStatus || !clean.dateNeeded || !clean.deliveryMethod)) fail('Please complete each quote step.');
  if (clean.kind === 'contact' && !clean.notes) fail('Please enter your message.');
  if (clean.dateNeeded && (!/^\d{4}-\d{2}-\d{2}$/.test(clean.dateNeeded) || (!Number.isFinite(Date.parse(clean.dateNeeded)) || new Date(clean.dateNeeded).toISOString().slice(0, 10) !== clean.dateNeeded))) fail('Please select a valid date.');
  let attachment;
  if (body.attachment) {
    const { name: filename, type, content } = body.attachment;
    if (typeof filename !== 'string' || filename.length > 200 || typeof content !== 'string' || content.length > Math.ceil(MAX_ARTWORK_BYTES / 3) * 4 || !/^[A-Za-z0-9+/]+={0,2}$/.test(content)) fail('Artwork must be a PNG, JPG, PDF, or SVG file up to 2 MB.');
    const bytes = Buffer.from(content, 'base64');
    if (!bytes.length || bytes.length > MAX_ARTWORK_BYTES || bytes.toString('base64') !== content) fail('Invalid artwork file.');
    const checks = {
      'image/png': ['png', bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))],
      'image/jpeg': ['jpe?g', bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255],
      'application/pdf': ['pdf', bytes.subarray(0, 5).toString() === '%PDF-'],
      'image/svg+xml': ['svg', /<svg[\s>]/i.test(bytes.toString('utf8', 0, 4096))],
    };
    const check = checks[type];
    if (!check || !check[1] || !new RegExp(`\\.${check[0]}$`, 'i').test(filename)) fail('Artwork must be a valid PNG, JPG, PDF, or SVG file.');
    attachment = { filename: filename.split(/[\\/]/).pop().replace(/[^a-zA-Z0-9._-]/g, '_'), content, content_type: type };
  }
  if (clean.kind === 'artwork' && !attachment) fail('Please attach your artwork file.');
  return { clean, attachment };
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed.' });
  const allowed = new Set(['https://www.printflowstudio.com', 'https://printflowstudio.com']);
  for (const host of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]) if (host) allowed.add(`https://${host}`);
  if (!process.env.VERCEL_ENV) { allowed.add('http://localhost:5174'); allowed.add('http://localhost:5173'); }
  if (!allowed.has(request.headers.origin)) return response.status(403).json({ error: 'Please submit through the PrintFlow Studio website.' });
  if (!request.headers['content-type']?.startsWith('application/json')) return response.status(415).json({ error: 'Invalid submission format.' });
  if (Buffer.byteLength(JSON.stringify(request.body ?? '')) > MAX_BODY_BYTES) return response.status(413).json({ error: 'Artwork must be smaller than 2 MB.' });
  let data;
  try { data = validate(request.body); } catch (error) { return response.status(400).json({ error: error.message }); }
  if (!process.env.RESEND_API_KEY) return response.status(503).json({ error: 'Message delivery is temporarily unavailable. Please email hello@printflowstudio.com.' });
  // Bounded, per-instance abuse protection; the fixed recipient prevents use as an open mail relay.
  const now = Date.now();
  for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
  const ip = String(request.headers['x-real-ip'] || request.socket?.remoteAddress || 'unknown');
  const rateKey = createHash('sha256').update(ip).digest('hex');
  const rate = attempts.get(rateKey) || { until: now + WINDOW_MS, ids: new Set() };
  if (rate.ids.size >= 5 && !rate.ids.has(data.clean.requestId)) { response.setHeader('Retry-After', '600'); return response.status(429).json({ error: 'Too many messages. Please wait a few minutes or email hello@printflowstudio.com.' }); }
  rate.ids.add(data.clean.requestId);
  if (attempts.size >= 2000 && !attempts.has(rateKey)) attempts.delete(attempts.keys().next().value);
  attempts.set(rateKey, rate);
  const { clean, attachment } = data;
  const titles = { quote: 'New custom quote request', contact: 'New website message', artwork: 'New custom DTF artwork request' };
  const message = {
    from: 'PrintFlow Studio Website <website@printflowstudio.com>', to: [RECIPIENT],
    reply_to: clean.contactEmail, subject: `${titles[clean.kind]} — ${clean.contactName}`,
    text: [`${titles[clean.kind]}\n`, `Name: ${clean.contactName}`, `Email: ${clean.contactEmail}`, ...Object.entries(fields).filter(([key]) => clean[key]).map(([key, label]) => `${label}: ${clean[key]}`), `\nReference: ${clean.requestId}`, 'Source: https://www.printflowstudio.com', attachment ? `Artwork attached: ${attachment.filename}` : 'No artwork attached.'].join('\n'),
    ...(attachment ? { attachments: [attachment] } : {}),
  };
  const fingerprint = createHash('sha256').update(JSON.stringify(message)).digest('hex').slice(0, 24);
  try {
    const upstream = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `inquiry/${clean.requestId}/${fingerprint}` },
      body: JSON.stringify(message), signal: AbortSignal.timeout(15000),
    });
    const result = await upstream.json().catch(() => null);
    if (!upstream.ok || !result?.id) { console.error('Inquiry delivery rejected', upstream.status); return response.status(502).json({ error: 'Your message could not be sent. Your details are still filled in; please try again or email hello@printflowstudio.com.' }); }
    return response.status(200).json({ success: true, reference: clean.requestId });
  } catch {
    console.error('Inquiry delivery connection failed');
    return response.status(502).json({ error: 'Delivery could not be confirmed. Keep your details and try again, or email hello@printflowstudio.com.' });
  }
}
