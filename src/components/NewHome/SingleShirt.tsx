import { Link } from 'react-router-dom';

export default function SingleShirt() {
  return (
    <section className="premium-single-shirt section" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '80px 20px', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px', color: 'var(--accent-color)' }}>
          YES, WE CAN MAKE JUST ONE.
        </h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '40px' }}>
          Not every great idea needs a bulk order. Whether it's a birthday, gift, special event, personal design or something you simply want to wear, PrintFlow Studio can help turn the idea into a professionally printed shirt.
        </p>
        <Link to="/request-quote" className="btn btn-outline" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
          MAKE MY SHIRT
        </Link>
      </div>
    </section>
  );
}
