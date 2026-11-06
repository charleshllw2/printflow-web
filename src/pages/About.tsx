import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { BUSINESS_INFO, PRICING_OFFERS } from "../data/businessSettings";

export default function About() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About PrintFlow Studio | Chattanooga Custom Apparel & DTF Printing",
    "description": "Learn about PrintFlow Studio, a Chattanooga-based custom apparel and Direct-to-Film (DTF) printing business built on over 20 years of business and customer-service experience.",
    "url": "https://www.printflowstudio.com/about"
  });

  return (
    <Layout>
      <SEO
        title="About PrintFlow Studio | Chattanooga Custom Apparel & DTF Printing"
        description="Learn about PrintFlow Studio in Chattanooga, TN. We specialize in custom T-shirts, business apparel, and ready-to-press DTF transfers with personal service."
        canonicalUrl="https://www.printflowstudio.com/about"
        schema={schema}
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">ABOUT PRINTFLOW STUDIO</p>
            <h1>Built in Chattanooga. Made Personal.</h1>
            <p className="hero-support">
              When you order from PrintFlow Studio, your project isn&apos;t disappearing into an anonymous production queue. We work directly with individuals, businesses, churches, reunions, teams, and event organizers to turn ideas, logos, and artwork into custom apparel they are proud to wear.
            </p>
            <div className="hero-ctas mt-4" style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/request-quote" className="btn btn-primary">Request a Custom Quote</Link>
              <Link to="/our-work" className="btn btn-outline">View Our Work</Link>
            </div>
          </div>
        </section>

        <section className="section bg-secondary">
          <div className="container" style={{ maxWidth: "900px" }}>
            <h2>Who We Are</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-secondary)", marginTop: "20px", marginBottom: "20px" }}>
              PrintFlow Studio is a custom T-shirt and Direct-to-Film (DTF) printing studio based in {BUSINESS_INFO.primaryMarket}. While PrintFlow Studio is a growing custom apparel brand, the foundation behind the business is built on decades of practical experience. Owner {BUSINESS_INFO.ownerName} brings more than 20 years of business ownership and customer-service experience to every order.
            </p>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "20px" }}>
              We started with a straightforward goal: custom shirts shouldn&apos;t be complicated. Too often, customers who want a single personalized shirt for a birthday or a small run of uniform shirts for a local crew are turned away by high order minimums or confusing setup fees. At the same time, larger groups—like churches, family reunions, schools, and community events—need clear communication, reliable sizing options, and vibrant prints that hold up wash after wash.
            </p>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-secondary)" }}>
              Whether you are ordering one custom tee starting at ${PRICING_OFFERS.customShirtStartingPrice.toFixed(2)}, a {PRICING_OFFERS.businessStarterPackQty}-shirt Business Starter Pack starting at ${PRICING_OFFERS.businessStarterPackStartingPrice}, or ready-to-press DTF transfers for your own heat press, every project receives attentive artwork checks and quality verification before it leaves our hands.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 style={{ textAlign: "center", marginBottom: "40px" }}>What We Make</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Custom T-Shirts &amp; Everyday Apparel</h3>
                <p>
                  We print custom T-shirts, long-sleeve tees, hoodies, and crewneck sweatshirts in full color. Because our standard custom shirts have no minimum order requirement, you can order a single shirt for a gift or outfit an entire organization. Explore our <Link to="/custom-t-shirts-chattanooga">custom T-shirt printing</Link> and <Link to="/custom-apparel-chattanooga">custom apparel</Link> services.
                </p>
              </div>
              <div className="faq-item">
                <h3>Branded Business &amp; Work Apparel</h3>
                <p>
                  We help local companies look unified on the job site, in the office, or at trade shows. Our <Link to="/business-shirts-chattanooga">business apparel service</Link> reproduces detailed, multi-color company logos without per-color screen setup fees, and allows flexible sizing across your crew.
                </p>
              </div>
              <div className="faq-item">
                <h3>Church, Reunion, Team &amp; Event Shirts</h3>
                <p>
                  From youth retreats and volunteer teams to family reunions, charity 5Ks, and school spirit wear, we produce matching group apparel tailored to your occasion. Learn more about our <Link to="/church-shirts-chattanooga">church shirts</Link>, <Link to="/team-shirts-chattanooga">team shirts</Link>, and <Link to="/event-shirts-chattanooga">event shirts</Link>.
                </p>
              </div>
              <div className="faq-item">
                <h3>Ready-to-Press DTF Transfers &amp; Original Designs</h3>
                <p>
                  For creators, small apparel brands, and heat-press owners, we supply commercial-grade <Link to="/dtf-transfers-chattanooga">custom DTF transfers</Link> and <Link to="/dtf-transfers">premade transfer designs</Link> (from 4-inch pocket prints to oversized graphics) as well as original tees in our <Link to="/shop">online design shop</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="seo-process section bg-secondary">
          <div className="container">
            <h2>How Custom Orders Work</h2>
            <p style={{ maxWidth: "750px", margin: "0 auto 40px", color: "var(--text-secondary)", textAlign: "center", lineHeight: "1.6" }}>
              We keep our custom ordering workflow transparent from your first message to final pickup or delivery. Production only begins after you have reviewed and approved your project details. Read our full <Link to="/blog/how-custom-shirt-orders-work">Custom Order Walkthrough</Link>.
            </p>
            <div className="process-grid">
              <div className="process-step">
                <h3>1. Share Your Idea or Artwork</h3>
                <p>
                  Use our <Link to="/request-quote">online quote form</Link> to tell us how many shirts you need, what the project is for, where you want the design printed (front, back, or sleeves), and your target needed-by date.
                </p>
              </div>
              <div className="process-step">
                <h3>2. Artwork Check &amp; Preparation</h3>
                <p>
                  We check your file against our <Link to="/file-guidelines">file guidelines</Link>—verifying transparent backgrounds, resolution (300 DPI recommended), and <Link to="/blog/choosing-the-right-shirt-print-size">print dimensions</Link>. If your file needs adjustments, we offer artwork support to get it print-ready.
                </p>
              </div>
              <div className="process-step">
                <h3>3. Quote &amp; Proof Review</h3>
                <p>
                  We follow up with clear, upfront pricing, garment recommendations, and a digital mockup or proof where applicable so you can confirm every detail before payment and production.
                </p>
              </div>
              <div className="process-step">
                <h3>4. Printing, Quality Check &amp; Delivery</h3>
                <p>
                  Once approved, your designs are printed using vibrant Direct-to-Film technology and heat-pressed onto your chosen garments. Completed orders are checked for quality and prepared for Chattanooga-area pickup by arrangement or nationwide shipping.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ maxWidth: "900px" }}>
            <h2>Areas We Serve</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-secondary)", marginTop: "20px", marginBottom: "20px" }}>
              PrintFlow Studio is proudly based in <strong>Chattanooga, Tennessee</strong>. We serve local customers throughout <strong>Hamilton County</strong> and surrounding communities, including <strong>Hixson</strong> and <strong>Cleveland, TN</strong>. For local customers, Chattanooga-area pickup is available by arrangement so you can receive your custom shirts or transfers without waiting on carrier transit times.
            </p>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "25px" }}>
              Outside of the Chattanooga area? We also ship our custom printed apparel, original graphic tees, and ready-to-press DTF transfers <strong>nationwide across the United States</strong>. See our <Link to="/shipping-pickup">shipping and local pickup policy</Link> and <Link to="/faq">frequently asked questions</Link> for additional details.
            </p>
            <div style={{ padding: "25px", background: "var(--bg-secondary)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <h3 style={{ marginBottom: "10px" }}>Direct Contact Information</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "8px" }}>
                <strong>Location:</strong> {BUSINESS_INFO.primaryMarket} (local pickup by arrangement)
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "8px" }}>
                <strong>Phone:</strong> <a href={BUSINESS_INFO.phoneHref} style={{ color: "var(--accent-color)" }}>{BUSINESS_INFO.phone}</a>
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                <strong>Email:</strong> <a href={BUSINESS_INFO.emailHref} style={{ color: "var(--accent-color)" }}>{BUSINESS_INFO.email}</a>
              </p>
            </div>
          </div>
        </section>

        <section className="seo-cta section bg-secondary" style={{ textAlign: "center" }}>
          <div className="container">
            <h2>Ready to Start Your Custom Apparel Project?</h2>
            <p style={{ margin: "20px auto", maxWidth: "650px", color: "var(--text-secondary)" }}>
              Whether you have a print-ready logo or just an idea for a shirt, tell us about your project or browse our practical <Link to="/blog">printing guides</Link> to get started.
            </p>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/request-quote" className="btn btn-primary">Start My Quote</Link>
              <Link to="/shop" className="btn btn-outline">Browse the Shop</Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
