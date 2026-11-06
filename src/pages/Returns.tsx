import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { BUSINESS_INFO, FULFILLMENT_POLICY } from "../data/businessSettings";

export default function Returns() {
    return (
        <Layout>
            <SEO
                title="Returns, Refunds & Custom Orders Policy | PrintFlow Studio"
                description="Read PrintFlow Studio's return, replacement, and order approval policies for custom printed shirts, ready-made shop apparel, and DTF transfers."
                canonicalUrl="https://www.printflowstudio.com/returns"
            />
            <div className="container section" style={{ paddingTop: "110px", maxWidth: "850px", margin: "0 auto" }}>
                <h1>Returns, Refunds &amp; Custom Orders</h1>
                <div style={{ marginTop: "30px", color: "var(--text-secondary)", lineHeight: "1.75" }}>
                    <p style={{ marginBottom: "20px" }}>
                        {FULFILLMENT_POLICY.returnsSummary} Below is how order approvals, size checks, and damaged or defective replacements are handled at {BUSINESS_INFO.name}.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>
                        1. Custom Apparel &amp; Proof Approval
                    </h2>
                    <p style={{ marginBottom: "20px" }}>
                        Custom shirts, business uniforms, and group apparel are printed specifically to your approved specifications. Production begins only after payment is received and your final order details and digital mockup/proof (where applicable) are approved. Because personalized items cannot be restocked, we cannot accept returns or exchanges for buyer&apos;s remorse, customer-approved spelling errors, or ordering incorrect sizes once production has started.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>
                        2. Ready-Made Shop Tees &amp; Ready-to-Press DTF Transfers
                    </h2>
                    <p style={{ marginBottom: "20px" }}>
                        Apparel in our <Link to="/shop" style={{ color: "var(--accent-color)" }}>Ready-Made Shop</Link> and films in our <Link to="/dtf-transfers" style={{ color: "var(--accent-color)" }}>Ready-to-Press DTF Transfers</Link> catalog are also produced to order rather than pulled from pre-printed clearance stock. Please review sizing information before ordering, and note that ready-to-press DTF transfers require a commercial heat press—transfers or customer-supplied blanks damaged by household irons or improper heat-press settings are not eligible for refund.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>
                        3. Damaged, Defective, or Misprinted Items
                    </h2>
                    <p style={{ marginBottom: "20px" }}>
                        We stand behind our print workmanship. If an item arrives damaged in transit, has a manufacturing defect in the blank garment, or differs materially from the proof you approved due to a production error on our part, please contact us within <strong>7 days of pickup or delivery</strong> at{" "}
                        <a href={BUSINESS_INFO.emailHref} style={{ color: "var(--accent-color)" }}>{BUSINESS_INFO.email}</a>{" "}
                        with your order details and clear photos of the issue. Once verified, we will arrange a reprint/replacement or appropriate refund.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>
                        4. Cancellations Before Production
                    </h2>
                    <p style={{ marginBottom: "20px" }}>
                        If you need to update a size count or cancel an order before blank garments have been ordered or printing has begun, contact us immediately at{" "}
                        <a href={BUSINESS_INFO.phoneHref} style={{ color: "var(--accent-color)" }}>{BUSINESS_INFO.phone}</a>{" "}
                        or <a href={BUSINESS_INFO.emailHref} style={{ color: "var(--accent-color)" }}>{BUSINESS_INFO.email}</a> and we will do our best to accommodate the change.
                    </p>
                </div>
            </div>
        </Layout>
    );
}
