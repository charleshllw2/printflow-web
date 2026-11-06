import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function EventShirts() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Custom Event Shirt Printing",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PrintFlow Studio"
    },
    "areaServed": {
      "@type": "City",
      "name": "Chattanooga"
    },
    "description": "Custom printed shirts for family reunions, fundraisers, festivals, and community events in Chattanooga."
  });

  return (
    <Layout>
      <SEO
        title="Custom Event Shirts Chattanooga | PrintFlow Studio"
        description="Make your next Chattanooga event memorable with custom printed shirts. Perfect for family reunions, charity runs, festivals, and celebrations."
        canonicalUrl="https://www.printflowstudio.com/event-shirts-chattanooga"
        schema={schema}
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">CUSTOM EVENT APPAREL</p>
            <h1>Shirts to Remember Your Event</h1>
            <p className="hero-support">Family reunions, charity 5Ks, corporate retreats, and community festivals. We supply premium custom shirts that make your Chattanooga event truly memorable.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Quote Event Shirts</Link>
          </div>
        </section>

        <section className="seo-faqs section bg-secondary">
          <div className="container">
            <h2>Custom Shirts for Every Occasion</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Family Reunions &amp; Milestone Celebrations</h3>
                <p>Outfit the whole family from youth sizes up to adult 3XL. Because you can mix garment sizes and colors in the same order, every generation gets a comfortable fit.</p>
              </div>
              <div className="faq-item">
                <h3>Charity Walks, 5Ks &amp; Fundraisers</h3>
                <p>Print vibrant event graphics on the front and multi-color sponsor logos on the back without paying individual screen setup fees for each sponsor's logo.</p>
              </div>
              <div className="faq-item">
                <h3>Conferences, Festivals &amp; Local Gatherings</h3>
                <p>Distinguish staff, coordinators, and attendees by printing your event artwork on distinct shirt colors. Choose Chattanooga-area pickup or nationwide shipping.</p>
              </div>
              <div className="faq-item">
                <h3>Helpful Event Planning Resources</h3>
                <p>Organizing a group order for the first time? Check out our checklist on <Link to="/blog/how-to-plan-custom-shirts-for-church-team-or-event">How to Plan Custom Shirts for a Church, Team, or Event</Link>.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="seo-cta section" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2>Planning an Upcoming Event?</h2>
            <p style={{ margin: '20px auto', maxWidth: '600px', color: 'var(--text-secondary)' }}>Include your event date and estimated shirt count in our quote form so we can help you plan your order.</p>
            <Link to="/request-quote" className="btn btn-primary">Start My Event Quote</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
