import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function SportsTeamShirts() {
  return (
    <Layout>
      <SEO 
        title="Custom Team Shirts & Spirit Wear Chattanooga | PrintFlow Studio" 
        description="Custom team shirts, club apparel, and spirit wear for Chattanooga schools and organizations. High-quality prints that last the whole season."
        canonicalUrl="https://www.printflowstudio.com/team-shirts-chattanooga"
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">TEAM & CLUB APPAREL</p>
            <h1>Matching Custom Team Shirts</h1>
            <p className="hero-support">Outfit your sports team, academic club, or organization with premium custom apparel that unifies your group and looks great all season long.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Quote Team Shirts</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
