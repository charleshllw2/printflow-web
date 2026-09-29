import { Link, useLocation } from 'react-router-dom';
import '../styles/StickyMobileCTA.css';

export default function StickyMobileCTA() {
  const location = useLocation();
  
  // Hide on quote page itself to prevent redundancy
  if (location.pathname === '/request-quote') {
    return null;
  }

  return (
    <div className="sticky-mobile-cta">
      <div className="sticky-cta-container">
        <Link to="/request-quote" className="btn btn-primary cta-btn">
          START MY SHIRT
        </Link>
        <a href="tel:423-681-2218" className="btn btn-outline cta-btn">
          CALL
        </a>
      </div>
    </div>
  );
}
