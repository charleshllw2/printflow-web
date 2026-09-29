import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="premium-hero">
      <div className="container">
        <p className="hero-eyebrow">CUSTOM T-SHIRT PRINTING • CHATTANOOGA, TN</p>
        <h1 className="hero-heading">YOUR IDEA.<br/>YOUR SHIRT.<br/>PRINTED RIGHT.</h1>
        <p className="hero-support">Custom shirts and apparel for businesses, churches, teams, events, gifts and everyday ideas. From one shirt to larger orders, PrintFlow Studio makes custom apparel simple.</p>
        
        <div className="hero-ctas">
          <Link to="/request-quote" className="btn btn-primary" onClick={() => (window as any).gtag && (window as any).gtag("event", "cta_start_shirt")}>START MY SHIRT</Link>
          <Link to="/request-quote" className="btn btn-outline" onClick={() => (window as any).gtag && (window as any).gtag("event", "cta_get_quote")}>GET A FAST QUOTE</Link>
        </div>
      </div>
      
      <div className="hero-trust-strip">
        <div className="container strip-content">
          <span>CUSTOM SHIRTS FROM $27.99</span>
          <span className="dot">•</span>
          <span>FLEXIBLE QUANTITIES</span>
          <span className="dot">•</span>
          <span>LOCAL CHATTANOOGA PICKUP</span>
          <span className="dot">•</span>
          <span>NATIONWIDE SHIPPING</span>
          <span className="dot">•</span>
          <span>ARTWORK SUPPORT</span>
        </div>
      </div>
    </section>
  );
}
