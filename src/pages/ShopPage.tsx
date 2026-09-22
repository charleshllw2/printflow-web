import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SHOP_PRODUCTS } from "../data/shopProducts";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import "./shop.css";

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  mockup: string;
  artwork: string;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="shop-card">
      <div className="shop-image-wrap">
        <Link to={`/shop/${product.slug}`} tabIndex={-1}>
          <img
            src={product.mockup}
            alt={`${product.name} shirt mockup`}
            loading="lazy"
          />
        </Link>
      </div>

      <div className="shop-card-body">
        <span className="shop-id">{product.category}</span>
        <h2><Link to={`/shop/${product.slug}`}>{product.name}</Link></h2>
        <p className="shop-price"><strong>${product.price.toFixed(2)}</strong></p>

        <Link className="shop-buy" to={`/shop/${product.slug}`} style={{ textDecoration: 'none' }}>
          View Design
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
          {products.map((product) => <ProductCard key={product.id} product={product as Product} />)}
        </section>

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
