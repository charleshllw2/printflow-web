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
    "description": "Ready-to-press custom DTF transfers for Chattanooga pickup by arrangement or nationwide shipping."
  });

  return (
    <Layout>
      <SEO
        title="Custom DTF Transfers Chattanooga | Ready-to-Press | PrintFlow Studio"
        description="Order custom Direct-to-Film (DTF) transfers from PrintFlow Studio. Full-color, ready-to-press designs for Chattanooga pickup by arrangement or nationwide shipping."
        canonicalUrl="https://www.printflowstudio.com/dtf-transfers-chattanooga"
        schema={schema}
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">CUSTOM DTF TRANSFERS</p>
            <h1>Custom Ready-to-Press DTF Transfers</h1>
            <p className="hero-support">Have your own commercial heat press? We print vibrant, full-color Direct-to-Film transfers from your artwork—ready to press onto cotton, polyester, blends, and fleece. Available for Chattanooga pickup by arrangement or nationwide shipping.</p>
            <div className="hero-ctas mt-4" style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/request-quote?service=dtf-transfers" className="btn btn-primary">Order Custom Transfers</Link>
              <Link to="/dtf-transfers" className="btn btn-outline">Browse Premade Transfer Designs</Link>
            </div>
          </div>
        </section>

        <section className="seo-faqs section bg-secondary">
          <div className="container">
            <h2>Understanding DTF Transfers</h2>

            <div className="faq-grid">
              <div className="faq-item">
                <h3>What is a DTF transfer?</h3>
                <p>Direct-to-Film (DTF) prints your design in full CMYK color onto release film backed by white ink and cured adhesive powder. You apply the finished transfer to blank garments using a commercial heat press (no blank shirt is included with transfer-only orders).</p>
              </div>
              <div className="faq-item">
                <h3>What fabrics do they work on?</h3>
                <p>DTF transfers bond reliably to 100% cotton, 100% polyester, 50/50 cotton/poly blends, tri-blends, canvas totes, and heavyweight fleece hoodies on both light and dark garment colors.</p>
              </div>
              <div className="faq-item">
                <h3>How should I prepare my artwork?</h3>
                <p>Export a 300 DPI PNG with a transparent background or a vector file (.svg, .ai, .pdf) cropped tightly to your design edges. Read our <Link to="/blog/how-to-prepare-artwork-for-dtf-printing">DTF Artwork Prep Guide</Link> and <Link to="/blog/choosing-the-right-shirt-print-size">Print Size Guide</Link>.</p>
              </div>
              <div className="faq-item">
                <h3>What are the pressing instructions?</h3>
                <p>Pre-press the garment for 5 seconds to remove moisture, press at ~300–320°F for 10–15 seconds with medium-to-heavy pressure, let cool completely before peeling (cold peel), then cover with parchment and press 5 seconds. Household irons are not recommended.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="seo-cta section" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2>Helpful DTF Printing Resources</h2>
            <p style={{ margin: '20px auto', maxWidth: '680px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              Explore our guides on <Link to="/blog/how-to-prepare-artwork-for-dtf-printing">Preparing Artwork for DTF Printing</Link>, <Link to="/blog/choosing-the-right-shirt-print-size">Choosing a Print Size</Link>, <Link to="/blog/caring-for-dtf-printed-apparel">Caring for DTF-Printed Apparel</Link>, and <Link to="/blog/dtf-transfers-vs-screen-printing">DTF Transfers vs. Screen Printing</Link>, or check our <Link to="/file-guidelines">Artwork &amp; File Guidelines</Link>.
            </p>
            <Link to="/request-quote?service=dtf-transfers" className="btn btn-primary">Request Custom Transfers</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
