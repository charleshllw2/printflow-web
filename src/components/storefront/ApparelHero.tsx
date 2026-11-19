import { Link } from 'react-router-dom';

export default function ApparelHero() {
    return (
        <section className="pf-hero" aria-labelledby="hero-title">
            <div className="pf-hero__media">
                <img src="/moon-rose-hoodie-1254.jpg" srcSet="/moon-rose-hoodie-720.jpg 720w, /moon-rose-hoodie-1254.jpg 1254w" sizes="(max-width: 767px) 100vw, 72vw" alt="PrintFlow Studio black hoodie with ornate rose artwork" width="1254" height="1254" fetchPriority="high" className="pf-hero__img" />
                <div className="pf-hero__scrim" />
            </div>
            <div className="pf-hero__frame" aria-hidden="true" />
            <div className="pf-container pf-hero__container">
                <div className="pf-hero__content">
                    <p className="pf-eyebrow pf-hero__eyebrow">PRINTFLOW STUDIO</p>
                    <h1 id="hero-title" className="pf-display pf-hero__title">Custom T-Shirt Printing &amp; DTF Transfers in Chattanooga, TN</h1>
                    <p className="pf-hero__subheadline">Your Vision. In Print.</p>
                    <p className="pf-copy pf-hero__copy">Bring your vision to life with PrintFlow Studio. We create custom T-shirts, business apparel, church shirts, family designs, and ready-to-press DTF transfers. No minimum orders. Proudly serving Chattanooga and shipping nationwide.</p>
                    <div className="pf-hero__actions">
                        <Link className="pf-button pf-button--primary" to="/request-quote">Start a Custom Order</Link>
                        <Link className="pf-button pf-button--secondary" to="/shop">Shop Our Designs</Link>
                        <Link className="pf-button pf-button--secondary" to="/dtf-transfers">Shop DTF Transfers</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
