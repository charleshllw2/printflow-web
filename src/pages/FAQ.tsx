import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function FAQ() {
  return (
    <Layout>
      <SEO 
        title="Frequently Asked Questions | PrintFlow Studio" 
        description="Answers to common questions about DTF printing, custom apparel, artwork requirements, and ordering from PrintFlow Studio in Chattanooga."
      />
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <h1 style={{marginBottom: '40px'}}>Frequently Asked Questions</h1>
        <div className="faq-list" style={{ maxWidth: '800px' }}>
            
            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Do you offer local pickup?</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Yes, local pickup is available by arrangement in the Chattanooga area.</p>
            </div>

            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Do you ship outside Chattanooga?</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Yes, we offer nationwide shipping across the United States.</p>
            </div>

            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>How long does a custom order take?</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Turnaround depends on the product, quantity, artwork readiness, and current production schedule. Your estimated completion or shipping date will be confirmed with your quote. Contact us before ordering if you have a firm event deadline.</p>
            </div>

            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Is rush service available?</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Rush service availability depends on our current production schedule. Please indicate your needed-by date when requesting a quote.</p>
            </div>

            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Is there a minimum order?</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>[OWNER CONFIRMATION REQUIRED: Enter minimum order quantity or state that there are no minimums.]</p>
            </div>

            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Can you help prepare my artwork?</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Yes, we offer professional design assistance to ensure your artwork is print-ready.</p>
            </div>

            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>What files should I upload?</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We accept PNG, SVG, AI, PSD, PDF, and high-resolution JPG files. Max upload size is 10MB.</p>
            </div>

            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Do you print for businesses, churches, schools, and teams?</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Yes, we provide custom apparel for businesses, churches, schools, sports teams, events, and other organizations.</p>
            </div>

            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Can I order only DTF transfers?</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Yes, we offer both individual DTF transfers and gang sheets for apparel decorators and brands.</p>
            </div>

            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>When does production begin?</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Production begins only after payment is received and artwork is approved.</p>
            </div>

            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Can I change an order after approving it?</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Once an order is approved and production begins, changes cannot typically be made. Please review your quote and proofs carefully.</p>
            </div>

            <div className="faq-item" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>How should I wash custom-printed apparel?</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>For best results, wash inside out on a cold, gentle cycle. Tumble dry low or hang dry. Do not iron directly on the print.</p>
            </div>

        </div>
      </div>
    </Layout>
  );
}
