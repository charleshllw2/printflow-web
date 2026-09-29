import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { defaultPressingInstructions } from '../data/products';
import { commerce, imageUrl, formatMoney } from '../lib/commerce';
import type { Catalog, Product as ShopifyProduct } from '../lib/commerce';
import { ShopState, ShopImage } from '../components/ShopUI';
import type { Product } from '../data/products';
import CustomUploadModal from '../components/CustomUploadModal';
import '../styles/Shop.css';

export default function Shop() {

    // Filtering and Sorting State
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All Designs');
    const [sortOption, setSortOption] = useState('newest');

    const navigate = useNavigate();
    const [catalog, setCatalog] = useState<Catalog>({ nodes: [], pageInfo: { hasNextPage: false, endCursor: null } });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [attempt, setAttempt] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedSizeId, setSelectedSizeId] = useState('');
    useEffect(() => {
        let active = true;
        commerce<Catalog>('resource=products&collection=transfers').then(data => { if (active) { setCatalog(data); setError(''); } }).catch(e => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [attempt]);
    async function loadMore() {
        setLoading(true);
        try { const data = await commerce<Catalog>(`resource=products&collection=transfers&after=${encodeURIComponent(catalog.pageInfo.endCursor || '')}`); setCatalog(previous => ({ ...data, nodes: [...previous.nodes, ...data.nodes.filter(p => !previous.nodes.some(old => old.id === p.id))] })); }
        catch (e) { setError(e instanceof Error ? e.message : 'Please try again.'); }
        finally { setLoading(false); }
    }
    // Filtered and Sorted Products
    const filteredProducts = useMemo(() => {
        let result = catalog.nodes;

        if (activeCategory !== 'All Designs') {
            result = result.filter(p => p.productType === activeCategory);
        }

        if (searchQuery.trim() !== '') {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(p => p.title.toLowerCase().includes(lowerQuery) || p.productType.toLowerCase().includes(lowerQuery));
        }

        result = [...result].sort((a, b) => {
            if (sortOption === 'price-asc') {
                return Number(a.priceRange.minVariantPrice.amount) - Number(b.priceRange.minVariantPrice.amount);
            } else if (sortOption === 'price-desc') {
                return Number(b.priceRange.minVariantPrice.amount) - Number(a.priceRange.minVariantPrice.amount);
            } else {
                // Keep the order provided by the Shopify collection.

                return 0;
            }
        });

        return result;
    }, [activeCategory, searchQuery, sortOption, catalog.nodes]);

    const categories = ['All Designs', ...new Set(catalog.nodes.map(p => p.productType).filter(Boolean))];

    async function openQuickView(product: ShopifyProduct) {
        if (product.productType !== 'Custom') { navigate(`/shop/${product.handle}`); return; }
        try {
            const full = await commerce<ShopifyProduct>(`resource=product&handle=${encodeURIComponent(product.handle)}`);
            const sizes = full.variants.nodes.filter(v => v.availableForSale).map(v => ({ id: v.id, label: v.title, dimensions: v.selectedOptions.map(o => o.value).join(' · '), price: Number(v.price.amount) }));
            if (!sizes.length) { setError('This product is currently unavailable.'); return; }
            setSelectedProduct({ id: full.id, title: full.title, image: full.featuredImage ? imageUrl(full.featuredImage, 640) : '', category: full.productType, sizes });
            setSelectedSizeId(sizes[0].id);
        } catch (e) { setError(e instanceof Error ? e.message : 'Please try again.'); }
    }
    const closeQuickView = () => setSelectedProduct(null);
    const activeSize = selectedProduct?.sizes.find(s => s.id === selectedSizeId);

    return (
        <Layout>
            <SEO
                title="Ready-to-Press DTF Transfers | PrintFlow Studio Chattanooga"
                description="Shop ready-to-press DTF transfers from PrintFlow Studio in Chattanooga. Choose premade designs in multiple sizes or request custom transfers and gang sheets."
            />

            {/* HERO SECTION */}
            <section className="shop-hero">
                <div className="container text-center">
                    <h1 style={{fontSize: '3rem', marginBottom: '1rem'}}>Ready-to-Press DTF Transfers</h1>
                    <p style={{fontSize: '1.2rem', color: '#ccc', maxWidth: '800px', margin: '0 auto 2rem'}}>
                        Shop vibrant, professionally printed DTF transfers designed for shirts, hoodies, tote bags and more. Choose your design, select your size and press it onto your garment.
                    </p>
                    <div className="shop-hero-actions" style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap'}}>
                        <a href="#product-grid" className="btn btn-primary">Shop Transfers</a>
                        <Link to="/request-quote?service=custom-t-shirts" className="btn btn-outline" style={{borderColor: 'white', color: 'white'}}>Need a Finished Shirt?</Link>
                    </div>
                    <div style={{display: 'inline-block', background: 'rgba(208, 0, 232, 0.1)', border: '1px solid #D000E8', borderRadius: '2rem', padding: '0.5rem 1rem', fontSize: '0.9rem', color: '#f3e8ff'}}>
                        ⚠️ Heat press required for the most reliable results. Household irons are not recommended.
                    </div>
                </div>
            </section>

            {/* FILTER & SORTING */}
            <section className="shop-filters" style={{background: '#f9fafb', borderBottom: '1px solid #eaeaea', padding: '2rem 0'}}>
                <div className="container">
                    <div className="filter-bar" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>

                        <div className="category-filters">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="search-sort">
                            <input
                                type="text"
                                placeholder="Search transfer designs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="search-input"
                                aria-label="Search transfer designs"
                            />
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="sort-select"
                                aria-label="Sort products"
                            >
                                <option value="newest">Newest</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>

                    </div>
                </div>
            </section>

            {/* PRODUCT GRID */}
            <section id="product-grid" className="section">
                <div className="container">
                    {loading && <ShopState loading />}
                    {error && <ShopState error={error} retry={() => setAttempt(attempt + 1)} />}
                    {filteredProducts.length === 0 && !loading && !error ? (
                        <div className="text-center" style={{padding: '3rem 0', color: '#666'}}>
                            <h3>No designs found.</h3>
                            <p>Try adjusting your search or category filter.</p>
                            <button className="btn btn-outline" style={{marginTop: '1rem'}} onClick={() => { setSearchQuery(''); setActiveCategory('All Designs'); }}>Clear Filters</button>
                        </div>
                    ) : (
                        <div className="product-grid">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="product-card">
                                    <div className="product-image-container">
                                        <ShopImage image={product.featuredImage} title={product.title} />
                                        <div className="transfer-label">Transfer Only</div>
                                        <div className="product-badges">
                                            {!product.availableForSale && <span className="badge new">Sold Out</span>}

                                        </div>
                                        <div className="quick-view-overlay">
                                            <button className="btn btn-primary" onClick={() => openQuickView(product)}>View options</button>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <span className="product-category">{product.productType}</span>
                                        <h3 className="product-title"><Link to={`/shop/${product.handle}`}>{product.title}</Link></h3>
                                        <div className="product-price">Starting at {formatMoney(product.priceRange.minVariantPrice)}</div>
                                        <div className="product-sizes-preview">
                                            {product.options.filter(o => o.name !== 'Title').map(o => `${o.values.length} ${o.name.toLowerCase()} options`).join(' · ')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {catalog.pageInfo.hasNextPage && <div className="container"><button className="btn btn-outline" disabled={loading} onClick={loadMore}>Load more transfers</button></div>}
            {/* MULTI-BUY PROMO */}
            <section className="multi-buy-promo section text-center" style={{background: 'var(--accent-primary, #D000E8)', color: 'white'}}>
                <div className="container">
                    <h2 style={{color: 'white', marginBottom: '1rem'}}>Press More. Save More.</h2>
                    <p style={{fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 2rem'}}>
                        Stock up on your favorite designs for personal projects, small businesses, teams and special events.
                    </p>
                    <div className="promo-box" style={{display: 'inline-block', background: 'white', color: '#111', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'}}>
                        <div style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--accent-primary, #D000E8)', marginBottom: '0.5rem'}}>3 Transfers for $27.99</div>
                        <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem'}}>Mix and match eligible Adult Standard designs.</p>
                        <button className="btn btn-outline" disabled style={{opacity: 0.6, cursor: 'not-allowed'}}>Bundle Feature Coming Soon</button>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="shop-how-it-works section" style={{background: '#f9fafb'}}>
                <div className="container">
                    <div className="section-header text-center">
                        <h2>How It Works</h2>
                    </div>
                    <div className="steps-grid">
                        <div className="step-item">
                            <div className="step-number">1</div>
                            <h3>Choose Your Design</h3>
                            <p>Select a ready-to-press design from the collection.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">2</div>
                            <h3>Select Your Size</h3>
                            <p>Choose the size that works best for your garment.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">3</div>
                            <h3>Place Your Order</h3>
                            <p>Your transfer will be professionally prepared and shipped to you.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">4</div>
                            <h3>Press and Wear</h3>
                            <p>Apply it using the included heat-press instructions.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRESSING & CARE INSTRUCTIONS */}
            <section className="shop-instructions section" style={{borderTop: '1px solid #eaeaea'}}>
                <div className="container">
                    <div className="grid-2-col" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem'}}>
                        <div>
                            <h2 style={{borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', marginBottom: '1.5rem'}}>Pressing Instructions</h2>
                            <ol className="instruction-list">
                                {defaultPressingInstructions.map((instruction, idx) => (
                                    <li key={idx}>{instruction}</li>
                                ))}
                            </ol>
                            <p style={{fontSize: '0.85rem', color: '#666', marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.25rem'}}>
                                <em>Disclaimer: Time, temperature, pressure and peeling method may vary by garment and transfer material. Test before completing large orders.</em>
                            </p>
                        </div>
                        <div>
                            <h2 style={{borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', marginBottom: '1.5rem'}}>Care Instructions</h2>
                            <ul className="care-list">
                                <li>Wait at least 24 hours before washing.</li>
                                <li>Wash inside out in cold water.</li>
                                <li>Use mild detergent.</li>
                                <li>Do not use bleach or fabric softener.</li>
                                <li>Tumble dry on low or hang dry.</li>
                                <li>Do not iron directly over the design.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="shop-faq section" style={{background: 'white'}}>
                <div className="container" style={{maxWidth: '900px'}}>
                    <div className="section-header text-center">
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    <div className="faq-grid">
                        <div className="faq-item">
                            <h4>What is a DTF transfer?</h4>
                            <p>Direct-to-Film (DTF) transfers are high-quality, full-color designs printed onto a clear film, ready to be heat-pressed onto almost any fabric.</p>
                        </div>
                        <div className="faq-item">
                            <h4>Does this purchase include a shirt?</h4>
                            <p>No, this purchase is for the ready-to-press transfer only. Garments are not included.</p>
                        </div>
                        <div className="faq-item">
                            <h4>Can I use a household iron?</h4>
                            <p>We highly recommend using a commercial heat press for even pressure and accurate temperature. Household irons may result in peeling and are not recommended.</p>
                        </div>
                        <div className="faq-item">
                            <h4>What materials can the transfers be applied to?</h4>
                            <p>Our DTF transfers work beautifully on 100% cotton, 100% polyester, cotton/poly blends, triblends, and more.</p>
                        </div>
                        <div className="faq-item">
                            <h4>Which size should I order?</h4>
                            <p>It depends on your garment! Pocket (4") is great for left-chest. Youth (8") fits smaller shirts, and Adult Standard (10-11") is perfect for most adult apparel.</p>
                        </div>
                        <div className="faq-item">
                            <h4>Do you offer custom transfers?</h4>
                            <p>Yes! We can print your custom logos and gang sheets. Use the custom order form below.</p>
                        </div>
                        <div className="faq-item">
                            <h4>Can I order transfers in bulk?</h4>
                            <p>Absolutely. Contact us for bulk pricing and gang sheet printing for large orders.</p>
                        </div>
                        <div className="faq-item">
                            <h4>What happens if my order arrives damaged?</h4>
                            <p>If your transfer arrives damaged or defective, please contact us immediately for a replacement. Because items are made to order, all other sales are final.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CUSTOM ORDER CTA */}
            <section className="custom-order-cta section text-center" style={{background: 'var(--bg-primary, #050505)', color: 'white'}}>
                <div className="container">
                    <h2 style={{color: 'white', marginBottom: '1rem'}}>Need Your Own Design Printed?</h2>
                    <p style={{fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 2rem', color: '#ccc'}}>
                        Upload your artwork or contact PrintFlow Studio for custom DTF transfers, business orders and gang sheets.
                    </p>
                    <Link to="/request-quote?service=dtf-transfers" className="btn btn-primary" style={{padding: '1rem 2rem', fontSize: '1.1rem'}}>Order Custom Transfers</Link>
                </div>
            </section>

            {selectedProduct && activeSize && <div className="modal-overlay" onClick={closeQuickView}><CustomUploadModal product={selectedProduct} activeSize={activeSize} selectedSizeId={selectedSizeId} setSelectedSizeId={setSelectedSizeId} closeModal={closeQuickView} /></div>}
        </Layout>
    );
}
