import { Link } from 'react-router-dom';

export default function StatementCTA() {
    return (
        <section
            className="pf-section pf-section--bordered pf-statement"
            aria-labelledby="pf-statement-heading"
        >
            <div className="pf-statement__watermark" aria-hidden="true">
                PRINTFLOW
            </div>

            <div className="pf-container pf-statement__inner">
                <p className="pf-eyebrow">PRINTFLOW STUDIO</p>

                <h2 id="pf-statement-heading" className="pf-statement-title">
                    <span className="pf-block-line">WEAR YOUR</span>
                    <span className="pf-block-line pf-accent-word">VISION.</span>
                </h2>

                <p className="pf-copy pf-statement__copy">
                    Find your next favorite piece or create something of your own.
                </p>

                <div className="pf-statement__actions">
                    <Link to="/shop" className="pf-button pf-button--primary">
                        SHOP PRINTFLOW
                    </Link>
                    <Link to="/request-quote" className="pf-button pf-button--secondary">
                        START YOUR PROJECT
                    </Link>
                </div>
            </div>
        </section>
    );
}
