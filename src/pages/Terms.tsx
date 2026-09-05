import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function Terms() {
    return (
        <Layout>
            <SEO title="Terms & Conditions | PrintFlow Studio" description="PrintFlow Studio Terms and Conditions." />
            <div className="container section" style={{ paddingTop: '100px', maxWidth: '800px', margin: '0 auto' }}>
                <h1>Terms & Conditions</h1>
                <div style={{ marginTop: '30px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    <p>[OWNER TO INSERT FULL TERMS AND CONDITIONS HERE]</p>
                    <p>By accessing our website and ordering our services, you agree to these Terms and Conditions.</p>
                </div>
            </div>
        </Layout>
    );
}
