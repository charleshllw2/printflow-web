import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../lib/commerce";
import type { Product, Catalog } from "../lib/commerce";
import { ShopImage, Price, ShopState } from "../components/ShopUI";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import "./shop.css";

interface ProductCardProps { product: Product; }

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="shop-card">
      <div className="shop-image-wrap">
        <Link to={`/shop/${product.handle}`} tabIndex={-1}>
          <ShopImage image={product.featuredImage} title={product.title} />
        </Link>
      </div>

      <div className="shop-card-body">
        <span className="shop-id">{product.productType}</span>
        <h2><Link to={`/shop/${product.handle}`}>{product.title}</Link></h2>
        {product.priceRange.minVariantPrice.amount !== product.priceRange.maxVariantPrice.amount && <small>From</small>}
        <Price price={product.priceRange.minVariantPrice} compare={product.compareAtPriceRange.minVariantPrice} />
        <p>{product.availableForSale ? product.options.filter(o => o.name !== "Title").map(o => `${o.values.length} ${o.name.toLowerCase()} options`).join(" · ") : "Sold Out"}</p>

        <Link className="shop-buy" to={`/shop/${product.handle}`} style={{ textDecoration: 'none' }}>
          View Design
        </Link>
      </div>
    </article>
  );
}

export default function Shop() {
  const [catalog, setCatalog] = useState<Catalog>({ nodes: [], pageInfo: { hasNextPage: false, endCursor: null } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    commerce<Catalog>('resource=products').then(data => { if (active) { setCatalog(data); setError(""); } }).catch(e => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [attempt]);
  async function loadMore() {
    setLoading(true); setError("");
    try { const next = await commerce<Catalog>(`resource=products&after=${encodeURIComponent(catalog.pageInfo.endCursor || '')}`); setCatalog(previous => ({ ...next, nodes: [...previous.nodes, ...next.nodes.filter(p => !previous.nodes.some(old => old.id === p.id))] })); }
    catch (e) { setError(e instanceof Error ? e.message : 'Please try again.'); }
    finally { setLoading(false); }
  }
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(catalog.nodes.map((product) => product.productType).filter(Boolean))];
  const products = useMemo(
    () => category === "All" ? catalog.nodes : catalog.nodes.filter((product) => product.productType === category),
    [category, catalog.nodes]
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
            }
          ]
        })}
      />
      <main className="shop-page">
        <section className="shop-intro">
          <p className="shop-eyebrow">PRINTFLOW STUDIO DESIGN SHOP</p>
          <h1>Shop PrintFlow Studio</h1>
          <p className="shop-reassurance" style={{ marginTop: '5px', marginBottom: '15px' }}><strong>Original Designs • Quality DTF Printing • Chattanooga Pickup • Nationwide Shipping</strong></p>
          <p>Original designs. Quality apparel. Made by PrintFlow Studio.</p>
          <button className="btn btn-primary" onClick={() => window.scrollTo({ top: (document.querySelector('.shop-filters')?.getBoundingClientRect().top || 0) + window.scrollY - 100, behavior: 'smooth'})} style={{ marginTop: '20px' }}>Shop Designs</button>
        </section>

        <nav className="shop-filters" aria-label="Design categories">
          {categories.map((value) => (
            <button key={value} className={category === value ? "active" : ""} onClick={() => setCategory(value)}>
              {value}
            </button>
          ))}
        </nav>

        {error && <ShopState error={error} retry={() => { setLoading(true); setAttempt(attempt + 1); }} />}
        {loading && <ShopState loading />}
        {!loading && !error && !products.length && <ShopState />}
        <section className="shop-grid" aria-live="polite">
          {products.map((product) => <ProductCard key={product.id} product={product as Product} />)}
        </section>

        {catalog.pageInfo.hasNextPage && <button className="btn btn-outline" disabled={loading} onClick={loadMore}>Load more designs</button>}

        <section className="shop-custom-cta" style={{ textAlign: 'center', marginTop: '60px', padding: '40px 20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
          <h2>Don't See What You're Looking For?</h2>
          <p style={{ margin: '15px 0 25px', color: 'var(--text-secondary)' }}>Have an idea of your own? PrintFlow Studio can help bring it to life.</p>
          <Link to="/request-quote" className="btn btn-outline" style={{ display: 'inline-block', padding: '12px 30px', fontWeight: 'bold' }}>
            Request a Custom Design
          </Link>
        </section>
      </main>
    </Layout>
  );
}
