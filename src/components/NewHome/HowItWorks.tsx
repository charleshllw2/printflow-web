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
            <p>Upload artwork, a logo, inspiration or simply explain what you want.</p>
          </div>
          <div className="hiw-step">
            <span className="step-num">STEP 2</span>
            <h3>WE HELP GET IT PRINT-READY</h3>
            <p>PrintFlow Studio checks the artwork and confirms garment, sizing, placement and project details.</p>
          </div>
          <div className="hiw-step">
            <span className="step-num">STEP 3</span>
            <h3>REVIEW YOUR ORDER</h3>
            <p>Review pricing, project details and artwork/proof where applicable before production.</p>
          </div>
          <div className="hiw-step">
            <span className="step-num">STEP 4</span>
            <h3>WE PRINT IT</h3>
            <p>Your apparel is professionally produced and quality checked.</p>
          </div>
          <div className="hiw-step">
            <span className="step-num">STEP 5</span>
            <h3>PICK UP OR SHIP</h3>
            <p>Choose Chattanooga-area pickup when available or have the completed order shipped.</p>
          </div>
        </div>
        
        <div className="hiw-cta">
          <Link to="/request-quote" className="btn btn-primary">START MY ORDER</Link>
        </div>
      </div>
    </section>
  );
}
