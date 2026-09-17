import { Link } from 'react-router-dom';
import '../styles/Hero.css';

export default function Hero() {
    return (
        <section className="hero-section">
            <div className="container hero-split">
                <div className="hero-content-left">
                    <img 
                        src="/logo.png" 
                        alt="PrintFlow Studio Brand Mark" 
                        className="hero-brand-mark"
                    />
                    <h1 className="hero-headline">
                        Custom Apparel <br />
                        <span className="hero-accent">Made Simple.</span>
                    </h1>
                    <p className="hero-description">
                        Vibrant custom shirts and ready-to-press DTF transfers for Chattanooga businesses, churches, teams, events, and creators—with flexible quantities, fast turnaround, local pickup, and nationwide shipping.
                    </p>
                    <div className="hero-button-group">
                        <Link to="/request-quote" className="btn hero-btn btn-primary">
                            Get a Fast Quote
                        </Link>
                        <Link to="/services" className="btn hero-btn btn-outline">
                            Explore Our Services
                        </Link>
                    </div>
                    <ul className="hero-trust-list">
                        <li><span className="check-icon">✓</span> Flexible Order Quantities</li>
                        <li><span className="check-icon">✓</span> Professional Artwork Support</li>
                        <li><span className="check-icon">✓</span> Chattanooga Pickup</li>
                        <li><span className="check-icon">✓</span> Nationwide Shipping</li>
                    </ul>
                </div>
                <div className="hero-image-right">
                    <div className="hero-image-wrapper">
                        <img 
                            src="/hero-apparel-group.jpg" 
                            alt="Group of people wearing custom printed t-shirts and hoodies" 
                            className="hero-apparel-img"
                        />
                        {/* Subtle background glow effect */}
                        <div className="hero-image-glow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
