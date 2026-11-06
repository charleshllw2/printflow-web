import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function SportsTeamShirts() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Custom Team Shirts & Spirit Wear",
    "provider": {
      "@type": "LocalBusiness",
      "name": "PrintFlow Studio"
    },
    "areaServed": {
      "@type": "City",
      "name": "Chattanooga"
    },
    "description": "Custom team shirts, club apparel, and school spirit wear in Chattanooga, TN."
  });

  return (
    <Layout>
      <SEO
        title="Custom Team Shirts & Spirit Wear Chattanooga | PrintFlow Studio"
        description="Custom team shirts, club apparel, and spirit wear for Chattanooga schools and organizations. High-quality prints that last the whole season."
        canonicalUrl="https://www.printflowstudio.com/team-shirts-chattanooga"
        schema={schema}
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">TEAM &amp; CLUB APPAREL</p>
            <h1>Matching Custom Team Shirts</h1>
            <p className="hero-support">Outfit your sports team, academic club, or organization with premium custom apparel that unifies your group and looks great all season long.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Quote Team Shirts</Link>
          </div>
        </section>

        <section className="seo-faqs section bg-secondary">
          <div className="container">
            <h2>Built for Teams, Schools &amp; Local Clubs</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Works on Cotton, Blends &amp; Polyester</h3>
                <p>Our Direct-to-Film (DTF) transfers bond cleanly to 100% cotton tees, 50/50 blends, and 100% polyester athletic shirts—ideal for warm-ups, practice tees, and sideline gear.</p>
              </div>
              <div className="faq-item">
                <h3>School Spirit Wear &amp; Booster Clubs</h3>
                <p>Create matching t-shirts, long sleeves, and hoodies for players, parents, and fans. Full-color printing captures mascots and school crests in sharp detail.</p>
              </div>
              <div className="faq-item">
                <h3>Flexible Roster &amp; Club Quantities</h3>
                <p>Whether you are outfitting a small robotics club, a rec league roster, or an entire school band, you only need to order the exact sizes your group requires.</p>
              </div>
              <div className="faq-item">
                <h3>Organize Your Team Order Easily</h3>
                <p>Read our practical guide on <Link to="/blog/how-to-plan-custom-shirts-for-church-team-or-event">How to Plan Custom Shirts for a Church, Team, or Event</Link> for tips on collecting sizes and reviewing proofs.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="seo-cta section" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2>Outfit Your Team or Club</h2>
            <p style={{ margin: '20px auto', maxWidth: '600px', color: 'var(--text-secondary)' }}>Upload your team logo or mascot idea and let us put together a custom quote.</p>
            <Link to="/request-quote" className="btn btn-primary">Start Team Order</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
