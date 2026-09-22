import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { SHOP_PRODUCTS, STANDARD_COLORS, STANDARD_SIZES } from "../data/shopProducts";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import "./shop.css";

export default function ShopProductPage() {
  const { slug } = useParams();
  const product = SHOP_PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const [view, setView] = useState("mockup");
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

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
      setError(checkoutError.message || "An unexpected error occurred.");
      setBusy(false);
    }
  }

  const productUrl = `https://www.printflowstudio.com/shop/${product.slug}`;

  return (
    <Layout>
      <SEO 
        title={`${product.name} | PrintFlow Studio Shop`}
        description={`Buy the original ${product.name} design by PrintFlow Studio. Available as a standard tee or custom DTF transfer.`}
        canonicalUrl={productUrl}
        ogImage={`https://www.printflowstudio.com${product.mockup}`}
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "image": `https://www.printflowstudio.com${product.mockup}`,
          "description": `Original design "${product.name}" by PrintFlow Studio. Available as a standard tee or custom DTF transfer.`,
          "sku": product.id,
          "offers": {
            "@type": "Offer",
            "url": productUrl,
            "priceCurrency": "USD",
            "price": product.price.toFixed(2),
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
          }
        })}
      />
      <main className="shop-product-page">
        <div className="shop-product-container">
          <Link to="/shop" className="back-to-shop">← Back to Shop</Link>
          
          <div className="shop-product-grid">
            <div className="shop-product-image">
              <div className="shop-image-wrap">
                <img
                  src={view === "mockup" ? product.mockup : product.artwork}
                  alt={view === "mockup" ? `${product.name} shirt mockup` : `${product.name} artwork`}
                  onClick={() => setView(view === "mockup" ? "artwork" : "mockup")}
                  style={{ cursor: "pointer" }}
                />
                <div className="shop-image-tabs" aria-label="Choose product image">
                  <button className={view === "mockup" ? "active" : ""} onClick={() => setView("mockup")}>Mockup</button>
                  <button className={view === "artwork" ? "active" : ""} onClick={() => setView("artwork")}>Design</button>
                </div>
              </div>
            </div>

            <div className="shop-product-details">
              <span className="shop-id">{product.id} · {product.category}</span>
              <h1>{product.name}</h1>
              <p className="shop-price">Standard tee <strong>${product.price.toFixed(2)}</strong></p>
              <p className="shop-description">
                Original design by PrintFlow Studio. Printed on high-quality, comfortable apparel.
                Available for local Chattanooga pickup or nationwide shipping.
              </p>

              <div className="shop-options">
                <label>Size
                  <select value={size} onChange={(event: any) => setSize(event.target.value)}>
                    {STANDARD_SIZES.map((value) => <option key={value}>{value}</option>)}
                  </select>
                </label>
                <label>Color
                  <select value={color} onChange={(event: any) => setColor(event.target.value)}>
                    {STANDARD_COLORS.map((value) => <option key={value}>{value}</option>)}
                  </select>
                </label>
                <label>Qty
                  <select value={quantity} onChange={(event: any) => setQuantity(Number(event.target.value))}>
                    {[1, 2, 3, 4, 5, 10].map((value) => <option key={value}>{value}</option>)}
                  </select>
                </label>
              </div>

              <button className="shop-buy" onClick={buyNow} disabled={busy}>
                {busy ? "Opening secure checkout…" : "Buy Standard Tee"}
              </button>
              
              <div className="shop-product-meta">
                <Link className="shop-custom" to={`/request-quote?${quoteQuery}`}>
                  Request another garment or DTF transfer
                </Link>
                <p className="shipping-info">
                  📦 <strong>Shipping:</strong> Usually ships in 3-5 business days.<br/>
                  📍 <strong>Pickup:</strong> Available at our Chattanooga facility.
                </p>
              </div>

              {error && <p className="shop-error" role="alert">{error}</p>}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
