import { Link } from 'react-router-dom';

export default function OwnerStory() {
  return (
    <section className="premium-owner-story section">
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '30px', lineHeight: 1.1 }}>
          BUILT IN CHATTANOOGA.<br/>MADE PERSONAL.
        </h2>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '20px' }}>
          When you order from PrintFlow Studio, your project isn't disappearing into a giant production queue. We work directly with customers to turn ideas, logos and artwork into custom apparel they're proud to wear.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-primary)', marginBottom: '40px', fontWeight: 'bold' }}>
          BUILT ON 20+ YEARS OF BUSINESS EXPERIENCE.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '40px' }}>
          PrintFlow Studio may be a growing custom apparel brand, but the experience behind the business isn't new. Owner Charles Holloway brings more than 20 years of business ownership and customer-service experience to every project.
        </p>
        <Link to="/request-quote" className="btn btn-outline">LET'S WORK TOGETHER</Link>
      </div>
    </section>
  );
}
