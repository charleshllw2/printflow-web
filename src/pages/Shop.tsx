import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { products, getActiveCategories, defaultDescription, defaultPressingInstructions } from '../data/products';
import type { Product } from '../data/products';
import CustomUploadModal from '../components/CustomUploadModal';
import '../styles/Shop.css';

export default function Shop() {
    
    // Filtering and Sorting State
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All Designs');
    const [sortOption, setSortOption] = useState('newest');

    // Quick View Modal State
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedSizeId, setSelectedSizeId] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [acknowledgmentChecked, setAcknowledgmentChecked] = useState(false);

    // Filtered and Sorted Products
    const filteredProducts = useMemo(() => {
        let result = products;

        if (activeCategory !== 'All Designs') {
            result = result.filter(p => p.category === activeCategory);
        }

        if (searchQuery.trim() !== '') {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(p => p.title.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery));
        }

        result = [...result].sort((a, b) => {
            if (sortOption === 'price-asc') {
                return a.sizes[0].price - b.sizes[0].price;
            } else if (sortOption === 'price-desc') {
                return b.sizes[0].price - a.sizes[0].price;
            } else {
                // Newest sorting (placeholder logic relying on isNew)
                if (a.isNew && !b.isNew) return -1;
                if (!a.isNew && b.isNew) return 1;
                return 0;
            }
        });

        return result;
    }, [activeCategory, searchQuery, sortOption]);

    const categories = ['All Designs', ...getActiveCategories()];

    // Quick View Actions
    const openQuickView = (product: Product) => {
        setSelectedProduct(product);
        setSelectedSizeId(product.sizes[0].id);
        setQuantity(1);
        setAcknowledgmentChecked(false);
    };

    const closeQuickView = () => {
        setSelectedProduct(null);
    };

    const handleAddToCart = () => {
        if (!acknowledgmentChecked) {
            alert('Please check the box confirming you understand no garment is included.');
            return;
        }
        
        // Simulating Add to Cart / Checkout connection issue
        alert('Item added to cart! (Checkout integration coming soon)');
        closeQuickView();
    };

    // Derived states for active modal product
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
                    {filteredProducts.length === 0 ? (
                        <div className="text-center" style={{padding: '3rem 0', color: '#666'}}>
                            <h3>No designs found.</h3>
                            <p>Try adjusting your search or category filter.</p>
                            <button className="btn btn-outline" style={{marginTop: '1rem'}} onClick={() => { setSearchQuery(''); setActiveCategory('All Designs'); }}>Clear Filters</button>
                        </div>
                    ) : (
                        <div className="product-grid">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="product-card" onClick={() => openQuickView(product)}>
                                    <div className="product-image-container">
                                        <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
                                        <div className="transfer-label">Transfer Only</div>
                                        <div className="product-badges">
                                            {product.isNew && <span className="badge new">New</span>}
                                            {product.isBestSeller && <span className="badge best-seller">Best Seller</span>}
                                        </div>
                                        <div className="quick-view-overlay">
                                            <span className="btn btn-primary">Quick View</span>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <span className="product-category">{product.category}</span>
                                        <h3 className="product-title">{product.title}</h3>
                                        <div className="product-price">Starting at ${product.sizes[0].price.toFixed(2)}</div>
                                        <div className="product-sizes-preview">
                                            Available in {product.sizes.length} sizes
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

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

            {/* QUICK VIEW MODAL */}
            {selectedProduct && activeSize && (
                <div className="modal-overlay" onClick={closeQuickView}>
                    {selectedProduct.category === 'Custom' ? (
                        <CustomUploadModal 
                            product={selectedProduct} 
                            activeSize={activeSize} 
                            selectedSizeId={selectedSizeId} 
                            setSelectedSizeId={setSelectedSizeId} 
                            closeModal={closeQuickView} 
                        />
                    ) : (
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <button className="modal-close" onClick={closeQuickView} aria-label="Close modal">×</button>
                            
                            <div className="modal-grid">
                                <div className="modal-image-col">
                                    <img src={selectedProduct.image} alt={selectedProduct.title} className="modal-image" />
                                </div>
                                <div className="modal-info-col">
                                    <div className="modal-category">{selectedProduct.category}</div>
                                    <h2>{selectedProduct.title}</h2>
                                    <div className="modal-price">${activeSize.price.toFixed(2)}</div>
                                    
                                    <p className="modal-desc">{selectedProduct.description || defaultDescription}</p>
                                    
                                    <div className="modal-form">
                                        <div className="form-group">
                                            <label htmlFor="size-select">Select Size</label>
                                            <select 
                                                id="size-select" 
                                                value={selectedSizeId} 
                                                onChange={(e) => setSelectedSizeId(e.target.value)}
                                            >
                                                {selectedProduct.sizes.map(size => (
                                                    <option key={size.id} value={size.id}>
                                                        {size.label} - ${size.price.toFixed(2)}
                                                    </option>
                                                ))}
                                            </select>
                                            <p className="size-hint">Exact Dimensions: {activeSize.dimensions}</p>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="qty">Quantity</label>
                                            <input 
                                                type="number" 
                                                id="qty" 
                                                min="1" 
                                                max={activeSize.inventory} 
                                                value={quantity} 
                                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                            />
                                        </div>

                                        <div className="checkout-notices">
                                            <div className="transfer-only-notice">
                                                <strong>TRANSFER ONLY</strong> — This purchase does not include a shirt or garment.
                                            </div>
                                            <label className="acknowledgment-checkbox">
                                            <input 
                                                type="checkbox" 
                                                checked={acknowledgmentChecked}
                                                onChange={(e) => setAcknowledgmentChecked(e.target.checked)}
                                            />
                                            I understand that I am purchasing a DTF transfer only and that no garment is included.
                                        </label>
                                        <p style={{fontSize: '0.75rem', marginTop: '0.5rem', color: '#666'}}>
                                            Colors may vary slightly between screens. Customers are responsible for proper pressing. All sales final unless damaged/defective. Designs may not be reproduced.
                                        </p>
                                    </div>

                                    <div className="modal-actions" style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                        <button className="btn btn-primary" onClick={handleAddToCart}>
                                            Add to Cart — ${(activeSize.price * quantity).toFixed(2)}
                                        </button>
                                        <button className="btn btn-outline" disabled style={{opacity: 0.6}}>Buy Now</button>
                                    </div>
                                    <p className="text-center text-xs text-gray-400 mt-2" style={{textAlign: 'center', fontSize: '0.8rem', color: '#888', marginTop: '0.5rem'}}>
                                        Checkout integration coming soon.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            )}
        </Layout>
    );
}
