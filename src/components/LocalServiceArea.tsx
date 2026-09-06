import { Link } from "react-router-dom";
import "../styles/LocalServiceArea.css";

export default function LocalServiceArea() {
    return (
        <section className="section local-service-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Proudly Serving Chattanooga & Surrounding Areas</h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
                        PrintFlow Studio is a local custom apparel and DTF printing business. We provide high-quality printing services to businesses, churches, schools, and organizations throughout the region.
                    </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '40px' }}>
                    {['Chattanooga', 'Hixson', 'East Ridge', 'Red Bank', 'Ooltewah', 'Collegedale', 'Signal Mountain', 'Lookout Mountain', 'Cleveland', 'North Georgia'].map(city => (
                        <span key={city} style={{ padding: '10px 20px', backgroundColor: 'white', borderRadius: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontWeight: '500', color: '#1f2937' }}>
                            {city}
                        </span>
                    ))}
                </div>
                <div className="text-center" style={{ marginTop: '50px' }}>
                    <Link to="/request-quote" className="btn btn-primary">Start Your Local Order</Link>
                </div>
            </div>
        </section>
    );
}
