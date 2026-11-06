import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SHOP_COLLECTIONS, SHOP_PRODUCTS } from '../data/shopProducts';
import { EXTERNAL_LINKS } from '../data/businessSettings';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import CheckoutResult from '../components/CheckoutResult';
import './shop.css';

type SortOption = 'featured' | 'name-asc' | 'name-desc';

export default function ShopCatalog() {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlQuery = searchParams.get('q') || '';
    const urlCollection = searchParams.get('collection') || 'All';

    const [collection, setCollection] = useState(() =>
        SHOP_COLLECTIONS.some((c) => c.id === urlCollection) ? urlCollection : 'All'
    );
    const [query, setQuery] = useState(urlQuery);
    const [sortBy, setSortBy] = useState<SortOption>('featured');

    useEffect(() => {
        setQuery(urlQuery);
    }, [urlQuery]);

    const activeCollectionMeta =
        SHOP_COLLECTIONS.find((c) => c.id === collection) || SHOP_COLLECTIONS[0];

    const products = useMemo(() => {
        let filtered = [...SHOP_PRODUCTS];
        if (collection === 'Featured') {
            filtered = filtered.filter((p) => p.featured);
        } else if (collection !== 'All') {
            filtered = filtered.filter((p) => p.category === collection);
        }

        const trimmed = query.trim().toLowerCase();
        if (trimmed) {
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(trimmed) ||
                    p.category.toLowerCase().includes(trimmed) ||
                    p.description.toLowerCase().includes(trimmed) ||
                    p.garmentLabel.toLowerCase().includes(trimmed)
            );
        }

        if (sortBy === 'name-asc') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'name-desc') {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        } else {
            filtered.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
        }

        return filtered;
    }, [collection, query, sortBy]);

    const handleResetFilters = () => {
        setCollection('All');
        setQuery('');
        setSortBy('featured');
        if (searchParams.has('q') || searchParams.has('collection')) {
            const next = new URLSearchParams(searchParams);
            next.delete('q');
            next.delete('collection');
            setSearchParams(next, { replace: true });
        }
    };

    return (
        <Layout>
            <SEO
                title="Shop Original Graphic T-Shirts | PrintFlow Studio Chattanooga"
                description="Shop ready-to-order PrintFlow Studio seasonal graphic tees and original designs. Made to order with Chattanooga pickup by arrangement or nationwide shipping."
                canonicalUrl="https://www.printflowstudio.com/shop"
            />

            <div className="pf-shop-page">
                <header className="pf-shop-header">
                    <div className="pf-container">
                        <p className="pf-eyebrow">PRINTFLOW STUDIO APPAREL CATALOG</p>
                        <h1 className="pf-page-title">SHOP PRINTFLOW APPAREL.</h1>
                        <p className="pf-copy pf-shop-header__copy">
                            Original PrintFlow Studio artwork pressed to order on comfortable unisex
                            tees. Looking to print your own brand, group, or event artwork? Explore{' '}
                            <Link to="/custom-t-shirts-chattanooga" className="pf-inline-link">
                                custom t-shirt printing
                            </Link>
                            .
                        </p>

                        <ul className="pf-shop-meta-strip" role="list" aria-label="Catalog highlights">
                            <li>Original Artwork</li>
                            <li>Full-Color DTF Print</li>
                            <li>Chattanooga Pickup by Arrangement</li>
                            <li>Nationwide U.S. Shipping</li>
                        </ul>

                        {EXTERNAL_LINKS.etsyShopUrl && (
                            <p className="pf-shop-etsy-note">
                                Also listed on Etsy:{' '}
                                <a
                                    href={EXTERNAL_LINKS.etsyShopUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pf-inline-link"
                                >
                                    Visit the PrintFlow Studio Etsy Shop →
                                </a>
                            </p>
                        )}
                    </div>
                </header>

                <div className="pf-container pf-shop-body">
                    {searchParams.get('paid') === '1' && <CheckoutResult key={searchParams.get('session_id') || 'missing'} sessionId={searchParams.get('session_id')} />}

                    {searchParams.get('checkout') === 'cancelled' && (
                        <div className="pf-status-banner pf-status-banner--notice" role="status">
                            Checkout was cancelled. Your selected design remains available whenever
                            you are ready.
                        </div>
                    )}

                    <div className="pf-shop-toolbar" role="region" aria-label="Filter and sort apparel">
                        <div className="pf-shop-tabs" role="group" aria-label="Collections">
                            {SHOP_COLLECTIONS.map((item) => {
                                const active = collection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={`pf-shop-tab ${active ? 'is-active' : ''}`}
                                        aria-pressed={active}
                                        onClick={() => setCollection(item.id)}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="pf-shop-controls">
                            <div className="pf-shop-search">
                                <label htmlFor="shop-design-search" className="visually-hidden">
                                    Search apparel designs
                                </label>
                                <input
                                    id="shop-design-search"
                                    type="search"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search designs..."
                                    className="pf-input pf-shop-search__input"
                                />
                            </div>

                            <div className="pf-shop-sort">
                                <label htmlFor="shop-sort-select" className="visually-hidden">
                                    Sort apparel
                                </label>
                                <select
                                    id="shop-sort-select"
                                    value={sortBy}
                                    onChange={(event) => setSortBy(event.target.value as SortOption)}
                                    className="pf-select pf-shop-sort__select"
                                >
                                    <option value="featured">Sort: Featured</option>
                                    <option value="name-asc">Sort: Title A–Z</option>
                                    <option value="name-desc">Sort: Title Z–A</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="pf-shop-summary-row">
                        <p className="pf-shop-collection-summary">
                            {activeCollectionMeta.description}
                        </p>
                        <span className="pf-shop-count">
                            {products.length} {products.length === 1 ? 'PIECE' : 'PIECES'}
                        </span>
                    </div>

                    {products.length === 0 ? (
                        <div className="pf-shop-empty" role="status">
                            <h2>NO MATCHING APPAREL FOUND.</h2>
                            <p>
                                Clear your search filter or switch back to all PrintFlow Studio
                                designs.
                            </p>
                            <button
                                type="button"
                                className="pf-button pf-button--primary"
                                onClick={handleResetFilters}
                            >
                                SHOW ALL APPAREL
                            </button>
                        </div>
                    ) : (
                        <section aria-label="Apparel catalog" aria-live="polite">
                            <div className="pf-product-grid">
                                {products.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        headingLevel="h2"
                                        priority={index === 0}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    <section
                        className="pf-shop-guides"
                        aria-labelledby="shop-helpful-guides-heading"
                    >
                        <div className="pf-shop-guides__head">
                            <p className="pf-eyebrow">SIZING, CARE &amp; TRANSFERS</p>
                            <h2 id="shop-helpful-guides-heading" className="pf-shop-subhead">
                                APPAREL RESOURCES.
                            </h2>
                        </div>

                        <div className="pf-shop-guides__grid">
                            <Link
                                to="/blog/choosing-the-right-shirt-print-size"
                                className="pf-shop-guide-card"
                            >
                                <h3>Choosing a Print Size &amp; Fit</h3>
                                <p>
                                    See how standard front graphics scale across unisex shirt sizes
                                    and placements.
                                </p>
                                <span className="pf-shop-guide-card__cta">Read Guide →</span>
                            </Link>

                            <Link
                                to="/blog/caring-for-dtf-printed-apparel"
                                className="pf-shop-guide-card"
                            >
                                <h3>Caring for DTF-Printed Apparel</h3>
                                <p>
                                    Simple washing and drying habits that keep full-color prints
                                    vibrant and soft.
                                </p>
                                <span className="pf-shop-guide-card__cta">Read Guide →</span>
                            </Link>

                            <Link to="/dtf-transfers" className="pf-shop-guide-card">
                                <h3>Need Ready-to-Press Transfers Only?</h3>
                                <p>
                                    Have your own commercial heat press? Browse ready-to-press DTF
                                    transfers without blanks.
                                </p>
                                <span className="pf-shop-guide-card__cta">Shop Transfers →</span>
                            </Link>
                        </div>
                    </section>

                    <section className="pf-shop-custom-banner" aria-labelledby="shop-custom-heading">
                        <div>
                            <p className="pf-eyebrow">CUSTOM PRINTING</p>
                            <h2 id="shop-custom-heading" className="pf-shop-subhead">
                                HAVE YOUR OWN ARTWORK OR GROUP ORDER?
                            </h2>
                            <p className="pf-copy">
                                Print your brand mark, church theme, or reunion design on tees,
                                long-sleeves, or hoodies—from a single piece to full group runs.
                            </p>
                        </div>

                        <div className="pf-shop-custom-banner__actions">
                            <Link to="/request-quote" className="pf-button pf-button--primary">
                                START A CUSTOM ORDER
                            </Link>
                            <Link
                                to="/blog/how-custom-shirt-orders-work"
                                className="pf-button pf-button--secondary"
                            >
                                HOW CUSTOM ORDERS WORK
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}
