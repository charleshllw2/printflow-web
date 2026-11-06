import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function CustomApparel() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Custom Apparel Printing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PrintFlow Studio"
    },
    "areaServed": {
      "@type": "City",
      "name": "Chattanooga"
    },
    "description": "Custom printed hoodies, crewneck sweatshirts, long-sleeve tees, and branded apparel in Chattanooga, TN."
  });

  return (
    <Layout>
      <SEO
        title="Custom Apparel & Merch Chattanooga | PrintFlow Studio"
        description="Premium custom apparel printing in Chattanooga. We print hoodies, crewnecks, long sleeves, and more for businesses, brands, and organizations."
        canonicalUrl="https://www.printflowstudio.com/custom-apparel-chattanooga"
        schema={schema}
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">BEYOND T-SHIRTS</p>
            <h1>Premium Custom Apparel</h1>
            <p className="hero-support">We print more than just tees. Outfit your team or build your brand with custom printed hoodies, crewneck sweatshirts, long sleeves, and premium garments.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Quote Custom Apparel</Link>
          </div>
        </section>

        <section className="seo-faqs section bg-secondary">
          <div className="container">
            <h2>Apparel Options for Every Season &amp; Brand</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Hoodies &amp; Crewneck Sweatshirts</h3>
                <p>Heavyweight and midweight fleece garments that hold vibrant chest, back, and sleeve prints—great for fall outdoor crews, school spirit wear, and creator merch.</p>
              </div>
              <div className="faq-item">
                <h3>Long-Sleeve Tees &amp; Layering Pieces</h3>
                <p>Combine front left-chest branding with full back graphics or sleeve prints for workwear, restaurants, and local clubs.</p>
              </div>
              <div className="faq-item">
                <h3>Mix Garment Styles in One Order</h3>
                <p>Using the same artwork across T-shirts, long sleeves, and hoodies is simple with Direct-to-Film printing. Compare methods in our guide: <Link to="/blog/dtf-transfers-vs-screen-printing">DTF Transfers vs. Screen Printing</Link>.</p>
              </div>
              <div className="faq-item">
                <h3>Chattanooga Pickup or Nationwide Delivery</h3>
                <p>All custom apparel is inspected for print quality and available for local pickup in the Chattanooga area or shipped nationwide. View <Link to="/our-work">examples of our work</Link>.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="seo-cta section" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2>Ready to Customize Your Apparel?</h2>
            <p style={{ margin: '20px auto', maxWidth: '600px', color: 'var(--text-secondary)' }}>Tell us which garment styles and print placements you have in mind.</p>
            <Link to="/request-quote" className="btn btn-primary">Request an Apparel Quote</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
