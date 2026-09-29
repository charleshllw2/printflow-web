import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { ShopImage, ShopState, Price } from '../components/ShopUI';
import { commerce, cartChanged, formatMoney } from '../lib/commerce';
import type { Cart } from '../lib/commerce';
import './shop.css';
export default function ShopCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    commerce<{ cart: Cart | null }>('resource=cart').then(data => { if (active) { setCart(data.cart); setError(''); } }).catch(e => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [attempt]);
  async function change(action: string, lineId?: string, quantity?: number) {
    if (busy) return;
    setBusy(true); setError(''); setWarning('');
    try { const data = await commerce<{ cart: Cart; warning?: string; url?: string }>('', { action, lineId, quantity });
      if (data.url) { window.location.assign(data.url); return; }
      setCart(data.cart); setWarning(data.warning || ''); cartChanged();
    } catch (e) { setError(e instanceof Error ? e.message : 'Please try again.'); }
    finally { setBusy(false); }
  }
  return <Layout><SEO title="Your Cart | PrintFlow Studio" description="Review your PrintFlow Studio order." canonicalUrl="https://www.printflowstudio.com/shop/cart" /><main className="shop-page"><Link to="/shop" className="back-to-shop">← Continue shopping</Link><h1>Your Cart</h1>
    {loading && <ShopState loading />}{error && <ShopState error={error} retry={() => setAttempt(attempt + 1)} />}{warning && <p role="status" className="shop-success">{warning}</p>}
    {!loading && !error && !cart?.totalQuantity && <div className="shop-state"><p>Your cart is empty.</p><Link className="btn btn-primary" to="/shop">Explore designs</Link></div>}
    {!!cart?.totalQuantity && <><div className="shop-cart-lines">{cart.lines.nodes.map(line => <article className="shop-cart-line" key={line.id}><Link className="shop-cart-image" to={`/shop/${line.merchandise.product.handle}`}><ShopImage image={line.merchandise.image} title={line.merchandise.product.title} /></Link><div><h2><Link to={`/shop/${line.merchandise.product.handle}`}>{line.merchandise.product.title}</Link></h2><p>{line.merchandise.selectedOptions.filter(o => o.value !== 'Default Title').map(o => `${o.name}: ${o.value}`).join(' · ')}</p><Price price={line.cost.amountPerQuantity} />{!line.merchandise.availableForSale && <p className="shop-error">Sold Out — please remove this item.</p>}<div className="shop-cart-quantity"><button aria-label={`Decrease quantity of ${line.merchandise.product.title}`} disabled={busy || line.quantity <= 1} onClick={() => change('update', line.id, line.quantity - 1)}>−</button><label>Quantity<select aria-label={`Quantity for ${line.merchandise.product.title}`} disabled={busy} value={line.quantity} onChange={e => change('update', line.id, Number(e.target.value))}>{Array.from({ length: Math.max(99, line.quantity) }, (_, i) => i + 1).map(q => <option key={q}>{q}</option>)}</select></label><button aria-label={`Increase quantity of ${line.merchandise.product.title}`} disabled={busy || line.quantity >= 99} onClick={() => change('update', line.id, line.quantity + 1)}>+</button><button disabled={busy} onClick={() => change('remove', line.id)}>Remove</button></div></div><strong>{formatMoney(line.cost.totalAmount)}</strong></article>)}</div><aside className="shop-cart-summary"><h2>Subtotal {formatMoney(cart.cost.subtotalAmount)}</h2><p>Shipping and taxes are calculated at checkout.</p><button className="shop-buy" disabled={busy || cart.lines.nodes.some(l => !l.merchandise.availableForSale)} onClick={() => change('checkout')}>{busy ? 'Please wait…' : 'Secure Checkout'}</button></aside></>}
  </main></Layout>;
}
