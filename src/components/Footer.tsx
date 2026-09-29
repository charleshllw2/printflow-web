import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
    return (
        <footer className="footer section">
            <div className="container footer-container">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo" onClick={() => window.scrollTo(0, 0)}>
                        <img 
                            src="/logo.png" 
                            alt="PrintFlow Studio custom apparel and DTF printing." 
                            className="footer-logo-icon"
                        />
                        <span className="footer-logo-text">PRINTFLOW<span className="text-accent">STUDIO</span></span>
                    </Link>
                    <p>Serving Chattanooga, Tennessee and surrounding communities.</p>
                    
                    <div className="local-contact" style={{marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                        <p>📞 <strong>Phone:</strong> <a href="tel:423-681-2218" style={{color: 'inherit'}}>423-681-2218</a></p>
                        <p>✉️ <strong>Email:</strong> <a href="mailto:hello@printflowstudio.com" style={{color: 'inherit'}}>hello@printflowstudio.com</a></p>
                    </div>

                    <div className="social-links" style={{marginTop: '20px', display: 'flex', gap: '15px'}}>
                        {/* Verified social profiles */}
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-primary)'}}>Instagram</a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-primary)'}}>Facebook</a>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-primary)'}}>TikTok</a>
                    </div>
                </div>

                <div className="footer-links">
                    <div>
                        <h4>Services</h4>
                        <ul>
                            <li><Link to="/custom-t-shirts-chattanooga">Custom Shirts</Link></li>
                            <li><Link to="/business-shirts-chattanooga">Business Apparel</Link></li>
                            <li><Link to="/church-shirts-chattanooga">Church Shirts</Link></li>
                            <li><Link to="/event-shirts-chattanooga">Event Shirts</Link></li>
                            <li><Link to="/team-shirts-chattanooga">Team Shirts</Link></li>
                            <li><Link to="/dtf-transfers-chattanooga">DTF Transfers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/our-work">Our Work</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/request-quote">Get Quote</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
                <p>&copy; {new Date().getFullYear()} PrintFlow Studio. All rights reserved.</p>
                <div className="policy-links" style={{display: 'flex', gap: '15px', fontSize: '0.8rem'}}>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms">Terms</Link>
                    <Link to="/shipping-pickup">Shipping</Link>
                    <Link to="/returns">Returns</Link>
                </div>
            </div>
        </footer>
    );
}
