import { Link } from 'react-router-dom';

export default function BusinessApparel() {
  return (
    <section className="premium-business-promo section">
      <div className="container bp-container">
        <div className="bp-content">
          <h2>MAKE YOUR BUSINESS LOOK LIKE A BRAND.</h2>
          <div className="bp-price-block">
            <span className="bp-qty">10 CUSTOM BUSINESS SHIRTS</span>
            <span className="bp-price">STARTING AT $199</span>
          </div>
          <p className="bp-support">Give your crew a consistent, professional look without making apparel ordering complicated.</p>
          
          <ul className="bp-process">
            <li>UPLOAD YOUR LOGO</li>
            <li>CHOOSE YOUR SHIRTS</li>
            <li>REVIEW YOUR PROOF/ORDER</li>
            <li>WE PRINT</li>
            <li>PICK UP OR SHIP</li>
          </ul>
          
          <Link to="/business-shirts-chattanooga" className="btn btn-primary">BUILD MY BUSINESS PACKAGE</Link>
        </div>
      </div>
    </section>
  );
}
