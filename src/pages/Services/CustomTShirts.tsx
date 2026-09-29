import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

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
        description="Premium custom T-shirt printing in Chattanooga. No complicated ordering. From one single shirt to bulk orders for your business or event. Get a fast quote today."
        canonicalUrl="https://www.printflowstudio.com/custom-t-shirts-chattanooga"
        schema={schema}
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">PRINTFLOW STUDIO SERVICES</p>
            <h1>Custom T-Shirt Printing in Chattanooga, TN</h1>
            <p className="hero-support">We turn your logo, artwork, or idea into premium custom apparel. Whether you need a single special shirt or matching apparel for your entire organization, we make the printing process simple.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Get a Custom Quote</Link>
          </div>
        </section>

        <section className="seo-process section bg-secondary">
          <div className="container">
            <h2>How Ordering Works</h2>
            <div className="process-grid">
              <div className="process-step">
                <h3>1. Tell Us Your Idea</h3>
                <p>Fill out our fast quote form to let us know how many shirts you need and upload any artwork or logos you have.</p>
              </div>
              <div className="process-step">
                <h3>2. Review Your Proof</h3>
                <p>We'll ensure your artwork is print-ready, help you choose the best garment, and provide a clear quote and mockup.</p>
              </div>
              <div className="process-step">
                <h3>3. We Print It</h3>
                <p>Your shirts are professionally printed using high-quality DTF technology right here in the Chattanooga area.</p>
              </div>
              <div className="process-step">
                <h3>4. Pick Up or Ship</h3>
                <p>Grab your order locally from our Chattanooga facility, or we can ship it directly to your door.</p>
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
                <p>Yes. While we regularly handle bulk orders for businesses, we proudly print single custom shirts. Your one special design still receives our professional printing process.</p>
              </div>
              
              <div className="faq-item">
                <h3>How much does it cost?</h3>
                <p>Custom shirts start at $27.99 for a standard tee. Final pricing depends on the specific garment chosen, quantity, and print locations (e.g., front and back). <Link to="/request-quote">Get a quote for exact pricing.</Link></p>
              </div>
              
              <div className="faq-item">
                <h3>Can you print my logo?</h3>
                <p>Absolutely. We regularly print highly detailed, full-color business and organizational logos. Just upload your highest resolution file (PNG, JPG, PDF, or SVG) when requesting a quote.</p>
              </div>
              
              <div className="faq-item">
                <h3>Can you print front and back?</h3>
                <p>Yes. We can print on the front, back, and even the sleeves of most garments.</p>
              </div>

              <div className="faq-item">
                <h3>Can I choose different sizes and colors?</h3>
                <p>Yes, you can mix and match sizes (S, M, L, XL, etc.) and shirt colors within the same order.</p>
              </div>

              <div className="faq-item">
                <h3>Can you help with my design?</h3>
                <p>If your artwork isn't perfectly print-ready, we will help optimize it for the best possible result before it goes to production.</p>
              </div>
              
              <div className="faq-item">
                <h3>What kinds of shirts can I choose?</h3>
                <p>We offer everything from standard economy tees to premium, ultra-soft fashion fits, hoodies, and crewnecks from top brands.</p>
              </div>
              
              <div className="faq-item">
                <h3>Can I pick it up locally or have it shipped?</h3>
                <p>Both! Local customers can pick up their orders in Chattanooga, or we can ship nationwide.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="seo-cta section bg-secondary" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2>Ready to Make Your Shirt?</h2>
            <p style={{ margin: '20px auto', maxWidth: '600px', color: 'var(--text-secondary)' }}>Get started in less than a minute. Tell us what you need and we'll send you pricing and a timeline.</p>
            <Link to="/request-quote" className="btn btn-primary">Start My Order</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
