import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SHOP_PRODUCTS, STANDARD_COLORS, STANDARD_SIZES } from "../data/shopProducts";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import "./shop.css";

export default function ShopProductPage() {
  const { slug } = useParams();
  const product = SHOP_PRODUCTS.find(p => p.slug === slug);

  const [view, setView] = useState("mockup");
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!product) {
    return (
      <Layout>
        <main className="shop-product-page">
          <Link to="/shop" className="back-to-shop">← Back to Shop</Link>
          <h1>Product not found.</h1>
          <p>This design may have been removed or the URL is incorrect.</p>
        </main>
      </Layout>
    );
  }

  const quoteQuery = new URLSearchParams({
    design: product.id,
    designName: product.name,
    request: "custom apparel or DTF transfer",
  }).toString();

  async function buyNow() {
    if (!product) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/create-shop-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, size, color, quantity }),
      });
      const data = await response.json();
      if (!response.ok || !data.url) throw new Error(data.error || "Checkout could not be started.");
      window.location.assign(data.url);
    } catch (checkoutError: any) {
      setError(checkoutError.message);
      setBusy(false);
    }
  }

  return (
    <Layout>
      <SEO 
        title={`${product.name} | PrintFlow Studio`}
        description={`Buy the ${product.name} standard tee. Premium quality DTF printing. Chattanooga pickup and nationwide shipping available.`}
        canonicalUrl={`https://www.printflowstudio.com/shop/${product.slug}`}
      />
      <main className="shop-product-page">
        <Link to="/shop" className="back-to-shop">← Back to Shop</Link>
        
        <div className="shop-product-grid">
          <div className="shop-product-image">
            <div className="shop-image-wrap">
              <img
                src={view === "mockup" ? product.mockup : product.artwork}
                alt={view === "mockup" ? `${product.name} shirt mockup` : `${product.name} artwork`}
              />
              <div className="shop-image-tabs" aria-label="Choose product image">
                <button className={view === "mockup" ? "active" : ""} onClick={() => setView("mockup")}>Mockup</button>
                <button className={view === "artwork" ? "active" : ""} onClick={() => setView("artwork")}>Design</button>
              </div>
            </div>
          </div>

          <div className="shop-product-details">
            <span className="shop-id" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent-color)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
              {product.category}
            </span>
            <h1>{product.name}</h1>
            <p className="shop-price"><strong>${product.price.toFixed(2)}</strong> <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>/ Standard Tee</span></p>
            
            <p className="shop-description">
              Original PrintFlow Studio design, printed in vibrant full color on a premium standard tee. Made to order.
            </p>

            <div className="shop-options" style={{ marginBottom: '25px' }}>
              <label>Size
                <select value={size} onChange={(event) => setSize(event.target.value)}>
                  {STANDARD_SIZES.map((value) => <option key={value}>{value}</option>)}
                </select>
              </label>
              <label>Color
                <select value={color} onChange={(event) => setColor(event.target.value)}>
                  {STANDARD_COLORS.map((value) => <option key={value}>{value}</option>)}
                </select>
              </label>
              <label>Qty
                <select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => <option key={value}>{value}</option>)}
                </select>
              </label>
            </div>

            <button className="shop-buy" onClick={buyNow} disabled={busy} style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginBottom: '15px' }}>
              {busy ? "Opening secure checkout…" : `Buy Now — $${(product.price * quantity).toFixed(2)}`}
            </button>
            
            {error && <p className="shop-error" role="alert" style={{ marginBottom: '15px' }}>{error}</p>}

            <div className="shop-product-meta">
              <p className="shipping-info">
                <strong>Fulfillment:</strong> Made to order in Chattanooga, TN. Local pickup available. Standard shipping applies for out-of-state orders.
              </p>
              <p className="shipping-info">
                <strong>Care:</strong> Wash inside out on cold. Tumble dry low or hang dry. Do not iron directly on print.
              </p>
            </div>
            
            <div style={{ marginTop: '40px', padding: '25px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Need this design on a different garment?</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>Want a hoodie, long-sleeve, or just the DTF transfer to press yourself?</p>
              <Link className="btn btn-outline" to={`/request-quote?${quoteQuery}`} style={{ display: 'inline-block', fontSize: '0.9rem', padding: '10px 20px' }}>
                Request Custom Order
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
