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
                        <p>📞 <strong>Phone:</strong> <a href="tel:[INSERT PHONE NUMBER]" style={{color: 'inherit'}}>[INSERT PHONE NUMBER]</a></p>
                        <p>✉️ <strong>Email:</strong> <a href="mailto:[INSERT BUSINESS EMAIL]" style={{color: 'inherit'}}>[INSERT BUSINESS EMAIL]</a></p>
                        <p>🏠 <strong>Address:</strong> Local pickup available by arrangement in the Chattanooga area.</p>
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
            <div className="container footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <p>&copy; {new Date().getFullYear()} PrintFlow Studio. All rights reserved.</p>
                <div className="policy-links" style={{display: 'flex', gap: '15px', fontSize: '0.8rem'}}>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms">Terms & Conditions</Link>
                    <Link to="/shipping-pickup">Shipping & Pickup</Link>
                    <Link to="/returns">Returns</Link>
                    <Link to="/artwork-policy">Artwork Policy</Link>
                </div>
            </div>
        </footer>
    );
}
