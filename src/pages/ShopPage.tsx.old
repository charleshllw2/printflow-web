// @ts-nocheck
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SHOP_PRODUCTS, STANDARD_COLORS, STANDARD_SIZES } from "../data/shopProducts";
import "./shop.css";

function ProductCard({ product }) {
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
    } catch (checkoutError) {
      setError(checkoutError.message);
      setBusy(false);
    }
  }

  return (
    <article className="shop-card">
      <div className="shop-image-wrap">
        <img
          src={view === "mockup" ? product.mockup : product.artwork}
          alt={view === "mockup" ? `${product.name} shirt mockup` : `${product.name} artwork`}
          loading="lazy"
        />
        <div className="shop-image-tabs" aria-label="Choose product image">
          <button className={view === "mockup" ? "active" : ""} onClick={() => setView("mockup")}>Mockup</button>
          <button className={view === "artwork" ? "active" : ""} onClick={() => setView("artwork")}>Design</button>
        </div>
      </div>

      <div className="shop-card-body">
        <span className="shop-id">{product.id} · {product.category}</span>
        <h2>{product.name}</h2>
        <p className="shop-price">Standard tee <strong>${product.price.toFixed(2)}</strong></p>

        <div className="shop-options">
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
              {[1, 2, 3, 4, 5].map((value) => <option key={value}>{value}</option>)}
            </select>
          </label>
        </div>

        <button className="shop-buy" onClick={buyNow} disabled={busy}>
          {busy ? "Opening secure checkout…" : "Buy Standard Tee"}
        </button>
        <Link className="shop-custom" to={`/request-quote?${quoteQuery}`}>
          Request another garment or DTF transfer
        </Link>
        {error && <p className="shop-error" role="alert">{error}</p>}
      </div>
    </article>
  );
}

import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(SHOP_PRODUCTS.map((product) => product.category))];
  const products = useMemo(
    () => category === "All" ? SHOP_PRODUCTS : SHOP_PRODUCTS.filter((product) => product.category === category),
    [category]
  );

  return (
    <Layout>
      <SEO 
        title="Shop Original T-Shirt Designs | PrintFlow Studio"
        description="Shop original PrintFlow Studio T-shirt designs or request custom apparel and ready-to-press DTF transfers in Chattanooga, Tennessee."
      />
      <main className="shop-page">
        <section className="shop-intro">
          <p className="shop-eyebrow">PRINTFLOW STUDIO DESIGN SHOP</p>
          <h1>Pick a design. Make it yours.</h1>
          <p>Shop a standard tee online, or request another garment, size, color, or ready-to-press DTF transfer.</p>
        </section>

        {searchParams.get("paid") === "1" && (
          <div className="shop-success" role="status">
            Thank you! Your payment was received. PrintFlow Studio will contact you with production details.
          </div>
        )}

        <nav className="shop-filters" aria-label="Design categories">
          {categories.map((value) => (
            <button key={value} className={category === value ? "active" : ""} onClick={() => setCategory(value)}>
              {value}
            </button>
          ))}
        </nav>

        <section className="shop-grid" aria-live="polite">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </section>
      </main>
    </Layout>
  );
}
