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
                            <Link to="/custom-t-shirts-chattanooga">Custom T-Shirts</Link>
                        </li>
                        <li>
                            <Link to="/dtf-transfers-chattanooga">DTF Transfers</Link>
                        </li>
                        <li>
                            <Link to="/diy-dtf-print-sheets">DIY Print Sheets</Link>
                        </li>
                        <li className="dropdown">
                            <button className="dropbtn" aria-haspopup="true" aria-expanded="false">Organizations</button>
                            <div className="dropdown-content">
                                <Link to="/business-apparel-chattanooga">Business Apparel</Link>
                                <Link to="/church-shirts-chattanooga">Church Shirts</Link>
                                <Link to="/school-spirit-wear-chattanooga">School Apparel</Link>
                                <Link to="/sports-team-shirts-chattanooga">Sports Teams</Link>
                                <Link to="/event-shirts-chattanooga">Events & Fundraisers</Link>
                            </div>
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
                        <Link to="/custom-t-shirts-chattanooga" onClick={() => setMobileMenuOpen(false)}>Custom T-Shirts</Link>
                        <Link to="/dtf-transfers-chattanooga" onClick={() => setMobileMenuOpen(false)}>DTF Transfers</Link>
                        <Link to="/diy-dtf-print-sheets" onClick={() => setMobileMenuOpen(false)}>DIY Print Sheets</Link>
                        <Link to="/business-apparel-chattanooga" onClick={() => setMobileMenuOpen(false)}>Business Apparel</Link>
                        <Link to="/church-shirts-chattanooga" onClick={() => setMobileMenuOpen(false)}>Church Shirts</Link>
                        <Link to="/school-spirit-wear-chattanooga" onClick={() => setMobileMenuOpen(false)}>School Apparel</Link>
                        <Link to="/sports-team-shirts-chattanooga" onClick={() => setMobileMenuOpen(false)}>Sports Teams</Link>
                        <Link to="/event-shirts-chattanooga" onClick={() => setMobileMenuOpen(false)}>Event Shirts</Link>
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
