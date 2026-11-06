import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import {
    products,
    getActiveCategories,
    defaultDescription,
    defaultPressingInstructions,
} from '../data/products';
import type { Product } from '../data/products';
import { PRICING_OFFERS, CARE_INSTRUCTIONS } from '../data/businessSettings';
import CustomUploadModal from '../components/CustomUploadModal';
import '../styles/Shop.css';

export default function Shop() {
    const navigate = useNavigate();
    const quickViewDialogRef = useRef<HTMLDialogElement>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All Designs');
    const [sortOption, setSortOption] = useState('newest');

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedSizeId, setSelectedSizeId] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [acknowledgmentChecked, setAcknowledgmentChecked] = useState(false);
    const [modalValidationMsg, setModalValidationMsg] = useState('');

    useEffect(() => {
        const dialog = quickViewDialogRef.current;
        if (!dialog) return;

        if (selectedProduct && !dialog.open) {
            dialog.showModal();
            document.body.style.overflow = 'hidden';
        } else if (!selectedProduct && dialog.open) {
            dialog.close();
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedProduct]);

    const filteredProducts = useMemo(() => {
        let result = products;

        if (activeCategory !== 'All Designs') {
            result = result.filter((p) => p.category === activeCategory);
        }

        if (searchQuery.trim() !== '') {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(lowerQuery) ||
                    p.category.toLowerCase().includes(lowerQuery)
            );
        }

        result = [...result].sort((a, b) => {
            if (sortOption === 'price-asc') {
                return a.sizes[0].price - b.sizes[0].price;
            } else if (sortOption === 'price-desc') {
                return b.sizes[0].price - a.sizes[0].price;
            }
            return 0;
        });

        return result;
    }, [activeCategory, searchQuery, sortOption]);

    const categories = ['All Designs', ...getActiveCategories()];

    const openQuickView = (product: Product) => {
        setSelectedProduct(product);
        setSelectedSizeId(product.sizes[0].id);
        setQuantity(1);
        setAcknowledgmentChecked(false);
        setModalValidationMsg('');
    };

    const closeQuickView = () => {
        setSelectedProduct(null);
        setModalValidationMsg('');
    };

    const handleDialogBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) {
            closeQuickView();
        }
    };

    const activeSize = selectedProduct?.sizes.find((s) => s.id === selectedSizeId);

    const handleProceedOrder = () => {
        if (!selectedProduct || !activeSize) return;
        if (!acknowledgmentChecked) {
            setModalValidationMsg(
                'Please confirm that you understand this item is a ready-to-press DTF transfer only (no blank garment included).'
            );
            return;
        }
        setModalValidationMsg('');

        if (selectedProduct.checkoutUrl && selectedProduct.checkoutUrl.trim() !== '') {
            window.location.href = selectedProduct.checkoutUrl;
            return;
        }

        const params = new URLSearchParams({
            service: 'dtf-transfers',
            design: selectedProduct.id,
            designName: selectedProduct.title,
            size: `${activeSize.label} (${activeSize.dimensions})`,
            qty: String(quantity),
        });
        closeQuickView();
        navigate(`/request-quote?${params.toString()}`);
    };

    return (
        <Layout>
            <SEO
                title="Ready-to-Press DTF Transfers | PrintFlow Studio Chattanooga"
                description="Browse ready-to-press DTF transfers from PrintFlow Studio in Chattanooga. Choose premade full-color designs in 5 sizes or request custom transfers and gang sheets."
                canonicalUrl="https://www.printflowstudio.com/dtf-transfers"
            />

            <div className="pf-dtf-page">
                {/* Editorial Hero */}
                <header className="pf-dtf-hero">
                    <div className="pf-container">
                        <p className="pf-eyebrow">READY-TO-PRESS DIRECT-TO-FILM</p>
                        <h1 className="pf-page-title">DTF TRANSFERS.</h1>
                        <p className="pf-copy pf-dtf-hero__copy">
                            Full-color Direct-to-Film transfers cured on release film for cotton,
                            polyester, and blended tees, hoodies, and totes. Select a premade
                            PrintFlow Studio graphic in five widths or submit your own print-ready
                            artwork.
                        </p>

                        <div className="pf-dtf-hero__actions">
                            <a href="#product-grid" className="pf-button pf-button--primary">
                                BROWSE TRANSFERS
                            </a>
                            <Link
                                to="/request-quote?service=dtf-transfers"
                                className="pf-button pf-button--secondary"
                            >
                                UPLOAD CUSTOM TRANSFER ART
                            </Link>
                            <Link to="/shop" className="pf-button pf-button--dark">
                                SHOP PRINTED APPAREL
                            </Link>
                        </div>

                        <p className="pf-dtf-press-notice">
                            <strong>COMMERCIAL HEAT PRESS REQUIRED:</strong> Apply at 300–320°F
                            with medium-to-heavy pressure (cold peel). Household irons are not
                            recommended.
                        </p>
                    </div>
                </header>

                {/* Filter & Search Toolbar */}
                <section className="pf-dtf-toolbar-band">
                    <div className="pf-container">
                        <search
                            className="pf-dtf-toolbar"
                            aria-label="Filter and search ready-to-press DTF transfers"
                        >
                            <div
                                className="pf-dtf-categories"
                                role="group"
                                aria-label="Transfer categories"
                            >
                                {categories.map((cat) => {
                                    const active = activeCategory === cat;
                                    return (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setActiveCategory(cat)}
                                            aria-pressed={active}
                                            className={`pf-dtf-cat-btn ${
                                                active ? 'is-active' : ''
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="pf-dtf-controls">
                                <label htmlFor="dtf-search-input" className="visually-hidden">
                                    Search transfer designs
                                </label>
                                <input
                                    id="dtf-search-input"
                                    type="search"
                                    placeholder="Search transfer designs..."
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    className="pf-input pf-dtf-search"
                                />

                                <label htmlFor="dtf-sort-select" className="visually-hidden">
                                    Sort transfers
                                </label>
                                <select
                                    id="dtf-sort-select"
                                    value={sortOption}
                                    onChange={(event) => setSortOption(event.target.value)}
                                    className="pf-select pf-dtf-sort"
                                >
                                    <option value="newest">Sort: Catalog Order</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                            </div>
                        </search>
                    </div>
                </section>

                {/* Transfer Catalog Grid */}
                <section id="product-grid" className="pf-section">
                    <div className="pf-container">
                        {filteredProducts.length === 0 ? (
                            <div className="pf-dtf-empty" role="status">
                                <h2>NO TRANSFER DESIGNS MATCH THAT FILTER.</h2>
                                <p>Clear your search query or switch back to All Designs.</p>
                                <button
                                    type="button"
                                    className="pf-button pf-button--primary"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setActiveCategory('All Designs');
                                    }}
                                >
                                    SHOW ALL TRANSFERS
                                </button>
                            </div>
                        ) : (
                            <div className="pf-dtf-grid">
                                {filteredProducts.map((product) => (
                                    <article key={product.id} className="pf-dtf-card">
                                        <div className="pf-dtf-card__media">
                                            <img
                                                src={product.image}
                                                alt={product.alt}
                                                className="pf-dtf-card__img"
                                                loading="lazy"
                                                width={600}
                                                height={600}
                                            />
                                            <span className="pf-dtf-card__tag">TRANSFER ONLY</span>
                                        </div>

                                        <div className="pf-dtf-card__body">
                                            <span className="pf-dtf-card__category">
                                                {product.category}
                                            </span>
                                            <div className="pf-dtf-card__row">
                                                <h2 className="pf-dtf-card__title">
                                                    <button
                                                        type="button"
                                                        className="pf-dtf-card__trigger"
                                                        onClick={() => openQuickView(product)}
                                                    >
                                                        {product.title}
                                                    </button>
                                                </h2>
                                                <span className="pf-dtf-card__price">
                                                    From ${product.sizes[0].price.toFixed(2)}
                                                </span>
                                            </div>
                                            <p className="pf-dtf-card__widths">
                                                {product.sizes.length} widths (Pocket 4&quot; to
                                                Oversized 13–14&quot;)
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Existing Verified Transfer Bundle Band */}
                <section
                    className="pf-section pf-section--alt pf-section--bordered"
                    aria-labelledby="dtf-bundle-heading"
                >
                    <div className="pf-container pf-dtf-bundle">
                        <div>
                            <p className="pf-eyebrow">MULTI-TRANSFER PACK</p>
                            <h2 id="dtf-bundle-heading" className="pf-section-title">
                                {PRICING_OFFERS.transferBundleQty} ADULT STANDARD TRANSFERS FOR $
                                {PRICING_OFFERS.transferBundlePrice.toFixed(2)}.
                            </h2>
                            <p className="pf-copy pf-dtf-bundle__copy">
                                Mix and match any {PRICING_OFFERS.transferBundleQty} eligible Adult
                                Standard (10–11&quot;) premade designs for personal projects, craft
                                runs, or apparel testing. List your chosen titles in the order
                                request.
                            </p>
                        </div>

                        <div className="pf-dtf-bundle__cta">
                            <Link
                                to={`/request-quote?service=dtf-transfer-bundle&designName=${encodeURIComponent(
                                    `${PRICING_OFFERS.transferBundleQty} Adult Standard Transfer Bundle ($${PRICING_OFFERS.transferBundlePrice.toFixed(
                                        2
                                    )})`
                                )}`}
                                className="pf-button pf-button--primary"
                            >
                                REQUEST {PRICING_OFFERS.transferBundleQty}-TRANSFER BUNDLE
                            </Link>
                        </div>
                    </div>
                </section>

                {/* How Ordering Works */}
                <section
                    className="pf-section pf-section--bordered"
                    aria-labelledby="dtf-steps-heading"
                >
                    <div className="pf-container">
                        <p className="pf-eyebrow">ORDER FLOW</p>
                        <h2 id="dtf-steps-heading" className="pf-section-title">
                            HOW PREMADE TRANSFERS WORK.
                        </h2>

                        <div className="process-grid">
                            <div className="process-step">
                                <h3>01 / Choose Design</h3>
                                <p>
                                    Select any graphic from our Chattanooga, faith, humor, or
                                    seasonal ready-to-press transfer catalog.
                                </p>
                            </div>
                            <div className="process-step">
                                <h3>02 / Select Print Width</h3>
                                <p>
                                    Pick Pocket (4&quot;), Youth (8&quot;), Adult Standard
                                    (10–11&quot;), Adult Large (12&quot;), or Oversized
                                    (13–14&quot;).
                                </p>
                            </div>
                            <div className="process-step">
                                <h3>03 / Confirm Request</h3>
                                <p>
                                    Submit your selected widths and quantities—or combine multiple
                                    graphics onto a custom gang sheet.
                                </p>
                            </div>
                            <div className="process-step">
                                <h3>04 / Heat Press</h3>
                                <p>
                                    Arrange local Chattanooga pickup or receive flat-packed
                                    nationwide shipping ready for your press.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pressing & Care Instructions */}
                <section
                    className="pf-section pf-section--alt pf-section--bordered"
                    aria-labelledby="dtf-pressing-heading"
                >
                    <div className="pf-container pf-dtf-specs-grid">
                        <div className="pf-dtf-spec-panel">
                            <p className="pf-eyebrow">APPLICATION</p>
                            <h2 id="dtf-pressing-heading">PRESSING INSTRUCTIONS</h2>
                            <ol className="pf-dtf-ordered-list">
                                {defaultPressingInstructions.map((instruction, idx) => (
                                    <li key={idx}>{instruction}</li>
                                ))}
                            </ol>
                            <p className="pf-dtf-panel-note">
                                Exact temperature, pressure, and dwell time vary slightly by fabric
                                composition and platen. Test before pressing a full run.
                            </p>
                        </div>

                        <div className="pf-dtf-spec-panel">
                            <p className="pf-eyebrow">LONGEVITY</p>
                            <h2>GARMENT CARE &amp; GUIDES</h2>
                            <ul className="pf-dtf-bullet-list">
                                {CARE_INSTRUCTIONS.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>

                            <div className="pf-dtf-guide-links">
                                <h3>Related Technical Guides</h3>
                                <ul role="list">
                                    <li>
                                        <Link to="/blog/choosing-the-right-shirt-print-size">
                                            Choosing a Print Size: Pocket, Youth, Standard &amp;
                                            Oversized →
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/blog/how-to-prepare-artwork-for-dtf-printing">
                                            How to Prepare Artwork for DTF Printing →
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/blog/caring-for-dtf-printed-apparel">
                                            Caring for DTF-Printed Apparel →
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/file-guidelines">
                                            PrintFlow Studio Artwork &amp; File Guidelines →
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section
                    className="pf-section pf-section--bordered"
                    aria-labelledby="dtf-faq-heading"
                >
                    <div className="pf-container">
                        <p className="pf-eyebrow">QUESTIONS</p>
                        <h2 id="dtf-faq-heading" className="pf-section-title">
                            TRANSFER FAQS.
                        </h2>

                        <div className="faq-grid">
                            <div className="faq-item">
                                <h3>What is a DTF transfer?</h3>
                                <p>
                                    Direct-to-Film (DTF) transfers are full-color graphics printed
                                    onto specialized release film with heat-activated adhesive
                                    backing, ready to press onto cotton, polyester, or blends.
                                </p>
                            </div>
                            <div className="faq-item">
                                <h3>Does a transfer order include a blank shirt?</h3>
                                <p>
                                    No—items on this page are ready-to-press transfers only. For
                                    finished printed garments, visit{' '}
                                    <Link to="/shop" className="pf-inline-link">
                                        Shop Apparel
                                    </Link>{' '}
                                    or{' '}
                                    <Link
                                        to="/custom-t-shirts-chattanooga"
                                        className="pf-inline-link"
                                    >
                                        Custom T-Shirts
                                    </Link>
                                    .
                                </p>
                            </div>
                            <div className="faq-item">
                                <h3>Can I apply these with a household iron?</h3>
                                <p>
                                    A commercial heat press is strongly recommended for uniform
                                    temperature (300–320°F) and consistent platen pressure.
                                </p>
                            </div>
                            <div className="faq-item">
                                <h3>Which transfer width should I select?</h3>
                                <p>
                                    Pocket (~4&quot;) suits left-chest marks, Youth (~8&quot;) fits
                                    youth tees, Adult Standard (~10–11&quot;) fits adult S–XL tees,
                                    and 12&quot;–14&quot; suits 2XL+ tees and hoodies. See our{' '}
                                    <Link
                                        to="/blog/choosing-the-right-shirt-print-size"
                                        className="pf-inline-link"
                                    >
                                        Print Size Guide
                                    </Link>
                                    .
                                </p>
                            </div>
                            <div className="faq-item">
                                <h3>Can you print my own logo or gang sheet?</h3>
                                <p>
                                    Yes. Visit{' '}
                                    <Link
                                        to="/dtf-transfers-chattanooga"
                                        className="pf-inline-link"
                                    >
                                        Custom DTF Transfers
                                    </Link>{' '}
                                    or upload your file directly in our{' '}
                                    <Link
                                        to="/request-quote?service=dtf-transfers"
                                        className="pf-inline-link"
                                    >
                                        Custom Quote Form
                                    </Link>
                                    .
                                </p>
                            </div>
                            <div className="faq-item">
                                <h3>What is the return policy on transfers?</h3>
                                <p>
                                    Because transfers are printed to order, sales are final unless
                                    an item arrives damaged, defective, or has a printing error. See
                                    our{' '}
                                    <Link to="/returns" className="pf-inline-link">
                                        Return &amp; Refund Policy
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Custom Artwork CTA */}
                <section
                    className="pf-section pf-section--alt pf-section--bordered"
                    aria-labelledby="dtf-custom-cta-heading"
                >
                    <div className="pf-container pf-dtf-bottom-cta">
                        <p className="pf-eyebrow">CUSTOM FILM &amp; GANG SHEETS</p>
                        <h2 id="dtf-custom-cta-heading" className="pf-section-title">
                            HAVE YOUR OWN ARTWORK?
                        </h2>
                        <p className="pf-copy">
                            Send your transparent PNG or vector file for single-design transfers,
                            repeat logos, or multi-design gang sheets—available for Chattanooga
                            pickup by arrangement or nationwide shipping.
                        </p>
                        <div className="pf-dtf-bottom-cta__actions">
                            <Link
                                to="/request-quote?service=dtf-transfers"
                                className="pf-button pf-button--primary"
                            >
                                REQUEST CUSTOM DTF TRANSFERS
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Accessible Native Modal Dialog for Transfer Configuration */}
                <dialog
                    ref={quickViewDialogRef}
                    className="pf-dtf-dialog"
                    aria-label={
                        selectedProduct
                            ? `Configure ${selectedProduct.title}`
                            : 'Transfer configuration'
                    }
                    onClose={closeQuickView}
                    onClick={handleDialogBackdropClick}
                >
                    {selectedProduct && activeSize && (
                        <>
                            {selectedProduct.category === 'Custom' ? (
                                <CustomUploadModal
                                    product={selectedProduct}
                                    activeSize={activeSize}
                                    selectedSizeId={selectedSizeId}
                                    setSelectedSizeId={setSelectedSizeId}
                                    closeModal={closeQuickView}
                                />
                            ) : (
                                <div className="pf-dtf-modal">
                                    <div className="pf-dtf-modal__top">
                                        <span className="pf-eyebrow pf-dtf-modal__eyebrow">
                                            {selectedProduct.category} / READY-TO-PRESS FILM
                                        </span>
                                        <button
                                            type="button"
                                            className="pf-dialog-close"
                                            onClick={closeQuickView}
                                            aria-label="Close transfer details"
                                        >
                                            Close ✕
                                        </button>
                                    </div>

                                    <div className="pf-dtf-modal__grid">
                                        <div className="pf-dtf-modal__media">
                                            <img
                                                src={selectedProduct.image}
                                                alt={selectedProduct.alt}
                                                className="pf-dtf-modal__img"
                                            />
                                        </div>

                                        <div className="pf-dtf-modal__info">
                                            <h2 className="pf-dtf-modal__title">
                                                {selectedProduct.title}
                                            </h2>

                                            <div className="pf-dtf-modal__price">
                                                ${activeSize.price.toFixed(2)}{' '}
                                                <span>/ transfer</span>
                                            </div>

                                            <p className="pf-dtf-modal__desc">
                                                {selectedProduct.description || defaultDescription}
                                            </p>

                                            <div className="pf-dtf-modal__form">
                                                <div className="pf-dtf-field">
                                                    <label htmlFor="size-select">
                                                        Transfer Width
                                                    </label>
                                                    <select
                                                        id="size-select"
                                                        className="pf-select"
                                                        value={selectedSizeId}
                                                        onChange={(event) =>
                                                            setSelectedSizeId(event.target.value)
                                                        }
                                                    >
                                                        {selectedProduct.sizes.map((sizeItem) => (
                                                            <option
                                                                key={sizeItem.id}
                                                                value={sizeItem.id}
                                                            >
                                                                {sizeItem.label} — $
                                                                {sizeItem.price.toFixed(2)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <span className="pf-dtf-field__hint">
                                                        Approximate Width: {activeSize.dimensions}
                                                    </span>
                                                </div>

                                                <div className="pf-dtf-field">
                                                    <label htmlFor="dtf-qty-input">Quantity</label>
                                                    <input
                                                        type="number"
                                                        id="dtf-qty-input"
                                                        className="pf-input"
                                                        min={1}
                                                        max={activeSize.inventory}
                                                        value={quantity}
                                                        onChange={(event) =>
                                                            setQuantity(
                                                                Math.max(
                                                                    1,
                                                                    parseInt(
                                                                        event.target.value,
                                                                        10
                                                                    ) || 1
                                                                )
                                                            )
                                                        }
                                                    />
                                                </div>

                                                <div className="pf-dtf-notice-box">
                                                    <p className="pf-dtf-notice-box__badge">
                                                        TRANSFER FILM ONLY — NO GARMENT INCLUDED
                                                    </p>
                                                    <label className="pf-dtf-ack">
                                                        <input
                                                            type="checkbox"
                                                            checked={acknowledgmentChecked}
                                                            onChange={(event) => {
                                                                setAcknowledgmentChecked(
                                                                    event.target.checked
                                                                );
                                                                if (event.target.checked) {
                                                                    setModalValidationMsg('');
                                                                }
                                                            }}
                                                        />
                                                        <span>
                                                            I understand I am requesting a
                                                            ready-to-press DTF transfer only
                                                            (commercial heat press required; blank
                                                            shirt not included).
                                                        </span>
                                                    </label>

                                                    {modalValidationMsg && (
                                                        <p
                                                            role="alert"
                                                            className="pf-dtf-validation"
                                                        >
                                                            {modalValidationMsg}
                                                        </p>
                                                    )}

                                                    <p className="pf-dtf-subtotal-note">
                                                        Estimated subtotal:{' '}
                                                        <strong>
                                                            $
                                                            {(
                                                                activeSize.price * quantity
                                                            ).toFixed(2)}
                                                        </strong>{' '}
                                                        before shipping or Chattanooga pickup
                                                        arrangement.
                                                    </p>
                                                </div>

                                                <div className="pf-dtf-modal__actions">
                                                    <button
                                                        type="button"
                                                        className="pf-button pf-button--primary"
                                                        onClick={handleProceedOrder}
                                                    >
                                                        {selectedProduct.checkoutUrl
                                                            ? `CONTINUE TO CHECKOUT — $${(
                                                                  activeSize.price * quantity
                                                              ).toFixed(2)}`
                                                            : `REQUEST TRANSFER ORDER — $${(
                                                                  activeSize.price * quantity
                                                              ).toFixed(2)}`}
                                                    </button>

                                                    <Link
                                                        to="/shop"
                                                        className="pf-button pf-button--secondary"
                                                        onClick={closeQuickView}
                                                    >
                                                        PREFER A FINISHED SHIRT? BROWSE SHOP
                                                    </Link>
                                                </div>

                                                {!selectedProduct.checkoutUrl && (
                                                    <p className="pf-dtf-handoff-note">
                                                        Opens the PrintFlow order form with your
                                                        design, width, and quantity pre-filled so we
                                                        can confirm pickup/shipping and send an
                                                        invoice link.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </dialog>
            </div>
        </Layout>
    );
}
