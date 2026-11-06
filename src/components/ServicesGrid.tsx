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
                        <p>Full-color custom T-shirt printing for businesses, events, gifts, and individuals in Chattanooga.</p>
                        <Link to="/custom-t-shirts-chattanooga" className="btn btn-primary">Learn More</Link>
                    </div>

                    {/* Card 2 */}
                    <div className="service-card">
                        <h3>Custom DTF Transfers</h3>
                        <p>Order individual custom transfers or multi-logo gang sheets printed from your artwork for your heat press.</p>
                        <Link to="/dtf-transfers-chattanooga" className="btn btn-primary">Order Custom Transfers</Link>
                    </div>

                    {/* Card 2b */}
                    <div className="service-card">
                        <h3>Ready-to-Press DTF Designs</h3>
                        <p>Browse premade PrintFlow Studio transfer designs in 5 widths—ready to apply with a commercial heat press.</p>
                        <Link to="/dtf-transfers" className="btn btn-primary">Browse Premade Transfers</Link>
                    </div>

                    {/* Card 3 */}
                    <div className="service-card">
                        <h3>Business Apparel</h3>
                        <p>Professional branded work shirts, polos, and hoodies to give your crew a consistent look.</p>
                        <Link to="/business-shirts-chattanooga" className="btn btn-primary">Outfit Your Team</Link>
                    </div>

                    {/* Card 4 */}
                    <div className="service-card">
                        <h3>Church &amp; Ministry Shirts</h3>
                        <p>Custom group shirts for youth groups, VBS, praise teams, volunteers, and outreach events.</p>
                        <Link to="/church-shirts-chattanooga" className="btn btn-secondary">Explore Church Shirts</Link>
                    </div>

                    {/* Card 5 */}
                    <div className="service-card">
                        <h3>School &amp; Team Apparel</h3>
                        <p>Show your spirit with custom school shirts, club apparel, booster merch, and sports team gear.</p>
                        <Link to="/team-shirts-chattanooga" className="btn btn-secondary">Learn More</Link>
                    </div>

                    {/* Card 6 */}
                    <div className="service-card">
                        <h3>Event &amp; Reunion Shirts</h3>
                        <p>Memorable custom shirts for family reunions, 5Ks, fundraisers, and local community gatherings.</p>
                        <Link to="/event-shirts-chattanooga" className="btn btn-secondary">Start Planning</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
