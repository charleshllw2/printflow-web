import { Link } from 'react-router-dom';
import '../styles/Hero.css';

export default function Hero() {
    const scrollToOrder = () => {
        const element = document.getElementById('order');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero section">
            <div className="hero-background"></div>
            <div className="container hero-container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Premium DTF Transfers & <br />
                        <span className="text-accent">Custom Apparel Printing</span>
                    </h1>
                    <p className="hero-subtitle">
                        Upload your design. We print it with precision and ship it fast. <br className="hidden-mobile" />
                        Built for brands, creators, and businesses.
                    </p>
                    <div className="hero-actions">
                        <button className="btn btn-primary" onClick={scrollToOrder}>
                            Start Your Order
                        </button>
                        <Link to="/file-guidelines" className="btn btn-secondary">
                            View File Guidelines
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
