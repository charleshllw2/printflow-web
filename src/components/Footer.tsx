import { Link } from 'react-router-dom';
import { BUSINESS_INFO, EXTERNAL_LINKS } from '../data/businessSettings';
import '../styles/Footer.css';

export default function Footer() {
    const activeExternalLinks = [
        { label: 'Etsy Shop', url: EXTERNAL_LINKS.etsyShopUrl },
        { label: 'Instagram', url: EXTERNAL_LINKS.instagramUrl },
        { label: 'Facebook', url: EXTERNAL_LINKS.facebookUrl },
        { label: 'TikTok', url: EXTERNAL_LINKS.tiktokUrl },
    ].filter((item) => item.url && item.url.trim() !== '');

    return (
        <footer className="pf-footer">
            <div className="pf-container pf-footer__top">
                <div className="pf-footer__brand-col">
                    <Link
                        to="/"
                        className="pf-brand-plate pf-footer__brand"
                        aria-label="PrintFlow Studio home"
                    >
                        <img
                            src="/printflow-logo-original.png"
                            alt=""
                            width={895}
                            height={711}
                            className="pf-brand-plate__mark"
                        />

                    </Link>

                    <p className="pf-footer__description">
                        Printed graphic apparel, custom group orders, and ready-to-press DTF
                        transfers crafted in {BUSINESS_INFO.primaryMarket} and shipped nationwide.
                    </p>

                    <div className="pf-footer__contact">
                        <a href={BUSINESS_INFO.emailHref} className="pf-footer__contact-link">
                            {BUSINESS_INFO.email}
                        </a>
                        <a href={BUSINESS_INFO.phoneHref} className="pf-footer__contact-meta">
                            {BUSINESS_INFO.phone}
                        </a>
                        <Link to="/about#contact" className="pf-footer__contact-cta">
                            Contact PrintFlow Studio →
                        </Link>
                    </div>

                    {activeExternalLinks.length > 0 && (
                        <ul className="pf-footer__socials" role="list">
                            {activeExternalLinks.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pf-footer__social-link"
                                    >
                                        {social.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="pf-footer__nav-grid">
                    <div className="pf-footer__col">
                        <h2 className="pf-footer__heading">Shop &amp; Transfers</h2>
                        <ul className="pf-footer__list" role="list">
                            <li><Link to="/shop">Shop Graphic Apparel</Link></li>
                            <li><Link to="/dtf-transfers">Ready-to-Press DTF Transfers</Link></li>
                            <li><Link to="/dtf-transfers-chattanooga">Custom DTF Transfers</Link></li>
                            <li><Link to="/our-work">Portfolio &amp; Recent Prints</Link></li>
                            <li><Link to="/request-quote">Start a Custom Order</Link></li>
                        </ul>
                    </div>

                    <div className="pf-footer__col">
                        <h2 className="pf-footer__heading">Custom Apparel</h2>
                        <ul className="pf-footer__list" role="list">
                            <li><Link to="/services">All Custom Services</Link></li>
                            <li><Link to="/custom-t-shirts-chattanooga">Custom T-Shirts</Link></li>
                            <li><Link to="/custom-apparel-chattanooga">Hoodies &amp; Custom Apparel</Link></li>
                            <li><Link to="/church-shirts-chattanooga">Church &amp; Ministry Merch</Link></li>
                            <li><Link to="/event-shirts-chattanooga">Family Reunion &amp; Event Shirts</Link></li>
                            <li><Link to="/business-shirts-chattanooga">Business &amp; Staff Apparel</Link></li>
                            <li><Link to="/team-shirts-chattanooga">Team &amp; Club Shirts</Link></li>
                            <li><Link to="/custom-shirts-no-minimum-chattanooga">Single &amp; Small-Batch Prints</Link></li>
                        </ul>
                    </div>

                    <div className="pf-footer__col">
                        <h2 className="pf-footer__heading">Studio &amp; Guides</h2>
                        <ul className="pf-footer__list" role="list">
                            <li><Link to="/about">About PrintFlow Studio</Link></li>
                            <li><Link to="/about#contact">Contact Us</Link></li>
                            <li><Link to="/blog">Printing &amp; Sizing Guides</Link></li>
                            <li><Link to="/blog/how-custom-shirt-orders-work">How Custom Orders Work</Link></li>
                            <li><Link to="/blog/how-to-prepare-artwork-for-dtf-printing">Prepare Artwork for DTF</Link></li>
                            <li><Link to="/blog/choosing-the-right-shirt-print-size">Shirt Print Size Guide</Link></li>
                            <li><Link to="/blog/caring-for-dtf-printed-apparel">Garment Wash &amp; Care</Link></li>
                            <li><Link to="/file-guidelines">File &amp; Artwork Guidelines</Link></li>
                            <li><Link to="/faq">Frequently Asked Questions</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="pf-container pf-footer__bottom">
                <p className="pf-footer__copyright">
                    &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
                </p>

                <ul className="pf-footer__policies" role="list">
                    <li><Link to="/shipping-pickup">Shipping Policy</Link></li>
                    <li><Link to="/returns">Return &amp; Refund Policy</Link></li>
                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link to="/terms">Terms</Link></li>
                    <li><Link to="/artwork-policy">Artwork Policy</Link></li>
                </ul>
            </div>
        </footer>
    );
}
