import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function EventShirts() {
  return (
    <Layout>
      <SEO 
        title="Custom Event Shirts Chattanooga | PrintFlow Studio" 
        description="Make your next Chattanooga event memorable with custom printed shirts. Perfect for family reunions, charity runs, festivals, and celebrations."
        canonicalUrl="https://www.printflowstudio.com/event-shirts-chattanooga"
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
      </main>
    </Layout>
  );
}
