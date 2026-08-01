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
                        PrintFlow Studio creates high-quality custom T-shirts, DTF transfers and branded apparel for Chattanooga businesses, churches, schools, teams, families and community organizations. Upload your artwork or let us help prepare your design for printing.
                    </p>
                    <div className="hero-actions">
                        <Link to="/request-quote" className="btn btn-primary">
                            Request a Quote
                        </Link>
                        <Link to="/request-quote" className="btn btn-secondary">
                            Upload Your Artwork
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
