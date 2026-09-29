import { Link } from 'react-router-dom';
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function NoMinimumShirts() {
  return (
    <Layout>
      <SEO 
        title="Small Quantity Custom Shirts Chattanooga | PrintFlow Studio" 
        description="Need just one special shirt? PrintFlow Studio offers premium custom T-shirt printing in Chattanooga with flexible options for small quantity orders."
        canonicalUrl="https://www.printflowstudio.com/custom-shirts-no-minimum-chattanooga"
      />
      <main className="seo-landing-page">
        <section className="seo-hero">
          <div className="container">
            <p className="hero-eyebrow">SMALL QUANTITY PRINTING</p>
            <h1>You Don't Need to Order 100 Shirts</h1>
            <p className="hero-support">Sometimes you just need a few shirts for a weekend trip, a small crew, or a personalized gift. We offer flexible, small-quantity printing without sacrificing professional quality.</p>
            <Link to="/request-quote" className="btn btn-primary mt-4">Start Small Order</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
