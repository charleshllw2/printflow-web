import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import { PRICING_OFFERS } from "../../data/businessSettings";

export default function CustomTShirts() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Custom T-Shirt Printing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PrintFlow Studio"
    },
    "areaServed": {
      "@type": "City",
      "name": "Chattanooga"
    },
    "description": "Custom T-Shirt printing services in Chattanooga. Single shirts to bulk orders."
  });

  return (
    <Layout>
      <SEO
        title="Custom T-Shirt Printing Chattanooga TN | PrintFlow Studio"
        description="Custom T-shirt printing in Chattanooga, TN. No complicated ordering—from one single shirt to group orders for businesses, churches, reunions, and events."
        canonicalUrl="https://www.printflowstudio.com/custom-t-shirts-chattanooga"
        schema={schema}
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">PRINTFLOW STUDIO SERVICES</p>
            <h1>Custom T-Shirt Printing in Chattanooga, TN</h1>
            <p className="hero-support">We turn your logo, artwork, or idea into custom apparel you will be proud to wear. Whether you need a single special shirt or matching apparel for your entire organization, we make the printing process simple.</p>
            <div className="hero-ctas mt-4" style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/request-quote" className="btn btn-primary">Get a Custom Quote</Link>
              <Link to="/our-work" className="btn btn-outline">See Printed Examples</Link>
            </div>
          </div>
        </section>

        <section className="seo-process section bg-secondary">
          <div className="container">
            <h2>How Ordering Works</h2>
            <p style={{ maxWidth: '720px', margin: '0 auto 36px', textAlign: 'center', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Want the full breakdown from file submission to pickup day? Read our <Link to="/blog/how-custom-shirt-orders-work">Step-by-Step Custom Order Guide</Link>.
            </p>
            <div className="process-grid">
              <div className="process-step">
                <h3>1. Tell Us Your Idea</h3>
                <p>Fill out our quote form to let us know how many shirts you need, your target needed-by date, and upload any artwork or logos you have.</p>
              </div>
              <div className="process-step">
                <h3>2. Review Your Proof</h3>
                <p>We check your artwork resolution and sizing, help select the right blank garment, and provide a clear written quote and digital mockup.</p>
              </div>
              <div className="process-step">
                <h3>3. We Print It</h3>
                <p>Once approved, your shirts are printed in full color using Direct-to-Film technology right here in Chattanooga.</p>
              </div>
              <div className="process-step">
                <h3>4. Pick Up or Ship</h3>
                <p>Coordinate local pickup by arrangement in the Chattanooga area, or have your completed order shipped directly to your door.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="seo-faqs section">
          <div className="container">
            <h2>Common Questions About Custom Shirts</h2>

            <div className="faq-grid">
              <div className="faq-item">
                <h3>Can you make one shirt?</h3>
                <p>Yes. While we regularly handle group orders for businesses and events, we also print <Link to="/custom-shirts-no-minimum-chattanooga">single custom shirts</Link> with no minimum order requirement on standard tees.</p>
              </div>

              <div className="faq-item">
                <h3>How much does it cost?</h3>
                <p>Custom shirts start at ${PRICING_OFFERS.customShirtStartingPrice.toFixed(2)} for a standard tee. Final pricing depends on the blank garment chosen, quantity, and print locations (e.g., front only vs. front and back). <Link to="/request-quote">Request a quote for exact pricing.</Link></p>
              </div>

              <div className="faq-item">
                <h3>Can you print my logo in full color?</h3>
                <p>Yes. Full-color logos, shading, and fine details print cleanly without per-color screen setup fees. Check our <Link to="/blog/how-to-prepare-artwork-for-dtf-printing">Artwork Prep Guide</Link> for file tips.</p>
              </div>

              <div className="faq-item">
                <h3>What print size should I ask for?</h3>
                <p>Left-chest logos are typically ~4&quot; wide, youth fronts ~8&quot; wide, and adult standard chest/back prints ~10–11&quot; wide. See our <Link to="/blog/choosing-the-right-shirt-print-size">Print Size Guide</Link>.</p>
              </div>

              <div className="faq-item">
                <h3>Can I mix sizes and shirt colors?</h3>
                <p>Yes, you can mix and match sizes (Youth and Adult S–3XL where available) and garment colors within the same custom order.</p>
              </div>

              <div className="faq-item">
                <h3>How do I wash custom printed shirts?</h3>
                <p>Turn inside out, machine wash cold with mild detergent, skip bleach and liquid softener, and tumble dry low or hang dry. Read our <Link to="/blog/caring-for-dtf-printed-apparel">DTF Care Guide</Link>.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="seo-cta section bg-secondary" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2>Ready to Make Your Shirt?</h2>
            <p style={{ margin: '20px auto', maxWidth: '600px', color: 'var(--text-secondary)' }}>Tell us what garments and quantities you need, include your target date, and we will put together a clear quote.</p>
            <Link to="/request-quote" className="btn btn-primary">Start My Order</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
