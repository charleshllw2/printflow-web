import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SHOP_PRODUCTS, STANDARD_COLORS, STANDARD_SIZES } from "../data/shopProducts";
import "./shop.css";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  mockup: string;
  artwork: string;
}

interface ProductCardProps {
  product: Product;
}


function ProductCard({ product }: ProductCardProps) {
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
    } catch (checkoutError: any) {
      setError(checkoutError.message || "An unexpected error occurred.");
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
          onClick={() => setView(view === "mockup" ? "artwork" : "mockup")}
          style={{ cursor: "pointer" }}
        />
        <div className="shop-image-tabs" aria-label="Choose product image">
          <button className={view === "mockup" ? "active" : ""} onClick={() => setView("mockup")}>Mockup</button>
          <button className={view === "artwork" ? "active" : ""} onClick={() => setView("artwork")}>Design</button>
        </div>
      </div>

      <div className="shop-card-body">
        <span className="shop-id">{product.id} · {product.category}</span>
        <h2 onClick={() => setView(view === "mockup" ? "artwork" : "mockup")} style={{ cursor: "pointer" }}>{product.name}</h2>
        <p className="shop-price">Standard tee <strong>${product.price.toFixed(2)}</strong></p>

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
        title="Shop Custom T-Shirts & Apparel | PrintFlow Studio"
        description="Shop original PrintFlow Studio apparel and designs. Quality DTF printing, fast Chattanooga pickup, and nationwide shipping. Buy online today!"
        canonicalUrl="https://www.printflowstudio.com/shop"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": "https://www.printflowstudio.com/shop",
              "name": "Shop Custom T-Shirts & Apparel | PrintFlow Studio",
              "description": "Shop original PrintFlow Studio apparel and designs. Quality DTF printing, fast Chattanooga pickup, and nationwide shipping. Buy online today!",
              "url": "https://www.printflowstudio.com/shop"
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.printflowstudio.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Shop",
                  "item": "https://www.printflowstudio.com/shop"
                }
              ]
            },
            ...SHOP_PRODUCTS.map(p => ({
              "@type": "Product",
              "name": p.name,
              "image": "https://www.printflowstudio.com" + p.mockup,
              "description": "Original design by PrintFlow Studio. Available as a standard tee or custom DTF transfer.",
              "sku": p.id,
              "offers": {
                "@type": "Offer",
                "url": "https://www.printflowstudio.com/shop",
                "priceCurrency": "USD",
                "price": p.price.toFixed(2),
                "availability": "https://schema.org/InStock"
              }
            }))
          ]
        })}
      />
      <main className="shop-page">
        <section className="shop-intro">
          <p className="shop-eyebrow">PRINTFLOW STUDIO DESIGN SHOP</p>
          <h1>Pick a design. Make it yours.</h1>
          <p className="shop-reassurance" style={{ marginTop: '5px', marginBottom: '15px' }}><strong>Original designs • Quality DTF printing • Chattanooga pickup • Nationwide shipping</strong></p>
          <p>Shop a standard tee online, or request another garment, size, color, or ready-to-press DTF transfer.</p>
          <p className="shop-custom-path" style={{ marginTop: '10px' }}>Don't see exactly what you want? <Link to="/request-quote" style={{ textDecoration: 'underline', color: 'var(--accent-color, #D000E8)', fontWeight: 'bold' }}>Request a custom design or custom shirt.</Link></p>
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
