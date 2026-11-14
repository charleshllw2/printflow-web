import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import { db } from '../lib/firebase';
import { STAGES, requestedTime, type TrackingView } from '../tracker/model';
import '../styles/OrderTracker.css';
export default function OrderTracker() {
 const { token = '' } = useParams();
 const [view, setView] = useState<TrackingView | null>(null), [state, setState] = useState('loading');
 useEffect(() => {
  if (!/^[a-f0-9]{64}$/.test(token)) return;
  return onSnapshot(doc(db,'trackerViews',token), { includeMetadataChanges: true }, snapshot => { setView(snapshot.exists() ? snapshot.data() as TrackingView : null); setState(snapshot.exists() ? snapshot.metadata.fromCache ? 'cached' : 'connected' : snapshot.metadata.fromCache ? 'loading' : 'missing'); }, () => setState('error'));
 }, [token]);
 const valid = /^[a-f0-9]{64}$/.test(token);
 return <main className="pf-tracker"><Helmet><title>Private Order Tracking | PrintFlow Studio</title><meta name="robots" content="noindex,nofollow,noarchive"/><meta name="referrer" content="no-referrer"/></Helmet>
  <Link to="/" className="pf-tracker-brand"><img src="/printflow-logo-transparent.png" alt="PrintFlow Studio"/></Link>
  <p className="pf-eyebrow">YOUR PRINTFLOW ORDER</p><h1>From print to pickup.</h1>
  <p>This private link shows only this job’s production progress. Anyone with the link can view it; share it only with people involved in your order.</p>
  {(!valid || state === 'missing') ? <div role="status" className="pf-tracker-card">This tracking link is unavailable or has been disabled. Contact PrintFlow Studio if you need a new link.</div> : state === 'error' ? <div role="alert">We cannot connect to live tracking. Check your connection and reopen this page. The displayed status may be out of date.</div> : !view ? <p role="status">Connecting to your order…</p> : <>
   <section className="pf-tracker-card" aria-live="polite"><p className="pf-eyebrow">{view.reference}</p><h2>{STAGES[view.stage]}</h2><p>{view.delivery === 'pickup' ? 'Chattanooga pickup' : 'Delivery'} · Requested time: {requestedTime(view.requestedAt)}</p><p>Requested times are preferences, not a confirmed completion promise. We’ll coordinate handoff with you.</p><p>Last updated: {view.updatedAt ? view.updatedAt.toDate().toLocaleString('en-US', { timeZone:'America/New_York' }) + ' Eastern' : 'Saving…'}</p><small>{state === 'cached' ? 'Reconnecting… this is the last saved status. Check your internet connection.' : 'Live connection · updates appear automatically.'}</small></section>
   <ol className="pf-tracker-stages">{STAGES.map((stage,i) => <li key={stage} className={i <= view.stage ? 'is-complete' : ''} aria-current={i === view.stage ? 'step' : undefined}><span>{i < view.stage ? '✓' : i+1}</span>{stage}</li>)}</ol>
  </>}
  <p><a href="tel:+14235583692">Call PrintFlow Studio: (423) 558-3692</a> · <a href="mailto:hello@printflowstudio.com">Email us</a></p>
 </main>;
}
