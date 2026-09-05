import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ServicesGrid from "../components/ServicesGrid";
import OrderOptions from "../components/OrderOptions";

export default function Services() {
    return (
        <Layout>
            <SEO 
                title="Our Services | PrintFlow Studio Chattanooga" 
                description="Explore our custom apparel services, DTF transfers, DIY print sheets, and business apparel options at PrintFlow Studio."
            />
            <div className="section bg-light text-center" style={{ paddingTop: '100px', paddingBottom: '40px' }}>
                <div className="container">
                    <h1>Our Services</h1>
                    <p className="subtitle" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                        From local custom apparel orders to nationwide DTF transfers, we have you covered.
                    </p>
                </div>
            </div>
            
            <OrderOptions />
            <div style={{ paddingBottom: '40px' }}></div>
            <ServicesGrid />
        </Layout>
    );
}
