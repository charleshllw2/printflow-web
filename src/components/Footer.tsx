import '../styles/Footer.css';

export default function Footer() {
    return (
        <footer className="footer section">
            <div className="container footer-container">
                <div className="footer-brand">
                    <div className="footer-logo">PRINTFLOW<span className="text-accent">STUDIO</span></div>
                    <p>Premium DTF Transfers & Custom Apparel.</p>
                    <p>Built for brands, creators, and businesses.</p>
                </div>

                <div className="footer-links">
                    <div>
                        <h4>Shop</h4>
                        <ul>
                            <li><a href="#order">DTF Transfers</a></li>
                            <li><a href="#services">Custom Apparel</a></li>
                            <li><a href="#services">Bulk Orders</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Support</h4>
                        <ul>
                            <li><Link to="/file-guidelines">File Guidelines</Link></li>
                            <li><a href="#contact">Contact Us</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container footer-bottom">
                <p>&copy; {new Date().getFullYear()} Printflow Studio. All rights reserved.</p>
            </div>
        </footer>
    );
}

import { Link } from 'react-router-dom';
