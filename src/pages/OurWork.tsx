import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Portfolio from "../components/NewHome/Portfolio";

export default function OurWork() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Our Work — Custom Apparel & DTF Print Portfolio | PrintFlow Studio",
    "description": "Finished custom shirts, hoodies, close-up DTF print detail, and studio equipment from PrintFlow Studio in Chattanooga, Tennessee."
  });

  return (
    <Layout>
      <SEO
        title="Our Work | Custom Shirts & DTF Print Portfolio | PrintFlow Studio"
        description="Browse finished tees, hoodies, close-up Direct-to-Film print details, and studio equipment from PrintFlow Studio in Chattanooga, TN."
        canonicalUrl="https://www.printflowstudio.com/our-work"
        schema={schema}
      />
      <main className="seo-landing-page" style={{ paddingTop: "120px" }}>
        <Portfolio headingLevel={1} showAll={true} />

        <section className="section" style={{ borderTop: "1px solid var(--border-color)", paddingBottom: "90px" }}>
          <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", marginBottom: "16px" }}>
              Ready to See Your Artwork Printed Like This?
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.65, marginBottom: "30px" }}>
              Whether you need one custom hoodie, 10 branded work shirts for your crew, or ready-to-press DTF transfers for your own heat press, every custom project starts with an artwork check and digital mockup review before printing.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
              <Link to="/request-quote" className="btn-primary-large">
                Start a Custom Quote
              </Link>
              <Link to="/shop" className="btn-secondary-outline">
                Shop Ready-Made Designs
              </Link>
              <Link to="/blog/how-to-prepare-artwork-for-dtf-printing" className="btn-secondary-outline">
                Read the Artwork Prep Guide
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
