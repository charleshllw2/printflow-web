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

    return (
        <header className="site-header">
            <div className={`announcement-bar ${scrolled ? 'hidden' : ''}`}>
                <p>Fast turnaround available • Local Chattanooga pickup • Nationwide shipping</p>
            </div>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container navbar-container">
                    <Link to="/" className="navbar-logo">
                        PRINTFLOW<span className="text-accent">STUDIO</span>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="navbar-menu">
                        <li>
                            <Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link>
                        </li>
                        <li>
                            <Link to="/services">Services</Link>
                        </li>
                        <li>
                            <Link to="/file-guidelines">File Guidelines</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/faq">FAQ</Link>
                        </li>
                        <li>
                            <Link to="/request-quote">Contact</Link>
                        </li>
                    </ul>

                    <div className="navbar-actions">
                        <Link to="/request-quote" className="btn btn-primary">
                            Request a Quote
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
                        <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
                        <Link to="/file-guidelines" onClick={() => setMobileMenuOpen(false)}>File Guidelines</Link>
                        <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
                        <Link to="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
                        <Link to="/request-quote" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
