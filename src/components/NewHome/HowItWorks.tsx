import { Link } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="premium-hiw section">
      <div className="container">
        <h2 className="hiw-heading">CUSTOM SHIRTS SHOULDN'T BE COMPLICATED.</h2>

        <div className="hiw-steps">
          <div className="hiw-step">
            <span className="step-num">STEP 1</span>
            <h3>TELL US YOUR IDEA</h3>
            <p>Upload artwork, a logo, inspiration, or explain what garments and print placements you need.</p>
          </div>
          <div className="hiw-step">
            <span className="step-num">STEP 2</span>
            <h3>WE HELP GET IT PRINT-READY</h3>
            <p>PrintFlow Studio checks your file resolution and background and confirms garment styles, sizing, and placement.</p>
          </div>
          <div className="hiw-step">
            <span className="step-num">STEP 3</span>
            <h3>REVIEW YOUR PROOF &amp; QUOTE</h3>
            <p>Review clear pricing, final size counts, and your digital layout/proof where applicable before production begins.</p>
          </div>
          <div className="hiw-step">
            <span className="step-num">STEP 4</span>
            <h3>WE PRINT &amp; QUALITY CHECK</h3>
            <p>Your apparel or transfers are produced in full color and inspected before packing.</p>
          </div>
          <div className="hiw-step">
            <span className="step-num">STEP 5</span>
            <h3>PICK UP OR SHIP</h3>
            <p>Arrange local pickup in the Chattanooga area or have your completed order shipped nationwide.</p>
          </div>
        </div>

        <div className="hiw-cta" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
          <Link to="/request-quote" className="btn btn-primary">START MY ORDER</Link>
          <Link to="/blog/how-custom-shirt-orders-work" className="btn btn-outline">READ FULL ORDER GUIDE</Link>
        </div>
      </div>
    </section>
  );
}
