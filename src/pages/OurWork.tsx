import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Portfolio from "../components/NewHome/Portfolio";

export default function OurWork() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Our Work - PrintFlow Studio",
    "description": "Portfolio of custom shirts, business apparel, and DTF printed garments by PrintFlow Studio."
  });

  return (
    <Layout>
      <SEO 
        title="Our Work | Custom Apparel Portfolio | PrintFlow Studio" 
        description="See real examples of our custom t-shirt printing. From business apparel to creator merch, view our portfolio of premium printed garments."
        canonicalUrl="https://www.printflowstudio.com/our-work"
        schema={schema}
      />
      <main className="seo-landing-page" style={{ paddingTop: '120px' }}>
        <Portfolio />
      </main>
    </Layout>
  );
}
