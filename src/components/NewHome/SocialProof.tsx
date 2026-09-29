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
