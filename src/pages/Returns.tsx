import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function Returns() {
    return (
        <Layout>
            <SEO title="Returns & Custom Orders | PrintFlow Studio" description="PrintFlow Studio policies for returns, refunds, and custom apparel orders." />
            <div className="container section" style={{ paddingTop: '100px', maxWidth: '800px', margin: '0 auto' }}>
                <h1>Returns, Refunds, & Custom Orders</h1>
                <div style={{ marginTop: '30px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    <p>[OWNER TO INSERT DETAILED RETURN AND REFUND POLICY HERE]</p>
                    <p>Because custom apparel is personalized, we typically cannot offer returns or exchanges unless the garment is defective or there was a production error on our part.</p>
                    <h3 style={{ marginTop: '20px' }}>Custom Order Process</h3>
                    <p>Production begins only after payment is received and your final artwork/mockup is approved. Please review all details carefully before approving your quote.</p>
                </div>
            </div>
        </Layout>
    );
}
