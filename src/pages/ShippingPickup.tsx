import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function ShippingPickup() {
    return (
        <Layout>
            <SEO
                title="Shipping & Local Pickup | PrintFlow Studio"
                description="Information regarding local pickup in Chattanooga, TN and nationwide shipping options for custom shirts and DTF transfers from PrintFlow Studio."
                canonicalUrl="https://www.printflowstudio.com/shipping-pickup"
            />
            <div className="container section" style={{ paddingTop: "110px", maxWidth: "850px", margin: "0 auto" }}>
                <h1>Shipping &amp; Local Pickup</h1>
                <div style={{ marginTop: "30px", color: "var(--text-secondary)", lineHeight: "1.75" }}>
                    <p style={{ marginBottom: "20px" }}>
                        PrintFlow Studio serves both local customers across the Chattanooga area and customers ordering custom apparel and Direct-to-Film (DTF) transfers from across the United States.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>Chattanooga-Area Local Pickup</h2>
                    <p style={{ marginBottom: "20px" }}>
                        Local pickup is available by arrangement in the Chattanooga, Tennessee area (serving Hamilton County, Hixson, Cleveland, and surrounding communities). When requesting a <Link to="/request-quote" style={{ color: "var(--accent-color)" }}>custom quote</Link>, simply select <strong>"Chattanooga-area pickup"</strong> as your delivery preference. Once your order is printed and passes our quality check, we will contact you directly to coordinate a convenient pickup time.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>Nationwide Shipping</h2>
                    <p style={{ marginBottom: "20px" }}>
                        We ship custom printed T-shirts, business and event apparel, original shop designs, and ready-to-press DTF transfers nationwide across the U.S. Please verify that your shipping address is complete and accurate at checkout or when confirming your custom quote.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>Production Schedules vs. Transit Times</h2>
                    <p style={{ marginBottom: "20px" }}>
                        Because our custom shirts and transfers are made to order, production timing depends on your order size, garment selection, and whether your artwork is print-ready. Please note that production time is separate from carrier transit time. If you are ordering for a specific event date, include your needed-by date in our <Link to="/request-quote" style={{ color: "var(--accent-color)" }}>quote form</Link> so we can confirm a realistic schedule before you order.
                    </p>
                </div>
            </div>
        </Layout>
    );
}
