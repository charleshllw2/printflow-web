import { Link } from 'react-router-dom';
import '../styles/OrderOptions.css';

export default function OrderOptions() {
    return (
        <section className="section order-options bg-light">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Custom Apparel for Every Kind of Order</h2>
                </div>
                
                <div className="options-grid">
                    <div className="option-card">
                        <div className="option-content">
                            <h3>LOCAL CUSTOM ORDERS</h3>
                            <p>For Chattanooga businesses, churches, schools, teams, events, families, and organizations.</p>
                        </div>
                        <div className="option-action">
                            <Link to="/request-quote" className="btn btn-primary full-width">Request a Local Quote</Link>
                        </div>
                    </div>

                    <div className="option-card">
                        <div className="option-content">
                            <h3>SHIPPED CUSTOM ORDERS</h3>
                            <p>Custom apparel delivered throughout the United States for organizations, events, brands, and families.</p>
                        </div>
                        <div className="option-action">
                            <Link to="/request-quote" className="btn btn-primary full-width">Request a Shipped-Order Quote</Link>
                        </div>
                    </div>

                    <div className="option-card">
                        <div className="option-content">
                            <h3>DTF TRANSFERS</h3>
                            <p>Individual transfers and gang-sheet options for apparel decorators, creators, and growing clothing brands.</p>
                        </div>
                        <div className="option-action">
                            <Link to="/dtf-transfers-chattanooga" className="btn btn-secondary full-width">Explore DTF Transfers</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
