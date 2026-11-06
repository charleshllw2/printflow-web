import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function ChurchShirts() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Custom Church & Ministry Shirts",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PrintFlow Studio"
    },
    "areaServed": {
      "@type": "City",
      "name": "Chattanooga"
    },
    "description": "Custom printed shirts and apparel for Chattanooga churches, ministries, youth retreats, and volunteer teams."
  });

  return (
    <Layout>
      <SEO
        title="Custom Church Shirts & Ministry Apparel Chattanooga | PrintFlow Studio"
        description="Premium custom shirts for Chattanooga churches, ministries, youth groups, and volunteer teams. Simple ordering process and flexible quantities."
        canonicalUrl="https://www.printflowstudio.com/church-shirts-chattanooga"
        schema={schema}
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">CHURCH &amp; MINISTRY APPAREL</p>
            <h1>Custom Church Shirts for Every Ministry</h1>
            <p className="hero-support">From youth group retreats and volunteer teams to special events and congregation merch, we help Chattanooga churches create high-quality apparel without the stress.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Start Church Order</Link>
          </div>
        </section>

        <section className="seo-faqs section bg-secondary">
          <div className="container">
            <h2>Apparel Tailored for Ministries &amp; Church Groups</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Volunteer &amp; Greeter Teams</h3>
                <p>Make it easy for first-time guests to spot your hospitality, parking, children's ministry, and production volunteers with clean, recognizable shirts.</p>
              </div>
              <div className="faq-item">
                <h3>Youth Retreats, Camps &amp; VBS</h3>
                <p>Full-color Direct-to-Film (DTF) printing lets you print vibrant camp themes and illustrations without paying extra per ink color, and mix youth and adult sizes in one order.</p>
              </div>
              <div className="faq-item">
                <h3>Outreach &amp; Community Service Days</h3>
                <p>Unify your congregation when serving across Chattanooga and Hamilton County. We can print on front, back, and sleeves for scripture verses or ministry names.</p>
              </div>
              <div className="faq-item">
                <h3>Simple Proof Approval &amp; Sizing</h3>
                <p>Not sure how to organize your group's size breakdown? Read our practical guide on <Link to="/blog/how-to-plan-custom-shirts-for-church-team-or-event">How to Plan Custom Shirts for a Church, Team, or Event</Link>.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="seo-cta section" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2>Ready to Plan Your Ministry Apparel?</h2>
            <p style={{ margin: '20px auto', maxWidth: '600px', color: 'var(--text-secondary)' }}>Tell us about your upcoming church event or volunteer team, and we will follow up with clear pricing and garment options.</p>
            <Link to="/request-quote" className="btn btn-primary">Request a Church Shirt Quote</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
