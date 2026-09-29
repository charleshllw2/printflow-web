import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

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
        description="Make your Chattanooga business look like a brand. Premium custom logo shirts, uniform tees, and business apparel. Starter packs of 10 shirts from $199."
        canonicalUrl="https://www.printflowstudio.com/business-shirts-chattanooga"
        schema={schema}
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">CHATTANOOGA BUSINESS APPAREL</p>
            <h1>Make Your Business Look Like a Brand</h1>
            <p className="hero-support">Professional branded apparel for your employees, crews, and company events. We take your company logo and turn it into high-quality custom shirts your team will actually want to wear.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Quote My Business Shirts</Link>
          </div>
        </section>

        <section className="starter-pack-feature section bg-secondary" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-color)', marginBottom: '15px' }}>THE BUSINESS STARTER PACK</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>10 Custom Logo Shirts Starting at $199</p>
            <p style={{ maxWidth: '600px', margin: '0 auto 30px', color: 'var(--text-secondary)' }}>Perfect for small businesses, new crews, or seasonal events. Get a consistent, professional look without having to order hundreds of shirts at once.</p>
            <Link to="/request-quote?service=business_starter_pack" className="btn btn-outline">Claim Starter Pack</Link>
          </div>
        </section>

        <section className="seo-faqs section">
          <div className="container">
            <h2>Why Businesses Choose PrintFlow Studio</h2>
            
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Vibrant Full-Color Logos</h3>
                <p>Unlike traditional screen printing that limits colors or charges per color, our DTF printing technology allows your company logo to be printed in vibrant, photorealistic full color with no extra setup fees per color.</p>
              </div>
              <div className="faq-item">
                <h3>Flexible Employee Sizing</h3>
                <p>Order exactly what your crew needs. Mix and match sizes from Small to 3XL so every employee gets a shirt that fits them perfectly.</p>
              </div>
              <div className="faq-item">
                <h3>Durability for the Job</h3>
                <p>We use high-quality apparel and commercial-grade transfers designed to withstand the wear and tear of daily work environments.</p>
              </div>
              <div className="faq-item">
                <h3>Easy Reordering</h3>
                <p>Once we have your logo perfectly dialed in, ordering shirts for new hires is incredibly simple and fast.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="seo-cta section bg-secondary" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2>Outfit Your Team Today</h2>
            <p style={{ margin: '20px auto', maxWidth: '600px', color: 'var(--text-secondary)' }}>Upload your company logo and let us know how many shirts you need.</p>
            <Link to="/request-quote" className="btn btn-primary">Start Business Order</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
