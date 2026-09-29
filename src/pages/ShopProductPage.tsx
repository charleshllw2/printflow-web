import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { ShopImage, Price, ShopState } from '../components/ShopUI';
import { commerce, cartChanged } from '../lib/commerce';
import type { Product, Variant } from '../lib/commerce';
import './shop.css';
export default function ShopProductPage() {
  const { slug = '' } = useParams();
  return <ProductLoader key={slug} handle={slug} />;
}
function ProductLoader({ handle }: { handle: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    commerce<Product>(`resource=product&handle=${encodeURIComponent(handle)}`).then(p => { if (active) { setProduct(p); setError(''); } }).catch(e => { if (active) setError(e.message); });
    return () => { active = false; };
  }, [handle, attempt]);
  return <Layout>{product ? <ProductDetails product={product} /> : <main className="shop-product-page"><SEO title={error || 'Loading product | PrintFlow Studio'} description="Shop PrintFlow Studio apparel." /><Link to="/shop">← Back to Shop</Link><ShopState error={error} loading={!error} retry={() => setAttempt(attempt + 1)} /></main>}</Layout>;
}
function ProductDetails({ product }: { product: Product }) {
  const initial = product.variants.nodes.find(v => v.availableForSale) || product.variants.nodes[0];
  const [selected, setSelected] = useState<Record<string, string>>(() => Object.fromEntries(initial?.selectedOptions.map(o => [o.name, o.value]) || []));
  const variant = product.variants.nodes.find(v => v.selectedOptions.every(o => selected[o.name] === o.value));
  const [image, setImage] = useState(variant?.image || product.featuredImage);
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  function select(name: string, value: string) {
    const next = { ...selected, [name]: value }; setSelected(next); setMessage('');
    const nextVariant = product.variants.nodes.find(v => v.selectedOptions.every(o => next[o.name] === o.value));
    if (nextVariant?.image) setImage(nextVariant.image);
  }
  async function add(checkout: boolean) {
    if (!variant?.availableForSale || busy) return;
    setBusy(true); setError(''); setMessage('');
    try {
      const result = await commerce<{ warning?: string }>('', { action: 'add', merchandiseId: variant.id, quantity });
      cartChanged(); setMessage(result.warning || 'Added to your cart.');
      if (checkout && !result.warning) { const result = await commerce<{ url: string }>('', { action: 'checkout' }); window.location.assign(result.url); }
    } catch (e) { setError(e instanceof Error ? e.message : 'Please try again.'); }
    finally { setBusy(false); }
  }
  const productUrl = `https://www.printflowstudio.com/shop/${product.handle}`;
  const description = product.seo.description || product.description.slice(0, 160) || `Shop ${product.title} at PrintFlow Studio.`;
  function offer(v: Variant) { return { '@type': 'Offer', price: v.price.amount, priceCurrency: v.price.currencyCode, availability: `https://schema.org/${v.availableForSale ? 'InStock' : 'OutOfStock'}`, url: productUrl }; }
  return <><SEO title={`${product.seo.title || product.title} | PrintFlow Studio Shop`} description={description} canonicalUrl={productUrl} ogImage={image?.url} ogType="product" ogImageAlt={image?.altText || product.title} schema={JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: product.title, description: product.description, image: product.images.nodes.map(i => i.url), offers: product.variants.nodes.map(offer) })} />
    <main className="shop-product-page"><div className="shop-product-container"><Link to="/shop" className="back-to-shop">← Back to Shop</Link>
      <div className="shop-product-grid"><div className="shop-product-image"><div className="shop-image-wrap"><ShopImage image={image} title={product.title} eager /></div>
        <div className="shop-gallery" aria-label="Product images">{product.images.nodes.map((i, index) => <button key={i.url} aria-label={`View image ${index + 1}`} aria-pressed={image?.url === i.url} onClick={() => setImage(i)}><ShopImage image={i} title={product.title} /></button>)}</div></div>
        <div className="shop-product-details"><span className="shop-id">{product.productType}</span><h1>{product.title}</h1><Price price={variant?.price || product.priceRange.minVariantPrice} compare={variant?.compareAtPrice} />
          <p className="shop-description">{product.description}</p><div className="shop-options">{product.options.filter(o => !(o.name === 'Title' && o.values.length === 1 && o.values[0] === 'Default Title')).map(option => <label key={option.name}>{option.name}<select aria-label={option.name} value={selected[option.name] || ''} onChange={e => select(option.name, e.target.value)}>{option.values.map(value => <option key={value} value={value}>{value}</option>)}</select></label>)}
            <label>Quantity<input type="number" min="1" max="99" value={quantity} onChange={e => setQuantity(Number(e.target.value))} /></label></div>
          <p role="status">{variant?.availableForSale ? 'Available' : variant ? 'Sold Out' : 'This combination is unavailable'}</p>
          <button className="shop-buy" disabled={busy || !variant?.availableForSale || !Number.isInteger(quantity) || quantity < 1 || quantity > 99} onClick={() => add(false)}>{busy ? 'Updating cart…' : variant?.availableForSale ? 'Add to Cart' : 'Unavailable'}</button>
          <button className="shop-custom" disabled={busy || !variant?.availableForSale || !Number.isInteger(quantity) || quantity < 1 || quantity > 99} onClick={() => add(true)}>Buy Now</button>
          {message && <div className="shop-success" role="status">{message} <Link to="/shop/cart">View cart</Link></div>}{error && <p className="shop-error" role="alert">{error}</p>}
          <div className="shop-product-meta"><Link className="shop-custom" to={`/request-quote?designName=${encodeURIComponent(product.title)}`}>Request another garment or DTF transfer</Link><p className="shipping-info">Shipping and available pickup options are confirmed at checkout.</p></div>
        </div></div></div></main></>;
}
