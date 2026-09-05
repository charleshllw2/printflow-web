import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import { Link } from "react-router-dom";

export default function DIYPrintSheets() {
    return (
        <Layout>
            <SEO 
                title="DIY DTF Print Sheets & Iron Ons | PrintFlow Studio" 
                description="Order custom DIY DTF print sheets and iron-ons. Press them yourself at home. Nationwide shipping available (shipping is extra)."
            />
            <div className="section bg-light">
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '60px', paddingBottom: '60px' }}>
                        <h1 style={{ marginBottom: '20px' }}>DIY DTF Print Sheets & Iron-Ons</h1>
                        <p className="subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '30px' }}>
                            Order our vibrant, high-quality DTF sheets and press them yourself! Perfect for crafters, small brands, and DIY projects.
                        </p>
                        <p style={{ marginBottom: '40px', fontSize: '1.1rem', fontWeight: '500' }}>
                            📦 Nationwide shipping available (shipping is extra).
                        </p>
                        <Link to="/request-quote" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>
                            Order Your DIY Sheets Now
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className="section">
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '30px' }}>Why Choose Our DIY Print Sheets?</h2>
                    
                    <div style={{ marginBottom: '25px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Incredible Quality</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Our DTF (Direct-to-Film) transfers provide vibrant colors, crisp details, and stretchability that traditional iron-on paper can't match.</p>
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Works on Almost Anything</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Press these sheets onto cotton, polyester, blends, denim, and even canvas. If you can iron it, you can probably press a DTF transfer on it.</p>
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Ready to Press</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>Skip the weeding and messy ink. We do the printing, you do the pressing. All you need is a heat press (or a home iron for smaller designs) to create professional-grade apparel.</p>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Shipped Right to You</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>We package your sheets securely and ship them directly to your door anywhere in the US. (Note: standard shipping rates apply).</p>
                    </div>

                    <div className="cta-box text-center" style={{ background: 'var(--primary-color)', color: '#fff', padding: '40px', borderRadius: '12px' }}>
                        <h3 style={{ marginBottom: '15px' }}>Ready to get pressing?</h3>
                        <p style={{ marginBottom: '25px' }}>Send us your designs and we'll print your DIY sheets.</p>
                        <Link to="/request-quote" className="btn" style={{ background: '#fff', color: 'var(--primary-color)' }}>
                            Request a Quote
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
