import { Link } from 'react-router-dom';
import '../styles/StarterPackPromo.css';

export default function StarterPackPromo() {
    return (
        <section className="starter-promo-section section">
            <div className="container promo-container">
                <div className="promo-content">
                    <h2 className="promo-headline">Your Team Should Look as Professional as Your Business.</h2>
                    <p className="promo-description">
                        Outfit your employees with custom shirts featuring your logo and brand colors. The PrintFlow Studio Business Apparel Starter Pack is designed for Chattanooga businesses that want professional apparel without complicated ordering or oversized minimums.
                    </p>
                    
                    <div className="promo-offer">
                        <span className="offer-highlight">10 Custom Business Shirts Starting at $199</span>
                    </div>

                    <div className="promo-steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <div className="step-text">Upload Your Logo</div>
                        </div>
                        <div className="step">
                            <div className="step-number">2</div>
                            <div className="step-text">Approve Your Digital Proof</div>
                        </div>
                        <div className="step">
                            <div className="step-number">3</div>
                            <div className="step-text">Pick Up Your Finished Shirts</div>
                        </div>
                    </div>

                    <div className="promo-actions">
                        <Link to="/request-quote?package=business-starter-pack" className="btn btn-primary promo-btn">
                            Get My Business Starter Pack
                        </Link>
                        <a href="tel:4236812218" className="promo-secondary-link">
                            Call or Text 423-681-2218
                        </a>
                    </div>
                </div>
                
                <div className="promo-image-container">
                    <img 
                        src="/business-team.jpg" 
                        alt="Professional business team wearing custom logo apparel" 
                        className="promo-image"
                    />
                </div>
            </div>
        </section>
    );
}
