import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import { PRICING_OFFERS } from "../../data/businessSettings";

export default function BusinessApparel() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Custom Business Apparel",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PrintFlow Studio"
    },
    "areaServed": {
      "@type": "City",
      "name": "Chattanooga"
    },
    "description": "Professional custom logo shirts and branded business apparel in Chattanooga."
  });

  return (
    <Layout>
      <SEO
        title="Custom Business Shirts & Logo Apparel Chattanooga | PrintFlow Studio"
        description={`Make your Chattanooga business look like a brand. Custom logo shirts, crew uniform tees, and business apparel. Starter packs of ${PRICING_OFFERS.businessStarterPackQty} shirts starting at $${PRICING_OFFERS.businessStarterPackStartingPrice}.`}
        canonicalUrl="https://www.printflowstudio.com/business-shirts-chattanooga"
        schema={schema}
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">CHATTANOOGA BUSINESS APPAREL</p>
            <h1>Make Your Business Look Like a Brand</h1>
            <p className="hero-support">Professional branded apparel for your employees, field crews, and company events. We turn your company logo into clean, durable custom work shirts your team will actually want to wear.</p>
            <Link to="/request-quote?service=business-apparel" className="btn btn-primary mt-4">Quote My Business Shirts</Link>
          </div>
        </section>

        <section className="starter-pack-feature section bg-secondary" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-color)', marginBottom: '15px' }}>THE BUSINESS STARTER PACK</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
              {PRICING_OFFERS.businessStarterPackQty} Custom Logo Shirts Starting at ${PRICING_OFFERS.businessStarterPackStartingPrice}
            </p>
            <p style={{ maxWidth: '640px', margin: '0 auto 30px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Ideal for small businesses, service crews, contractors, cafés, and local shops. Get a consistent, professional look across mixed adult sizes without having to order 50 or 100 shirts at once.
            </p>
            <Link to="/request-quote?service=business_starter_pack" className="btn btn-outline">Request Business Starter Pack</Link>
          </div>
        </section>

        <section className="seo-faqs section">
          <div className="container">
            <h2>Why Local Businesses Work With PrintFlow Studio</h2>

            <div className="faq-grid">
              <div className="faq-item">
                <h3>Full-Color Company Logos</h3>
                <p>Unlike traditional screen printing that charges per ink color, DTF printing reproduces multi-color company logos, gradients, and taglines cleanly without per-color screen fees. Compare methods in our <Link to="/blog/dtf-transfers-vs-screen-printing">DTF vs. Screen Printing Guide</Link>.</p>
              </div>
              <div className="faq-item">
                <h3>Left-Chest, Full-Back &amp; Sleeve Placement</h3>
                <p>Pair a clean 3.5&quot;–4&quot; left-chest logo with a bold back print featuring your phone number or services. Read our <Link to="/blog/choosing-the-right-shirt-print-size">Print Size Guide</Link> for layout tips.</p>
              </div>
              <div className="faq-item">
                <h3>Flexible Crew Sizing</h3>
                <p>Order the exact size breakdown your crew needs today—mixing Small through 3XL—and reorder smaller batches later when new team members join.</p>
              </div>
              <div className="faq-item">
                <h3>Built for Repeated Washing</h3>
                <p>Commercial heat-pressed transfers flex with cotton, poly-blends, and workwear hoodies. Follow our <Link to="/blog/caring-for-dtf-printed-apparel">DTF Care Instructions</Link> to keep crew shirts sharp all season.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="seo-cta section bg-secondary" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2>Outfit Your Crew</h2>
            <p style={{ margin: '20px auto', maxWidth: '620px', color: 'var(--text-secondary)' }}>Upload your company logo (see our <Link to="/file-guidelines">Artwork Guidelines</Link>) and tell us how many shirts and print locations you need.</p>
            <Link to="/request-quote?service=business-apparel" className="btn btn-primary">Start Business Order</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
