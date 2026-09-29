#!/bin/bash
cd src/components/NewHome

cat << 'INNER_EOF' > Hero.tsx
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="premium-hero">
      <div className="container">
        <p className="hero-eyebrow">CUSTOM T-SHIRT PRINTING • CHATTANOOGA, TN</p>
        <h1 className="hero-heading">YOUR IDEA.<br/>YOUR SHIRT.<br/>PRINTED RIGHT.</h1>
        <p className="hero-support">Custom shirts and apparel for businesses, churches, teams, events, gifts and everyday ideas. From one shirt to larger orders, PrintFlow Studio makes custom apparel simple.</p>
        
        <div className="hero-ctas">
          <Link to="/request-quote" className="btn btn-primary">START MY SHIRT</Link>
          <Link to="/request-quote" className="btn btn-outline">GET A FAST QUOTE</Link>
        </div>
      </div>
      
      <div className="hero-trust-strip">
        <div className="container strip-content">
          <span>CUSTOM SHIRTS FROM $27.99</span>
          <span className="dot">•</span>
          <span>FLEXIBLE QUANTITIES</span>
          <span className="dot">•</span>
          <span>LOCAL CHATTANOOGA PICKUP</span>
          <span className="dot">•</span>
          <span>NATIONWIDE SHIPPING</span>
          <span className="dot">•</span>
          <span>ARTWORK SUPPORT</span>
        </div>
      </div>
    </section>
  );
}
INNER_EOF

cat << 'INNER_EOF' > SocialProof.tsx
export default function SocialProof() {
  return (
    <section className="premium-social-proof section">
      <div className="container">
        <div className="sp-header">
          <h2>LOVED BY OUR CUSTOMERS</h2>
          <div className="sp-rating">
            <span className="stars">★★★★★</span>
            <span className="score">5.0 on Google</span>
          </div>
        </div>
        
        <div className="sp-reviews-grid">
          {/* TODO: Owner must replace these placeholders with verbatim Google Review text once authorized */}
          <div className="sp-review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"Placeholder for verified Google review. PrintFlow Studio owner to paste verbatim review here."</p>
            <p className="review-author">— [Customer First Name], Chattanooga</p>
          </div>
          <div className="sp-review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"Placeholder for verified Google review. PrintFlow Studio owner to paste verbatim review here."</p>
            <p className="review-author">— [Customer First Name], Chattanooga</p>
          </div>
          <div className="sp-review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"Placeholder for verified Google review. PrintFlow Studio owner to paste verbatim review here."</p>
            <p className="review-author">— [Customer First Name], Chattanooga</p>
          </div>
        </div>
        
        <div className="sp-footer">
          {/* TODO: Add real Google Business Profile URL below */}
          <a href="#" className="sp-link" target="_blank" rel="noopener noreferrer">Read Our Google Reviews →</a>
        </div>
      </div>
    </section>
  );
}
INNER_EOF

cat << 'INNER_EOF' > Portfolio.tsx
export default function Portfolio() {
  return (
    <section className="premium-portfolio section">
      <div className="container">
        <h2 className="portfolio-heading">REAL SHIRTS.<br/>REAL PROJECTS.<br/>PRINTED BY PRINTFLOW.</h2>
        
        <div className="portfolio-editorial-grid">
          <div className="portfolio-item">
            <div className="portfolio-image placeholder-img"></div>
            <div className="portfolio-meta">
              <h3>Custom Business Apparel</h3>
              <p>DTF Printed • Next Level Tees</p>
            </div>
          </div>
          <div className="portfolio-item">
            <div className="portfolio-image placeholder-img"></div>
            <div className="portfolio-meta">
              <h3>Church Event Shirts</h3>
              <p>DTF Printed • Gildan Softstyle</p>
            </div>
          </div>
          <div className="portfolio-item">
            <div className="portfolio-image placeholder-img"></div>
            <div className="portfolio-meta">
              <h3>Creator Merch</h3>
              <p>DTF Printed • Premium Hoodies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
INNER_EOF

cat << 'INNER_EOF' > HowItWorks.tsx
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <section className="premium-hiw section">
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
INNER_EOF

cat << 'INNER_EOF' > ShopByNeed.tsx
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
INNER_EOF

cat << 'INNER_EOF' > BusinessApparel.tsx
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
INNER_EOF

cat << 'INNER_EOF' > OwnerStory.tsx
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
INNER_EOF

cat << 'INNER_EOF' > BehindTheScenes.tsx
export default function BehindTheScenes() {
  return (
    <section className="premium-bts section">
      <div className="container">
        <div className="bts-header">
          <h2>SEE HOW YOUR SHIRT GETS MADE.</h2>
          <p>REAL WORK. REAL PRINTING. REAL PRINTFLOW.</p>
        </div>
        
        <div className="bts-grid">
          {/* Video/Photo placeholders */}
          <div className="bts-item placeholder-video"></div>
          <div className="bts-item placeholder-video"></div>
          <div className="bts-item placeholder-video"></div>
          <div className="bts-item placeholder-video"></div>
        </div>
      </div>
    </section>
  );
}
INNER_EOF
