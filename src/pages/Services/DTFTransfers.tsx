import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function DTFTransfers() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Direct-to-Film (DTF) Transfers",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PrintFlow Studio"
    },
    "description": "Ready-to-press custom DTF transfers for local pickup or nationwide shipping."
  });

  return (
    <Layout>
      <SEO 
        title="Custom DTF Transfers Chattanooga | Ready-to-Press | PrintFlow Studio" 
        description="Order premium custom Direct-to-Film (DTF) transfers. Full color, ready-to-press designs shipped nationwide or available for fast Chattanooga pickup."
        canonicalUrl="https://www.printflowstudio.com/dtf-transfers-chattanooga"
        schema={schema}
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">CUSTOM DTF TRANSFERS</p>
            <h1>Ready-to-Press DTF Transfers</h1>
            <p className="hero-support">Have your own heat press? We supply premium, vibrant, full-color Direct-to-Film transfers ready for you to press on any fabric. Available for fast Chattanooga pickup or nationwide shipping.</p>
            <div className="hero-ctas mt-4" style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <Link to="/dtf-transfers" className="btn btn-primary">Shop Standard Transfers</Link>
              <Link to="/request-quote" className="btn btn-outline">Order Custom Transfers</Link>
            </div>
          </div>
        </section>

        <section className="seo-faqs section bg-secondary">
          <div className="container">
            <h2>Understanding DTF Transfers</h2>
            
            <div className="faq-grid">
              <div className="faq-item">
                <h3>What is a DTF transfer?</h3>
                <p>Direct-to-Film (DTF) is a printing technique where your design is printed in full, vibrant color onto a special film, backed with an adhesive powder, and cured. The resulting transfer can be applied to garments using a commercial heat press.</p>
              </div>
              <div className="faq-item">
                <h3>What fabrics do they work on?</h3>
                <p>One of the biggest advantages of DTF is its versatility. Our transfers apply beautifully to 100% cotton, polyester, cotton/poly blends, tri-blends, spandex, and even nylon, across any color garment (light or dark).</p>
              </div>
              <div className="faq-item">
                <h3>How do I submit artwork?</h3>
                <p>Submit your artwork in PNG or SVG format with a transparent background. We recommend a minimum resolution of 300 DPI at the size you want it printed for crisp, professional results.</p>
              </div>
              <div className="faq-item">
                <h3>What are the pressing instructions?</h3>
                <p>While exact settings can vary slightly by heat press calibration, we generally recommend pressing at 300°F - 320°F for 10-15 seconds with medium-heavy pressure. Allow it to cool completely before peeling (cold peel), then press again for 5 seconds to lock it in.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
