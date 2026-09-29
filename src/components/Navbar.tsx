import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => {
      setMobileMenuOpen(false);
      window.scrollTo(0, 0);
    };

    return (
        <header className="site-header">
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMenu}>
                        <img 
                            src="/logo.png" 
                            alt="PrintFlow Studio custom apparel and DTF printing." 
                            className="nav-logo-icon"
                        />
                        <span className="nav-logo-text">PRINTFLOW<span className="text-accent">STUDIO</span></span>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="navbar-menu">
                        <li><Link to="/custom-t-shirts-chattanooga">Custom Shirts</Link></li>
                        <li><Link to="/business-shirts-chattanooga">Business Apparel</Link></li>
                        <li><Link to="/dtf-transfers-chattanooga">DTF Transfers</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/#portfolio">Our Work</Link></li>
                        <li><Link to="/#how-it-works">How It Works</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                    </ul>

                    <div className="navbar-actions">
                        <Link to="/request-quote" className="btn btn-primary">
                            GET A QUOTE
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="navbar-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>

                    {/* Mobile Menu */}
                    <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                        <Link to="/custom-t-shirts-chattanooga" onClick={closeMenu}>Custom Shirts</Link>
                        <Link to="/business-shirts-chattanooga" onClick={closeMenu}>Business Apparel</Link>
                        <Link to="/dtf-transfers-chattanooga" onClick={closeMenu}>DTF Transfers</Link>
                        <Link to="/shop" onClick={closeMenu}>Shop</Link>
                        <Link to="/#portfolio" onClick={closeMenu}>Our Work</Link>
                        <Link to="/#how-it-works" onClick={closeMenu}>How It Works</Link>
                        <Link to="/faq" onClick={closeMenu}>FAQ</Link>
                        <Link to="/request-quote" onClick={closeMenu} style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Get A Quote</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
