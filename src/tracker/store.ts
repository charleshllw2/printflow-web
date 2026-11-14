import { collection, doc, onSnapshot, query, where, runTransaction, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { phoneKey, trackingToken, type Customer, type Item, type Job } from './model';
export function watchCustomers(next: (rows: Customer[]) => void, error: (e: Error) => void) {
 return onSnapshot(collection(db, 'trackerCustomers'), s => next(s.docs.map(d => ({ ...d.data(), id: d.id } as Customer)).sort((a,b) => a.name.localeCompare(b.name))), error);
}
export function watchJobs(customerId: string, next: (rows: Job[]) => void, error: (e: Error) => void) {
 return onSnapshot(query(collection(db, 'trackerJobs'), where('customerId', '==', customerId)), s => next(s.docs.map(d => ({ ...d.data(), id: d.id } as Job)).sort((a,b) => (b.updatedAt?.toDate().getTime() || 0) - (a.updatedAt?.toDate().getTime() || 0))), error);
}
export async function saveCustomer(input: Omit<Customer, 'id'>) {
 const id = phoneKey(input.phone), ref = doc(db, 'trackerCustomers', id);
 return runTransaction(db, async tx => {
  const existing = await tx.get(ref);
  if (existing.exists()) return { ...existing.data(), id } as Customer;
  const customer = { name: input.name.trim(), phone: input.phone.trim(), email: input.email.trim() };
  tx.set(ref, { ...customer, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return { ...customer, id };
 });
}
export async function createJob(input: { customerId: string; title: string; items: Item[]; artwork: string; notes: string; requestedAt: string; delivery: 'pickup' | 'delivery' }) {
 const ref = doc(collection(db, 'trackerJobs')), token = trackingToken(), reference = 'PF-' + ref.id.slice(0,8).toUpperCase();
 const batch = writeBatch(db);
 batch.set(ref, { ...input, token, reference, stage: 0, version: 1, trackingEnabled: true, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
 batch.set(doc(db, 'trackerViews', token), { jobId: ref.id, reference, stage: 0, requestedAt: input.requestedAt, delivery: input.delivery, updatedAt: serverTimestamp() });
 await batch.commit(); return ref.id;
}
export async function changeJob(job: Job, stage: number, trackingEnabled = job.trackingEnabled) {
 await runTransaction(db, async tx => {
  const ref = doc(db,'trackerJobs',job.id), snapshot = await tx.get(ref);
  if (!snapshot.exists() || snapshot.data().version !== job.version) throw new Error('This job changed on another device. Review the latest stage and try again.');
  tx.update(ref, { stage, trackingEnabled, version: job.version + 1, updatedAt: serverTimestamp() });
  const viewRef = doc(db,'trackerViews',job.token);
  if (trackingEnabled) tx.set(viewRef, { jobId: job.id, reference: job.reference, stage, requestedAt: job.requestedAt, delivery: job.delivery, updatedAt: serverTimestamp() });
  else tx.delete(viewRef);
 });
}
