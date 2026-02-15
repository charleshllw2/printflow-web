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

    const scrollToSection = (id: string) => {
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
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
                        <button onClick={() => scrollToSection('order')}>Order DTF</button>
                    </li>
                    <li>
                        <button onClick={() => scrollToSection('services')}>Services</button>
                    </li>
                    <li>
                        <Link to="/file-guidelines">File Guidelines</Link>
                    </li>
                    <li>
                        <button onClick={() => scrollToSection('contact')}>Contact</button>
                    </li>
                </ul>

                <div className="navbar-actions">
                    {/* Placeholder for cart or login if needed */}
                    <button className="btn btn-primary" onClick={() => scrollToSection('order')}>
                        Start Order
                    </button>
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
                    <button onClick={() => scrollToSection('order')}>Order DTF</button>
                    <button onClick={() => scrollToSection('services')}>Services</button>
                    <Link to="/file-guidelines" onClick={() => setMobileMenuOpen(false)}>File Guidelines</Link>
                    <button onClick={() => scrollToSection('contact')}>Contact</button>
                </div>
            </div>
        </nav>
    );
}
