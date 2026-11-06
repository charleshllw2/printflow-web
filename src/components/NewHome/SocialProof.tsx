import { EXTERNAL_LINKS } from '../../data/businessSettings';

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
          <div className="sp-review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"He was amazing to work with sent him my design and he made it and had it ready the next day! Will be returning as a customer"</p>
            <p className="review-author">— Diana H.</p>
          </div>
          <div className="sp-review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"Thank you print flow studio I love my new shirt I will definitely be back for more"</p>
            <p className="review-author">— Ashley C.</p>
          </div>
          <div className="sp-review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"Great work and great people"</p>
            <p className="review-author">— Shirley</p>
          </div>
        </div>

        {EXTERNAL_LINKS.googleReviewsUrl && (
          <div className="sp-footer">
            <a href={EXTERNAL_LINKS.googleReviewsUrl} className="sp-link" target="_blank" rel="noopener noreferrer">
              Read Our Google Reviews →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
