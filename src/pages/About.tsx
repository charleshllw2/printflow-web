import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function About() {
  return (
    <Layout>
      <SEO 
        title="About Us | PrintFlow Studio" 
        description="Learn about PrintFlow Studio, Chattanooga's trusted local source for custom apparel, DTF transfers, and professional printing services."
      />
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <h1>About PrintFlow Studio</h1>
        <p>About information.</p>
      </div>
    </Layout>
  );
}
