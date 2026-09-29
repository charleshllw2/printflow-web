import { Link } from 'react-router-dom';

export default function OwnerStory() {
  return (
    <section className="premium-owner-story section">
      <div className="container os-container">
        <div className="os-image placeholder-img">
          {/* Real owner working photo needed here */}
        </div>
        <div className="os-content">
          <h2>BUILT IN CHATTANOOGA.<br/>MADE PERSONAL.</h2>
          <p>When you order from PrintFlow Studio, your project isn't disappearing into a giant production queue. We work directly with customers to turn ideas, logos and artwork into custom apparel they're proud to wear.</p>
          <Link to="/request-quote" className="btn btn-outline">LET'S WORK TOGETHER</Link>
        </div>
      </div>
    </section>
  );
}
