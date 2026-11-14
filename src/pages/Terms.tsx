import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function Terms() {
    return (
        <Layout>
            <SEO
                title="Terms & Conditions | PrintFlow Studio"
                description="Terms and Conditions for ordering custom printed apparel, DTF transfers, and original graphic tees from PrintFlow Studio in Chattanooga, TN."
                canonicalUrl="https://www.printflowstudio.com/terms"
            />
            <div className="container section" style={{ paddingTop: "110px", maxWidth: "850px", margin: "0 auto" }}>
                <h1>Terms &amp; Conditions</h1>
                <div style={{ marginTop: "30px", color: "var(--text-secondary)", lineHeight: "1.75" }}>
                    <p style={{ marginBottom: "20px" }}>
                        By accessing <a href="https://www.printflowstudio.com" style={{ color: "var(--accent-color)" }}>www.printflowstudio.com</a>, requesting a custom quote, or purchasing products from PrintFlow Studio, you agree to the following Terms and Conditions.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>1. Custom Orders &amp; Proof Approval</h2>
                    <p style={{ marginBottom: "20px" }}>
                        For custom printed shirts and apparel, we provide pricing and project details—and a digital mockup or proof where applicable—before production starts. Customers are responsible for reviewing all spelling, dates, colors, print placements, and garment size breakdowns prior to approving an order. Production begins only after your approval and payment are received.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>2. Artwork Quality &amp; Permissions</h2>
                    <p style={{ marginBottom: "20px" }}>
                        Print quality depends on the quality of the submitted artwork file. Please review our <Link to="/file-guidelines" style={{ color: "var(--accent-color)" }}>Artwork &amp; File Guidelines</Link> for resolution (300 DPI recommended) and transparent background requirements. By submitting a logo, graphic, or text design to PrintFlow Studio, you confirm that you hold the necessary rights or permission to reproduce the artwork, as detailed in our <Link to="/artwork-policy" style={{ color: "var(--accent-color)" }}>Artwork &amp; Copyright Policy</Link>.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>3. Ready-to-Press DTF Transfers</h2>
                    <p style={{ marginBottom: "20px" }}>
                        When ordering ready-to-press Direct-to-Film (DTF) transfers without garments, you are purchasing the printed transfer film only. Proper application requires a heat press capable of maintaining consistent temperature (approximately 300°F–320°F) and medium-to-heavy pressure. PrintFlow Studio is not responsible for garments or transfers damaged by improper home ironing or incorrect pressing settings.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>4. Pricing, Shipping, Pickup &amp; Returns</h2>
                    <p style={{ marginBottom: "20px" }}>
                        All prices on our website are listed in U.S. Dollars (USD). Information regarding Chattanooga-area pickup and nationwide delivery can be found on our <Link to="/shipping-pickup" style={{ color: "var(--accent-color)" }}>Shipping &amp; Local Pickup</Link> page. Because custom apparel and made-to-order items are produced specifically for each customer, return eligibility is governed by our <Link to="/returns" style={{ color: "var(--accent-color)" }}>Returns, Refunds &amp; Custom Orders Policy</Link>.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>5. Contact Information</h2>
                    <p style={{ marginBottom: "20px" }}>
                        Questions regarding these Terms and Conditions may be directed to PrintFlow Studio at <a href="mailto:hello@printflowstudio.com" style={{ color: "var(--accent-color)" }}>hello@printflowstudio.com</a> or <a href="tel:+14235583692" style={{ color: "var(--accent-color)" }}>(423) 558-3692</a>.
                    </p>
                </div>
            </div>
        </Layout>
    );
}
