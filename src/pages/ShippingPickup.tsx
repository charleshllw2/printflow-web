import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function ShippingPickup() {
    return (
        <Layout>
            <SEO title="Shipping & Local Pickup | PrintFlow Studio" description="Information regarding local pickup in Chattanooga and nationwide shipping options from PrintFlow Studio." />
            <div className="container section" style={{ paddingTop: '100px', maxWidth: '800px', margin: '0 auto' }}>
                <h1>Shipping & Local Pickup</h1>
                <div style={{ marginTop: '30px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    <p>[OWNER TO INSERT DETAILED SHIPPING AND PICKUP POLICIES HERE]</p>
                    <h3>Local Pickup</h3>
                    <p>Local pickup is available by arrangement in the Chattanooga area.</p>
                    <h3 style={{ marginTop: '20px' }}>Shipping</h3>
                    <p>We ship nationwide. Production times do not include transit times.</p>
                </div>
            </div>
        </Layout>
    );
}
