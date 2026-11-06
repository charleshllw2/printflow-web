import { Link } from 'react-router-dom';
import { PRICING_OFFERS } from '../../data/businessSettings';

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

function trackCta(eventName: string) {
  if (typeof window !== 'undefined') {
    const w = window as GtagWindow;
    w.gtag?.('event', eventName);
  }
}

export default function Hero() {
  return (
    <section className="premium-hero">
      <div className="container">
        <p className="hero-eyebrow">CUSTOM T-SHIRT PRINTING • CHATTANOOGA, TN</p>
        <h1 className="hero-heading">YOUR IDEA.<br/>YOUR SHIRT.<br/>PRINTED RIGHT.</h1>
        <p className="hero-support">Custom shirts and apparel for businesses, churches, reunions, teams, events, gifts, and everyday ideas. From one shirt to larger group orders, PrintFlow Studio makes custom apparel simple.</p>

        <div className="hero-ctas">
          <Link to="/request-quote" className="btn btn-primary" onClick={() => trackCta("cta_start_shirt")}>START MY SHIRT</Link>
          <Link to="/shop" className="btn btn-outline" onClick={() => trackCta("cta_browse_shop")}>SHOP READY-MADE DESIGNS</Link>
        </div>
      </div>

      <div className="hero-trust-strip">
        <div className="container strip-content">
          <span>CUSTOM SHIRTS FROM ${PRICING_OFFERS.customShirtStartingPrice.toFixed(2)}</span>
          <span className="dot">•</span>
          <span>FLEXIBLE QUANTITIES</span>
          <span className="dot">•</span>
          <span>CHATTANOOGA PICKUP BY ARRANGEMENT</span>
          <span className="dot">•</span>
          <span>NATIONWIDE SHIPPING</span>
          <span className="dot">•</span>
          <span>ARTWORK SUPPORT</span>
        </div>
      </div>
    </section>
  );
}
