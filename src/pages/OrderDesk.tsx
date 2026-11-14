import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, type User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { OWNER_UID, STAGES, requestedTime, type Customer, type Item, type Job } from '../tracker/model';
import { changeJob, createJob, saveCustomer, watchCustomers, watchJobs } from '../tracker/store';
import '../styles/OrderTracker.css';
function CustomerJobs({ customer, report }: { customer: Customer; report: (s: string) => void }) {
 const [jobs,setJobs] = useState<Job[]>([]), [loading,setLoading] = useState(true), [busy,setBusy] = useState(false), [items,setItems] = useState<Item[]>([{description:'',size:'',quantity:1}]);
 useEffect(() => watchJobs(customer.id, rows => { setJobs(rows); setLoading(false); }, () => { report('Order history could not load. Check your connection and permissions.'); setLoading(false); }), [customer.id,report]);
 async function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();const form=event.currentTarget, data=new FormData(form);setBusy(true);report('');
  try {
   await createJob({customerId:customer.id,title:String(data.get('title')).trim(),items:items.map(i=>({...i,description:i.description.trim(),size:i.size.trim()})),artwork:String(data.get('artwork')).trim(),notes:String(data.get('notes')).trim(),requestedAt:data.get('requestedAt') ? new Date(String(data.get('requestedAt'))).toISOString() : '',delivery:data.get('delivery') as 'pickup'|'delivery'});
   form.reset();setItems([{description:'',size:'',quantity:1}]);report('Order saved. Its tracking link is ready to copy below.');
  } catch { report('Order was not saved. Check all fields and your connection, then try again.'); } finally {setBusy(false);}
 }
 async function update(job: Job, stage: number, enabled = job.trackingEnabled) {
  setBusy(true);report('');try {await changeJob(job,stage,enabled);report('Order updated.');}catch(e){report(e instanceof Error?e.message:'Update failed. Please try again.');}finally{setBusy(false);}
 }
 async function copy(job: Job) {const url=`${window.location.origin}/track/${job.token}`;try{await navigator.clipboard.writeText(url);report('Tracking link copied. Share it manually with this customer.');}catch{report('Copy was unavailable. Select and copy the tracking link shown below.');}}
 return <section><h2>{customer.name}</h2><p>{customer.phone}{customer.email ? ` · ${customer.email}` : ''}</p>
  <details className="pf-tracker-card"><summary>Add order for {customer.name}</summary><form onSubmit={submit}>
   <label>Job title (private)<input name="title" required maxLength={160}/></label>
   <p>Items, sizes &amp; quantities (private)</p>
   {items.map((item,i)=><div className="pf-tracker-items" key={i}>
    <label>Item {i+1}<input required maxLength={120} aria-label={`Item ${i+1} description`} value={item.description} onChange={e=>setItems(items.map((v,j)=>i===j?{...v,description:e.target.value}:v))}/></label>
    <label>Size<input maxLength={80} aria-label={`Item ${i+1} size`} value={item.size} onChange={e=>setItems(items.map((v,j)=>i===j?{...v,size:e.target.value}:v))}/></label>
    <label>Qty<input type="number" min="1" max="10000" required aria-label={`Item ${i+1} quantity`} value={item.quantity} onChange={e=>setItems(items.map((v,j)=>i===j?{...v,quantity:Number(e.target.value)}:v))}/></label>
    {items.length>1&&<button type="button" aria-label={`Remove item ${i+1}`} onClick={()=>setItems(items.filter((_,j)=>i!==j))}>Remove</button>}
   </div>)}
   {items.length<10&&<button type="button" onClick={()=>setItems([...items,{description:'',size:'',quantity:1}])}>Add item</button>}
   <label>Artwork details or existing file location (private)<textarea name="artwork" maxLength={3000}/></label>
   <label>Internal notes (private)<textarea name="notes" maxLength={3000}/></label>
   <label>Pickup or delivery<select name="delivery"><option value="pickup">Chattanooga pickup</option><option value="delivery">Delivery</option></select></label>
   <label>Requested time (your device’s local time; optional)<input type="datetime-local" name="requestedAt"/></label>
   <small>The requested time and delivery method will appear on the customer’s page. Contact details, job title, items, artwork and internal notes will stay private.</small>
   <div className="pf-tracker-actions"><button disabled={busy}>Save order</button></div>
  </form></details>
  <h3>Previous &amp; current jobs</h3>{loading?<p role="status">Loading order history…</p>:!jobs.length?<p className="empty">No jobs yet. Add the first order above.</p>:jobs.map(job=><article key={job.id} className="pf-tracker-card">
   <p className="pf-eyebrow">{job.reference}</p><h3>{job.title}</h3><p>{STAGES[job.stage]} · {job.delivery} · Requested: {requestedTime(job.requestedAt)}</p>
   <ul>{job.items.map((item,i)=><li key={i}>{item.quantity} × {item.description}{item.size?` · ${item.size}`:''}</li>)}</ul>
   {job.artwork&&<p>Artwork: {job.artwork}</p>}{job.notes&&<p>Internal notes: {job.notes}</p>}
   <p>Last updated: {job.updatedAt?.toDate().toLocaleString()||'Saving…'}</p>
   <div className="pf-tracker-actions" role="group" aria-label={`Production stage for ${job.reference}`}>{STAGES.map((stage,i)=><button className="stage-button" key={stage} disabled={busy} aria-pressed={job.stage===i} onClick={()=>update(job,i)}>{stage}</button>)}</div>
   {job.trackingEnabled?<><button disabled={busy} onClick={()=>copy(job)}>Copy tracking link</button><a className="pf-tracker-link" href={`/track/${job.token}`} target="_blank" rel="noreferrer">{window.location.origin}/track/{job.token}</a><button disabled={busy} onClick={()=>update(job,job.stage,false)}>Disable tracking link</button></>:<><p>Customer tracking is disabled.</p><button disabled={busy} onClick={()=>update(job,job.stage,true)}>Enable tracking link</button></>}
  </article>)}
 </section>;
}
export default function OrderDesk() {
 const [user,setUser]=useState<User|null>(null),[checking,setChecking]=useState(true),[customers,setCustomers]=useState<Customer[]>([]),[selected,setSelected]=useState<Customer|null>(null),[search,setSearch]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false),[loaded,setLoaded]=useState(false);
 useEffect(()=>onAuthStateChanged(auth,u=>{setUser(u);setChecking(false);}),[]);
 useEffect(()=>{if(user?.uid!==OWNER_UID)return;return watchCustomers(rows=>{setCustomers(rows);setLoaded(true);},()=>setMessage('The customer directory could not load. Check your connection and permissions.'));},[user]);
 async function login(event?:FormEvent<HTMLFormElement>) {event?.preventDefault();setBusy(true);setMessage('');try{if(event){const d=new FormData(event.currentTarget);await signInWithEmailAndPassword(auth,String(d.get('email')),String(d.get('password')));}else await Promise.race([signInWithPopup(auth,new GoogleAuthProvider()),new Promise((_,reject)=>setTimeout(()=>reject(new Error('popup-timeout')),30000))]);}catch{setMessage('Sign-in did not complete. Allow the Google popup in Chrome or Safari, or use your existing website email and password.');}finally{setBusy(false);}}
 async function addCustomer(event:FormEvent<HTMLFormElement>){event.preventDefault();const form=event.currentTarget,d=new FormData(form);setBusy(true);setMessage('');try{const c=await saveCustomer({name:String(d.get('name')),phone:String(d.get('phone')),email:String(d.get('email'))});setSelected(c);form.reset();setMessage('Customer selected. An existing phone number reuses the saved customer and their history.');}catch(e){setMessage(e instanceof Error?e.message:'Customer could not be saved.');}finally{setBusy(false);}}
 const filtered=customers.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())||c.phone.replace(/\D/g,'').includes(search.replace(/\D/g,''))&&/\d/.test(search));
 return <main className="pf-tracker"><Helmet><title>Private Order Desk | PrintFlow Studio</title><meta name="robots" content="noindex,nofollow,noarchive"/><meta name="referrer" content="no-referrer"/></Helmet>
  <header><Link className="pf-tracker-brand" to="/"><img src="/printflow-logo-transparent.png" alt="PrintFlow Studio"/></Link>{user&&<button onClick={()=>{setSelected(null);setCustomers([]);setLoaded(false);void signOut(auth);}}>Sign out</button>}</header>
  <p className="pf-eyebrow">OWNER WORKSPACE</p><h1>Orders &amp; customers.</h1>
  {message&&<div role="status" className="pf-tracker-alert">{message}</div>}
  {checking?<p role="status">Checking sign-in…</p>:!user?<section className="pf-tracker-card"><h2>Sign in to your order desk</h2><p>Owner access only. Use charleshllw2@gmail.com.</p><button disabled={busy} onClick={()=>void login()}>Continue with Google</button><details><summary>Use existing website email and password</summary><form onSubmit={login}><label>Email<input name="email" type="email" autoComplete="username" defaultValue="charleshllw2@gmail.com" required/></label><label>Password<input name="password" type="password" autoComplete="current-password" required/></label><button disabled={busy}>Sign in</button></form></details></section>:user.uid!==OWNER_UID?<section className="pf-tracker-card"><h2>Owner account required</h2><p>This account cannot access customers or orders. Sign out and use the owner account.</p></section>:<>
   <p>Save each customer once, then add their jobs and tap a production stage. Tracking links are shared manually—no email or SMS is sent.</p>
   <div className="pf-tracker-grid"><aside><label>Find customer by name or phone<input type="search" value={search} onChange={e=>setSearch(e.target.value)}/></label>
    {!loaded?<p role="status">Loading directory…</p>:<div className="pf-tracker-customers">{filtered.map(c=><button key={c.id} aria-pressed={selected?.id===c.id} onClick={()=>{setSelected(c);setMessage('');}}>{c.name}<br/><small>{c.phone}</small></button>)}{!filtered.length&&<p>No matching customers.</p>}</div>}
    <details className="pf-tracker-card"><summary>Add customer</summary><form onSubmit={addCustomer}><label>Customer name<input name="name" required maxLength={120}/></label><label>Phone<input name="phone" type="tel" required maxLength={32}/></label><label>Email (optional)<input name="email" type="email" maxLength={254}/></label><button disabled={busy}>Save customer</button></form></details>
   </aside>{selected?<CustomerJobs key={selected.id} customer={selected} report={setMessage}/>:<section className="pf-tracker-card"><h2>Select a customer</h2><p>Find a returning customer or add someone new to see their job history and create an order.</p></section>}</div>
  </>}
 </main>;
}
