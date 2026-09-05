import { Link } from 'react-router-dom';
import '../styles/ServicesGrid.css';

export default function ServicesGrid() {
    return (
        <section id="services" className="section services-grid-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Our Services</h2>
                </div>

                <div className="services-grid">
                    {/* Card 1 */}
                    <div className="service-card">
                        <h3>Custom T-Shirts</h3>
                        <p>High-quality custom T-shirt printing for businesses, events, and individuals in Chattanooga.</p>
                        <Link to="/custom-t-shirts-chattanooga" className="btn btn-primary">Learn More</Link>
                    </div>

                    {/* Card 2 */}
                    <div className="service-card">
                        <h3>DTF Transfers</h3>
                        <p>Order individual prints or gang sheets. Perfect for press-at-home creators and apparel brands.</p>
                        <Link to="/dtf-transfers-chattanooga" className="btn btn-primary">Order Transfers</Link>
                    </div>

                    {/* Card 2b */}
                    <div className="service-card">
                        <h3>DIY DTF Print Sheets / Iron Ons</h3>
                        <p>Order ready-to-press sheets delivered right to your door. (Shipping is extra). Perfect for crafters!</p>
                        <Link to="/diy-dtf-print-sheets" className="btn btn-primary">Order DIY Sheets</Link>
                    </div>

                    {/* Card 3 */}
                    <div className="service-card">
                        <h3>Business Apparel</h3>
                        <p>Professional branded shirts and uniforms to give your team a cohesive look.</p>
                        <Link to="/business-apparel-chattanooga" className="btn btn-primary">Outfit Your Team</Link>
                    </div>

                    {/* Card 4 */}
                    <div className="service-card">
                        <h3>Church & Organization Shirts</h3>
                        <p>Custom group shirts for youth groups, praise teams, volunteers, and events.</p>
                        <Link to="/church-shirts-chattanooga" className="btn btn-secondary">Get a Quote</Link>
                    </div>

                    {/* Card 5 */}
                    <div className="service-card">
                        <h3>School & Team Apparel</h3>
                        <p>Show your spirit with custom school shirts, club apparel, and sports team gear.</p>
                        <Link to="/school-spirit-wear-chattanooga" className="btn btn-secondary">Learn More</Link>
                    </div>

                    {/* Card 6 */}
                    <div className="service-card">
                        <h3>Event & Reunion Shirts</h3>
                        <p>Memorable custom shirts for family reunions, 5Ks, fundraisers, and community events.</p>
                        <Link to="/event-shirts-chattanooga" className="btn btn-secondary">Start Planning</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
