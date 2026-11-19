import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import seasonalFeature from '../../data/homeSeasonalFeature.json';

const transfer = products.find(product => product.id === seasonalFeature.transferId);

export default function FeaturedProducts() {
    return (
        <section className="pf-section pf-section--alt pf-section--bordered" aria-labelledby="holiday-heading">
            <div className="pf-container">
                <div className="pf-section-header">
                    <div className="pf-section-header__main">
                        <h2 id="holiday-heading" className="pf-section-title">{seasonalFeature.heading}</h2>
                    </div>
                    <div>
                        <p className="pf-copy pf-section-header__copy">{seasonalFeature.description}</p>
                        <Link to={seasonalFeature.quotePath} className="pf-button pf-button--primary">{seasonalFeature.quoteLabel}</Link>
                    </div>
                </div>
                {transfer && (
                    <Link className="pf-seasonal-transfer" to={`/dtf-transfers#${transfer.id}`}>
                        <img src={transfer.image} alt={transfer.alt} width="144" height="144" loading="lazy" />
                        <span>{transfer.title} ready-to-press DTF transfer →</span>
                    </Link>
                )}
            </div>
        </section>
    );
}
