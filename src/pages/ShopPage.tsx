import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SHOP_PRODUCTS } from "../data/shopProducts";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import "./shop.css";

function ProductCard({ product }: { product: any }) {
  const [view, setView] = useState("mockup");

  return (
    <article className="shop-card">
      <div className="shop-image-wrap">
        <Link to={`/shop/${product.slug}`} tabIndex={-1}>
          <img
            src={view === "mockup" ? product.mockup : product.artwork}
            alt={view === "mockup" ? `${product.name} shirt mockup` : `${product.name} artwork`}
            loading="lazy"
          />
        </Link>
        <div className="shop-image-tabs" aria-label="Choose product image">
          <button className={view === "mockup" ? "active" : ""} onClick={() => setView("mockup")}>Mockup</button>
          <button className={view === "artwork" ? "active" : ""} onClick={() => setView("artwork")}>Design</button>
        </div>
      </div>

      <div className="shop-card-body">
        <span className="shop-id">{product.category}</span>
        <h2><Link to={`/shop/${product.slug}`}>{product.name}</Link></h2>
        <p className="shop-price">Standard tee <strong>${product.price.toFixed(2)}</strong></p>

        <Link className="shop-buy" to={`/shop/${product.slug}`} style={{ textDecoration: 'none' }}>
          View Product
        </Link>
      </div>
    </article>
  );
}

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
        title="Shop Custom Graphic T-Shirts | PrintFlow Studio Chattanooga"
        description="Shop original PrintFlow Studio apparel and designs. Find a design you love, choose your shirt and make it yours."
        canonicalUrl="https://www.printflowstudio.com/shop"
      />
      <main className="shop-page">
        <section className="shop-intro">
          <p className="shop-eyebrow">PRINTFLOW STUDIO DESIGN SHOP</p>
          <h1>Shop PrintFlow Designs</h1>
          <p className="shop-reassurance" style={{ marginTop: '5px', marginBottom: '15px' }}><strong>Find a design you love, choose your shirt and make it yours.</strong></p>
        </section>

        {searchParams.get("paid") === "1" && (
          <div className="shop-success" role="status">
            Thank you! Your payment was received. PrintFlow Studio will contact you with production details.
          </div>
        )}
        {searchParams.get("checkout") === "cancelled" && (
          <div className="shop-error" role="status" style={{ marginBottom: '20px' }}>
            Checkout was cancelled.
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

        <section className="shop-custom-cta" style={{ textAlign: 'center', marginTop: '60px', padding: '40px 20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
          <h2>HAVE YOUR OWN IDEA?</h2>
          <p style={{ margin: '15px 0 25px', color: 'var(--text-secondary)' }}>PrintFlow Studio can help bring your custom design to life.</p>
          <Link to="/request-quote" className="btn btn-outline" style={{ display: 'inline-block', padding: '12px 30px', fontWeight: 'bold' }}>
            START A CUSTOM SHIRT
          </Link>
        </section>
      </main>
    </Layout>
  );
}
