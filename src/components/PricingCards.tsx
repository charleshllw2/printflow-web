import { Link } from 'react-router-dom';
import '../styles/PricingCards.css';

export default function PricingCards() {
    return (
        <section className="pricing-section section">
            <div className="container">
                <div className="pricing-header text-center">
                    <h2>Professional Custom Apparel for Every Size Order</h2>
                    <p className="pricing-subtitle">Whether you need one custom shirt or apparel for an entire organization, PrintFlow Studio makes ordering simple.</p>
                </div>

                <div className="pricing-grid">
                    {/* Card 1 */}
                    <div className="pricing-card">
                        <div className="pricing-card-content">
                            <h3 className="pricing-title">
                                <Link to="/custom-tshirts-chattanooga" style={{ color: 'inherit', textDecoration: 'none' }}>Custom Shirts</Link>
                            </h3>
                            <div className="pricing-price">
                                <span className="starting-at">Starting at</span>
                                <span className="price-value">$27.99</span>
                            </div>
                            <p className="pricing-desc">Professionally printed custom apparel for individuals, gifts, brands, events, and organizations.</p>
                            <ul className="pricing-features">
                                <li><span className="check">✓</span> Full-color DTF printing</li>
                                <li><span className="check">✓</span> Flexible order quantities</li>
                                <li><span className="check">✓</span> Artwork quality check</li>
                                <li><span className="check">✓</span> Local pickup or shipping</li>
                            </ul>
                        </div>
                        <div className="pricing-action">
                            <Link to="/request-quote?service=custom-t-shirts" className="btn btn-outline full-width">
                                Start Your Shirt
                            </Link>
                        </div>
                    </div>

                    {/* Card 2 - FEATURED */}
                    <div className="pricing-card featured-card">
                        <div className="featured-badge">BEST FOR LOCAL BUSINESSES</div>
                        <div className="pricing-card-content">
                            <h3 className="pricing-title">
                                <Link to="/business-apparel-chattanooga" style={{ color: 'inherit', textDecoration: 'none' }}>Business Apparel Starter Pack</Link>
                            </h3>
                            <div className="pricing-price">
                                <span className="starting-at">10 Shirts Starting at</span>
                                <span className="price-value">$199</span>
                            </div>
                            <p className="pricing-desc">Give your business a professional, consistent look with custom logo shirts for your team.</p>
                            <ul className="pricing-features">
                                <li><span className="check">✓</span> 10 quality custom T-shirts</li>
                                <li><span className="check">✓</span> One full-color front print</li>
                                <li><span className="check">✓</span> Free artwork quality check</li>
                                <li><span className="check">✓</span> One digital proof before production</li>
                                <li><span className="check">✓</span> Free Chattanooga pickup</li>
                            </ul>
                        </div>
                        <div className="pricing-action">
                            <Link to="/request-quote?package=business-starter-pack" className="btn btn-primary full-width featured-btn">
                                Claim This Package
                            </Link>
                        </div>
                        <p className="pricing-disclaimer">
                            Starting price includes standard T-shirts and one standard-size front print. Extended sizes, premium garments, additional print locations, design services, shipping, taxes, and specialty requests may affect the final price. Final pricing is confirmed before production.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="pricing-card">
                        <div className="pricing-card-content">
                            <h3 className="pricing-title">
                                <Link to="/dtf-transfers-chattanooga" style={{ color: 'inherit', textDecoration: 'none' }}>Ready-to-Press DTF Transfers</Link>
                            </h3>
                            <div className="pricing-price">
                                <span className="starting-at">Starting at</span>
                                <span className="price-value">$5.99</span>
                            </div>
                            <p className="pricing-desc">Vibrant, ready-to-press transfers for apparel businesses, creators, and DIY projects.</p>
                            <ul className="pricing-features">
                                <li><span className="check">✓</span> Full-color printing</li>
                                <li><span className="check">✓</span> No color-count limitations</li>
                                <li><span className="check">✓</span> Artwork quality check</li>
                                <li><span className="check">✓</span> Local pickup or nationwide shipping</li>
                            </ul>
                        </div>
                        <div className="pricing-action">
                            <Link to="/request-quote?service=dtf-transfers" className="btn btn-outline full-width">
                                Order DTF Transfers
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pricing-footer text-center">
                    <p>Need a larger quantity or something completely custom? Request a personalized quote for bulk apparel, churches, schools, teams, events, and organizations.</p>
                    <Link to="/request-quote" className="btn btn-primary">
                        Request a Custom Quote
                    </Link>
                </div>
            </div>
        </section>
    );
}
