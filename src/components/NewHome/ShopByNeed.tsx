import { Link } from 'react-router-dom';

export default function ShopByNeed() {
  return (
    <section className="premium-shop-by-need section">
      <div className="container">
        <div className="sbn-grid">
          <Link to="/business-shirts-chattanooga" className="sbn-card">
            <h3>I NEED SHIRTS FOR MY BUSINESS</h3>
            <p>Professional branded apparel for employees, crews and company events.</p>
          </Link>
          <Link to="/church-shirts-chattanooga" className="sbn-card">
            <h3>I NEED SHIRTS FOR MY CHURCH</h3>
            <p>Apparel for ministries, conferences, volunteer teams and special events.</p>
          </Link>
          <Link to="/event-shirts-chattanooga" className="sbn-card">
            <h3>I NEED SHIRTS FOR AN EVENT</h3>
            <p>Birthdays, reunions, celebrations, fundraisers and community events.</p>
          </Link>
          <Link to="/team-shirts-chattanooga" className="sbn-card">
            <h3>I NEED TEAM SHIRTS</h3>
            <p>Matching apparel for teams, clubs, schools and organizations.</p>
          </Link>
          <Link to="/custom-shirts-no-minimum-chattanooga" className="sbn-card">
            <h3>I JUST NEED ONE SHIRT</h3>
            <p>One special design should still look professionally printed.</p>
          </Link>
          <Link to="/request-quote" className="sbn-card">
            <h3>I ALREADY HAVE MY DESIGN</h3>
            <p>Upload your artwork and let PrintFlow Studio handle the printing.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
