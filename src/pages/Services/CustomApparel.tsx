import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function CustomApparel() {
  return (
    <Layout>
      <SEO 
        title="Custom Apparel & Merch Chattanooga | PrintFlow Studio" 
        description="Premium custom apparel printing in Chattanooga. We print hoodies, crewnecks, long sleeves, and more for businesses, brands, and organizations."
        canonicalUrl="https://www.printflowstudio.com/custom-apparel-chattanooga"
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">BEYOND T-SHIRTS</p>
            <h1>Premium Custom Apparel</h1>
            <p className="hero-support">We print more than just tees. Outfit your team or build your brand with custom printed hoodies, crewneck sweatshirts, long sleeves, and premium garments.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Quote Custom Apparel</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
