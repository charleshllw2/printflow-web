import '../styles/ServicesGrid.css';

export default function ServicesGrid() {
    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToOrder = () => {
        const element = document.getElementById('order');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="services" className="section services-grid-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Our Services</h2>
                </div>

                <div className="services-grid">
                    {/* Card 1 */}
                    <div className="service-card">
                        <h3>DTF Transfers</h3>
                        <p>Order individual prints or gang sheets. Perfect for press-at-home creators and apparel brands.</p>
                        <button className="btn btn-primary" onClick={scrollToOrder}>Order Transfers</button>
                    </div>

                    {/* Card 2 */}
                    <div className="service-card">
                        <h3>Custom Apparel Printing</h3>
                        <p>Send us your design and we print it on premium shirts, hoodies, and more.</p>
                        <button className="btn btn-secondary" onClick={scrollToContact}>Print My Apparel</button>
                    </div>

                    {/* Card 3 */}
                    <div className="service-card">
                        <h3>Bulk & Brand Orders</h3>
                        <p>Wholesale pricing available for brands, churches, schools, and businesses.</p>
                        <button className="btn btn-secondary" onClick={scrollToContact}>Request Bulk Quote</button>
                    </div>

                    {/* Card 4 */}
                    <div className="service-card">
                        <h3>File Setup Assistance</h3>
                        <p>Need help preparing your artwork for print? Add professional file setup support to your order.</p>
                        <button className="btn btn-secondary" onClick={scrollToOrder}>Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
