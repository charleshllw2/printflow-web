import { Link } from 'react-router-dom';
import type { ShopProduct } from '../data/shopProducts';

interface ProductCardProps {
    product: ShopProduct;
    headingLevel?: 'h2' | 'h3';
    priority?: boolean;
}

export default function ProductCard({
    product,
    headingLevel = 'h3',
    priority = false,
}: ProductCardProps) {
    const HeadingTag = headingLevel;
    const hasAltArtwork = Boolean(product.artwork && product.artwork !== product.mockup);

    return (
        <article
            className={`pf-product-card ${hasAltArtwork ? 'pf-product-card--has-alt' : ''}`}
        >
            <div className="pf-product-media">
                <img
                    src={product.mockup}
                    alt={product.mockupAlt}
                    width={800}
                    height={1000}
                    loading={priority ? undefined : 'lazy'}
                    fetchPriority={priority ? 'high' : undefined}
                    className="pf-product-media__primary"
                />
                {hasAltArtwork && (
                    <img
                        src={product.artwork}
                        alt=""
                        aria-hidden="true"
                        width={800}
                        height={1000}
                        loading="lazy"
                        fetchPriority="low"
                        className="pf-product-media__alt"
                    />
                )}
            </div>

            <div className="pf-product-info">
                <span className="pf-product-meta">{product.category}</span>
                <div className="pf-product-row">
                    <HeadingTag className="pf-product-title">
                        <Link to={`/shop/${product.slug}`} className="pf-product-link">
                            {product.name}
                        </Link>
                    </HeadingTag>
                    <span className="pf-product-price">${product.price.toFixed(2)}</span>
                </div>
            </div>
        </article>
    );
}
