import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import { PRICING_OFFERS } from "../../data/businessSettings";

export default function NoMinimumShirts() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "No-Minimum Custom Shirt Printing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PrintFlow Studio"
    },
    "areaServed": {
      "@type": "City",
      "name": "Chattanooga"
    },
    "description": "Single custom shirts and small-batch apparel printing in Chattanooga, TN with no minimum order requirement on standard tees."
  });

  return (
    <Layout>
      <SEO
        title="No-Minimum & Single Custom Shirts Chattanooga | PrintFlow Studio"
        description="Need just one custom shirt or a small batch? PrintFlow Studio prints full-color custom T-shirts in Chattanooga with no minimum order requirement on standard tees."
        canonicalUrl="https://www.printflowstudio.com/custom-shirts-no-minimum-chattanooga"
        schema={schema}
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">SMALL QUANTITY PRINTING</p>
            <h1>You Don&apos;t Need to Order 100 Shirts</h1>
            <p className="hero-support">Sometimes you just need one shirt for a birthday gift, or five shirts for a weekend trip or small crew. We offer flexible, no-minimum custom shirt printing without sacrificing full-color print quality.</p>
            <Link to="/request-quote?service=single-shirt" className="btn btn-primary mt-4">Start Small Order</Link>
          </div>
        </section>

        <section className="seo-faqs section bg-secondary">
          <div className="container">
            <h2>Why Small-Batch &amp; Single-Shirt Printing Works</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Single Custom Shirts Starting at ${PRICING_OFFERS.customShirtStartingPrice.toFixed(2)}</h3>
                <p>Because we print digitally using Direct-to-Film (DTF) technology rather than burning individual screens, your single custom tee receives the same vibrant, full-color quality as a larger production run.</p>
              </div>
              <div className="faq-item">
                <h3>Gifts, Birthdays &amp; Personal Ideas</h3>
                <p>Turn an inside joke, family milestone, or custom illustration into a wearable shirt. See <Link to="/blog/how-custom-shirt-orders-work">how our custom ordering process works</Link>.</p>
              </div>
              <div className="faq-item">
                <h3>Sample Runs &amp; Small Crews</h3>
                <p>Launching a small business or testing a new merch graphic? Print 1 to 9 shirts to verify <Link to="/blog/choosing-the-right-shirt-print-size">print sizing</Link> and garment feel before ordering in larger quantities.</p>
              </div>
              <div className="faq-item">
                <h3>Prepare Your Design for Best Results</h3>
                <p>Want your single shirt to look as crisp as possible? Read our guide on <Link to="/blog/how-to-prepare-artwork-for-dtf-printing">How to Prepare Artwork for DTF Printing</Link> or review our <Link to="/file-guidelines">file guidelines</Link>.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="seo-cta section" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2>Have an Idea for One Shirt (or a Few)?</h2>
            <p style={{ margin: '20px auto', maxWidth: '600px', color: 'var(--text-secondary)' }}>Upload your artwork or describe what you want to make in our quick quote form.</p>
            <Link to="/request-quote?service=single-shirt" className="btn btn-primary">Make My Custom Shirt</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
