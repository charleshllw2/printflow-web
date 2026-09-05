import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function PrivacyPolicy() {
    return (
        <Layout>
            <SEO title="Privacy Policy | PrintFlow Studio" description="PrintFlow Studio Privacy Policy." />
            <div className="container section" style={{ paddingTop: '100px', maxWidth: '800px', margin: '0 auto' }}>
                <h1>Privacy Policy</h1>
                <div style={{ marginTop: '30px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    <p>[OWNER TO INSERT FULL PRIVACY POLICY HERE]</p>
                    <p>This Privacy Policy describes how PrintFlow Studio collects, uses, and shares your personal information when you visit or make a purchase from our website or request a quote.</p>
                </div>
            </div>
        </Layout>
    );
}
