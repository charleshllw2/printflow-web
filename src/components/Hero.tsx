import { Link } from 'react-router-dom';
import '../styles/Hero.css';

export default function Hero() {
    return (
        <section className="hero section">
            <div className="hero-background"></div>
            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Custom T-Shirt Printing and <br />
                        <span className="text-accent">DTF Transfers in Chattanooga</span>
                    </h1>
                    <p className="hero-subtitle">
                        Professional custom apparel for businesses, churches, schools, teams, events, families, and growing brands. Get dependable artwork support, flexible order quantities, local Chattanooga pickup, and nationwide shipping.
                    </p>
                    <div className="hero-actions">
                        <Link to="/request-quote" className="btn btn-primary">
                            Request a Quote
                        </Link>
                        <Link to="/request-quote" className="btn btn-secondary">
                            Upload Your Artwork
                        </Link>
                    </div>
                    <div className="hero-trust-line" style={{marginTop: '25px', fontSize: '0.9rem', color: '#e5e7eb', fontWeight: '500'}}>
                        Local pickup • Nationwide shipping • Artwork support • Small and bulk orders
                    </div>
                </div>
            </div>
        </section>
    );
}
