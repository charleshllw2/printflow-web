import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
    return (
        <footer className="footer section">
            <div className="container footer-container">
                <div className="footer-brand">
                    <div className="footer-logo">PRINTFLOW<span className="text-accent">STUDIO</span></div>
                    <p>Custom T-Shirts, DTF Transfers & Premium Apparel for Chattanooga businesses and organizations.</p>
                    
                    <div className="local-contact" style={{marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                        <p>📍 <strong>Serving:</strong> Chattanooga, Hixson, East Ridge, Ooltewah & Surrounding Areas</p>
                        <p>📞 <strong>Phone:</strong> [OWNER CONFIRMATION REQUIRED: Phone Number]</p>
                        <p>✉️ <strong>Email:</strong> [OWNER CONFIRMATION REQUIRED: Email Address]</p>
                        <p>🏠 <strong>Address:</strong> [OWNER CONFIRMATION REQUIRED: Public Address]</p>
                    </div>
                </div>

                <div className="footer-links">
                    <div>
                        <h4>Services</h4>
                        <ul>
                            <li><Link to="/custom-t-shirts-chattanooga">Custom T-Shirts</Link></li>
                            <li><Link to="/dtf-transfers-chattanooga">DTF Transfers</Link></li>
                            <li><Link to="/business-apparel-chattanooga">Business Apparel</Link></li>
                            <li><Link to="/promotional-products-chattanooga">Promotional Products</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Organizations</h4>
                        <ul>
                            <li><Link to="/church-shirts-chattanooga">Church Shirts</Link></li>
                            <li><Link to="/school-spirit-wear-chattanooga">School Apparel</Link></li>
                            <li><Link to="/sports-team-shirts-chattanooga">Sports Teams</Link></li>
                            <li><Link to="/event-shirts-chattanooga">Events & Fundraisers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Support</h4>
                        <ul>
                            <li><Link to="/file-guidelines">File Guidelines</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/request-quote">Request a Quote</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container footer-bottom">
                <p>&copy; {new Date().getFullYear()} PrintFlow Studio. All rights reserved.</p>
                <div style={{display: 'flex', gap: '15px'}}>
                    {/* Placeholder for Privacy/Terms */}
                </div>
            </div>
        </footer>
    );
}
