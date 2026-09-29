import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function ChurchShirts() {
  return (
    <Layout>
      <SEO 
        title="Custom Church Shirts & Ministry Apparel Chattanooga | PrintFlow Studio" 
        description="Premium custom shirts for Chattanooga churches, ministries, youth groups, and volunteer teams. Simple ordering process and flexible quantities."
        canonicalUrl="https://www.printflowstudio.com/church-shirts-chattanooga"
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">CHURCH & MINISTRY APPAREL</p>
            <h1>Custom Church Shirts for Every Ministry</h1>
            <p className="hero-support">From youth group retreats and volunteer teams to special events and congregation merch, we help Chattanooga churches create high-quality apparel without the stress.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Start Church Order</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
