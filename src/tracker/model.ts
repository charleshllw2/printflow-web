export const OWNER_UID = 'WH28CTpx3kaOk5prZp9EO4DfVTw1';
export const STAGES = ['Order received', 'Printing started', 'DTF oven', 'Heat press', 'Quality check', 'Ready for pickup or delivery'] as const;
export type Customer = { id: string; name: string; phone: string; email: string };
export type Item = { description: string; size: string; quantity: number };
export type Job = { id: string; customerId: string; reference: string; title: string; items: Item[]; artwork: string; notes: string; requestedAt: string; delivery: 'pickup' | 'delivery'; stage: number; token: string; version: number; updatedAt?: { toDate(): Date }; trackingEnabled: boolean };
export type TrackingView = Pick<Job, 'reference' | 'stage' | 'requestedAt' | 'delivery' | 'updatedAt'>;
export function trackingToken() { return Array.from(crypto.getRandomValues(new Uint8Array(32)), n => n.toString(16).padStart(2, '0')).join(''); }
export function phoneKey(phone: string) { const digits = phone.replace(/\D/g, ''); if (!/^\d{10,15}$/.test(digits)) throw new Error('Enter a phone number with 10–15 digits.'); return digits.length === 10 ? '1' + digits : digits; }
export function requestedTime(value: string) { return value ? new Date(value).toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'medium', timeStyle: 'short' }) + ' Eastern' : 'To be arranged'; }
