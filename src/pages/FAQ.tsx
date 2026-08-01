import Layout from "../../components/Layout";
import SEO from "../../components/SEO";

export default function FAQ() {
  return (
    <Layout>
      <SEO 
        title="Frequently Asked Questions | PrintFlow Studio" 
        description="Answers to common questions about DTF printing, custom apparel, artwork requirements, and ordering from PrintFlow Studio in Chattanooga."
      />
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <h1>Frequently Asked Questions</h1>
        <p>FAQ content will go here.</p>
      </div>
    </Layout>
  );
}
