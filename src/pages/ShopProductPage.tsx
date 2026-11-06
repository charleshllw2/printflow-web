import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GARMENT_FIT_DETAILS, SHOP_PRODUCTS, type ShopProductImage } from '../data/shopProducts';
import { CARE_INSTRUCTIONS, FULFILLMENT_POLICY } from '../data/businessSettings';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import './shop.css';

export default function ShopProductPage() {
    const { slug } = useParams();
    const product = SHOP_PRODUCTS.find((p) => p.slug === slug);

    const gallery: ShopProductImage[] = useMemo(() => {
        if (!product) return [];
        const base: ShopProductImage[] = [
            {
                id: 'mockup',
                label: 'Garment Mockup',
                src: product.mockup,
                alt: product.mockupAlt,
            },
            {
                id: 'artwork',
                label: 'Print Artwork',
                src: product.artwork,
                alt: product.artworkAlt,
            },
        ];
        if (product.additionalImages && product.additionalImages.length > 0) {
            return [...base, ...product.additionalImages];
        }
        return base;
    }, [product]);

    const [selectedImageId, setSelectedImageId] = useState('mockup');
    const [size, setSize] = useState(product?.sizes?.[1] || product?.sizes?.[0] || 'M');
    const [color, setColor] = useState(product?.colors?.[0] || 'Black');
    const [quantity, setQuantity] = useState(1);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    if (!product) {
        return (
            <Layout>
                <SEO
                    noindex
                    title="Product Not Found | PrintFlow Studio"
                    description="This product could not be found."
                />
                <div className="pf-container pf-pdp-missing" role="alert">
                    <p className="pf-eyebrow">404 / CATALOG</p>
                    <h1 className="pf-page-title">PRODUCT NOT FOUND.</h1>
                    <p className="pf-copy">
                        This design may have been retired or the URL is incorrect.
                    </p>
                    <div>
                        <Link to="/shop" className="pf-button pf-button--primary">
                            BACK TO SHOP
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    const activeImage = gallery.find((img) => img.id === selectedImageId) || gallery[0];
    const hasSizes = Boolean(product.sizes && product.sizes.length > 0);
    const hasColors = Boolean(product.colors && product.colors.length > 0);

    const quoteQuery = new URLSearchParams({
        design: product.id,
        designName: product.name,
        service: 'custom-apparel',
    }).toString();

    const relatedProducts = SHOP_PRODUCTS.filter((p) => p.id !== product.id)
        .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
        .slice(0, 4);

    async function buyNow() {
        if (!product) return;
        setBusy(true);
        setError('');
        try {
            const response = await fetch('/api/create-shop-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product.id,
                    size: hasSizes ? size : undefined,
                    color: hasColors ? color : undefined,
                    quantity,
                }),
            });
            const data = (await response.json()) as { url?: string; error?: string };
            if (!response.ok || !data.url) {
                throw new Error(data.error || 'Checkout could not be started.');
            }
            window.location.assign(data.url);
        } catch (checkoutError: unknown) {
            const message =
                checkoutError instanceof Error
                    ? checkoutError.message
                    : 'Secure checkout could not be opened right now.';
            setError(message);
            setBusy(false);
        }
    }

    return (
        <Layout>
            <SEO
                title={`${product.name} Tee | PrintFlow Studio`}
                description={`${product.name} — ${product.garmentLabel} ($${product.price.toFixed(2)}). Full-color DTF printed graphic tee made to order in Chattanooga, TN with pickup or nationwide shipping.`}
                canonicalUrl={`https://www.printflowstudio.com/shop/${product.slug}`}
                ogImage={`https://www.printflowstudio.com${product.mockup}`}
                ogImageAlt={product.mockupAlt}
            />

            <div className="pf-pdp">
                <div className="pf-container">
                    <nav className="pf-pdp-breadcrumb" aria-label="Breadcrumb">
                        <Link to="/shop" className="pf-pdp-back">
                            ← Back to Shop Apparel
                        </Link>
                    </nav>

                    <div className="pf-pdp-grid">
                        {/* Gallery Column */}
                        <div className="pf-pdp-gallery">
                            <div
                                className={`pf-pdp-stage ${
                                    activeImage.id === 'artwork' ? 'pf-pdp-stage--artwork' : ''
                                }`}
                            >
                                <img
                                    src={activeImage.src}
                                    alt={activeImage.alt}
                                    width={1080}
                                    height={1350}
                                    fetchPriority="high"
                                    className="pf-pdp-stage__img"
                                />
                            </div>

                            {gallery.length > 1 && (
                                <div
                                    className="pf-pdp-thumbs"
                                    role="group"
                                    aria-label="Product views"
                                >
                                    {gallery.map((img) => {
                                        const selected = activeImage.id === img.id;
                                        return (
                                            <button
                                                key={img.id}
                                                type="button"
                                                className={`pf-pdp-thumb ${
                                                    selected ? 'is-active' : ''
                                                }`}
                                                aria-label={`Show ${img.label}`}
                                                aria-pressed={selected}
                                                onClick={() => setSelectedImageId(img.id)}
                                            >
                                                <img
                                                    src={img.src}
                                                    alt={img.alt}
                                                    width={96}
                                                    height={120}
                                                />
                                                <span>{img.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {product.mockupStyleNote && (
                                <p className="pf-pdp-note">
                                    <strong>Garment Note:</strong> {product.mockupStyleNote}
                                </p>
                            )}
                        </div>

                        {/* Details & Purchase Column */}
                        <div className="pf-pdp-details">
                            <p className="pf-eyebrow">
                                {product.category} / SKU {product.id}
                            </p>

                            <h1 className="pf-pdp-title">{product.name}</h1>

                            <div className="pf-pdp-price-row">
                                <span className="pf-pdp-price">${product.price.toFixed(2)}</span>
                                <span className="pf-pdp-garment">/ {product.garmentLabel}</span>
                            </div>

                            <p className="pf-pdp-availability">
                                Pressed to order in Chattanooga, TN • Local pickup by arrangement or
                                nationwide U.S. shipping
                            </p>

                            <p className="pf-pdp-description">{product.description}</p>

                            <div className="pf-pdp-selectors">
                                {hasSizes && (
                                    <div className="pf-pdp-field">
                                        <label htmlFor="pdp-size-select">Size</label>
                                        <select
                                            id="pdp-size-select"
                                            className="pf-select"
                                            value={size}
                                            onChange={(event) => setSize(event.target.value)}
                                        >
                                            {product.sizes!.map((value) => (
                                                <option key={value} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {hasColors && (
                                    <div className="pf-pdp-field">
                                        <label htmlFor="pdp-color-select">Shirt Color</label>
                                        <select
                                            id="pdp-color-select"
                                            className="pf-select"
                                            value={color}
                                            onChange={(event) => setColor(event.target.value)}
                                        >
                                            {product.colors!.map((value) => (
                                                <option key={value} value={value}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="pf-pdp-field">
                                    <label htmlFor="pdp-qty-select">Quantity</label>
                                    <select
                                        id="pdp-qty-select"
                                        className="pf-select"
                                        value={quantity}
                                        onChange={(event) =>
                                            setQuantity(Number(event.target.value))
                                        }
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                            <option key={value} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <details className="pf-pdp-disclosure">
                                <summary>
                                    Sizing &amp; Fit Guide (Unisex{' '}
                                    {product.sizes?.join(', ') || 'Standard'})
                                </summary>
                                <div className="pf-pdp-disclosure__body">
                                    <p>
                                        <strong>Fit Style:</strong> {GARMENT_FIT_DETAILS.fitType}.
                                        For a classic relaxed silhouette, choose your usual unisex
                                        tee size; for a closer fit, consider sizing down.
                                    </p>
                                    {GARMENT_FIT_DETAILS.confirmedBlankBrand && (
                                        <p>
                                            <strong>Blank Garment:</strong>{' '}
                                            {GARMENT_FIT_DETAILS.confirmedBlankBrand}
                                        </p>
                                    )}
                                    {GARMENT_FIT_DETAILS.measurementRows.length > 0 && (
                                        <table className="pf-pdp-size-table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Size</th>
                                                    <th scope="col">Chest Width (Flat)</th>
                                                    <th scope="col">Body Length</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {GARMENT_FIT_DETAILS.measurementRows.map((row) => (
                                                    <tr key={row.size}>
                                                        <td>{row.size}</td>
                                                        <td>{row.chestWidthInches}</td>
                                                        <td>{row.bodyLengthInches}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                    <p>{GARMENT_FIT_DETAILS.extendedSizesNote}</p>
                                    <p>
                                        <Link
                                            to="/blog/choosing-the-right-shirt-print-size"
                                            className="pf-inline-link"
                                        >
                                            Guide to Choosing Shirt &amp; Print Sizes →
                                        </Link>
                                    </p>
                                </div>
                            </details>

                            <div className="pf-pdp-purchase">
                                <button
                                    type="button"
                                    className="pf-button pf-button--primary pf-pdp-buy-btn"
                                    onClick={buyNow}
                                    disabled={busy}
                                >
                                    {busy
                                        ? 'OPENING SECURE CHECKOUT…'
                                        : `BUY STANDARD TEE — $${(product.price * quantity).toFixed(2)}`}
                                </button>

                                <p className="pf-pdp-tax-note">
                                    Shipping or Chattanooga pickup options and applicable tax are
                                    confirmed at checkout.
                                </p>

                                {product.etsyListingUrl && (
                                    <a
                                        href={product.etsyListingUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pf-button pf-button--secondary pf-pdp-etsy-btn"
                                    >
                                        ALSO VIEW ON ETSY →
                                    </a>
                                )}
                            </div>

                            {error && (
                                <div className="pf-pdp-error" role="alert">
                                    <p>{error}</p>
                                    <p>
                                        You can also{' '}
                                        <Link
                                            to={`/request-quote?${quoteQuery}`}
                                            className="pf-inline-link"
                                        >
                                            submit a direct order request for {product.name}
                                        </Link>{' '}
                                        and PrintFlow Studio will send an invoice link directly.
                                    </p>
                                </div>
                            )}

                            <div className="pf-pdp-specs">
                                {product.printPlacement && (
                                    <div className="pf-pdp-spec-block">
                                        <h2>Print &amp; Garment Details</h2>
                                        <ul>
                                            <li>
                                                <strong>Garment:</strong> {product.garmentLabel}
                                            </li>
                                            <li>
                                                <strong>Print Placement:</strong>{' '}
                                                {product.printPlacement}
                                            </li>
                                            <li>
                                                <strong>Print Method:</strong> {product.printMethod}
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                <div className="pf-pdp-spec-block">
                                    <h2>Care Instructions</h2>
                                    <ul>
                                        {CARE_INSTRUCTIONS.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                    <p className="pf-pdp-spec-links">
                                        <Link
                                            to="/blog/caring-for-dtf-printed-apparel"
                                            className="pf-inline-link"
                                        >
                                            Full DTF Apparel Care Guide →
                                        </Link>
                                    </p>
                                </div>

                                <div className="pf-pdp-spec-block">
                                    <h2>Shipping, Pickup &amp; Returns</h2>
                                    <p>
                                        {FULFILLMENT_POLICY.pickupSummary}{' '}
                                        {FULFILLMENT_POLICY.shippingSummary}
                                    </p>
                                    <p>{FULFILLMENT_POLICY.timingSummary}</p>
                                    <p>{FULFILLMENT_POLICY.returnsSummary}</p>
                                    <p className="pf-pdp-spec-links">
                                        <Link to="/shipping-pickup" className="pf-inline-link">
                                            Shipping &amp; Pickup Policy
                                        </Link>{' '}
                                        <span aria-hidden="true">•</span>{' '}
                                        <Link to="/returns" className="pf-inline-link">
                                            Return &amp; Refund Policy
                                        </Link>
                                    </p>
                                </div>
                            </div>

                            <div className="pf-pdp-custom-box">
                                <h3>Want a Hoodie, Crewneck, Extended Size, or DTF Transfer?</h3>
                                <p>
                                    Want the <em>{product.name}</em> design pressed on a pullover
                                    hoodie, sweatshirt, long-sleeve tee, Youth/2XL–3XL blank, or
                                    supplied as a ready-to-press DTF transfer?
                                </p>
                                <div className="pf-pdp-custom-box__actions">
                                    <Link
                                        className="pf-button pf-button--secondary"
                                        to={`/request-quote?${quoteQuery}`}
                                    >
                                        REQUEST CUSTOM GARMENT
                                    </Link>
                                    <Link
                                        className="pf-button pf-button--dark"
                                        to="/dtf-transfers"
                                    >
                                        SHOP DTF TRANSFERS
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {relatedProducts.length > 0 && (
                        <section
                            className="pf-pdp-related"
                            aria-labelledby="related-designs-heading"
                        >
                            <div className="pf-pdp-related__head">
                                <div>
                                    <p className="pf-eyebrow">MORE FROM THE CATALOG</p>
                                    <h2 id="related-designs-heading" className="pf-shop-subhead">
                                        RELATED APPAREL.
                                    </h2>
                                </div>
                                <Link to="/shop" className="pf-text-link">
                                    VIEW ALL APPAREL <span aria-hidden="true">→</span>
                                </Link>
                            </div>

                            <div className="pf-product-grid">
                                {relatedProducts.map((item) => (
                                    <ProductCard key={item.id} product={item} headingLevel="h3" />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </Layout>
    );
}
