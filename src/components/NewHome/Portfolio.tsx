export default function Portfolio() {
  return (
    <section id="portfolio" className="premium-portfolio section">
      <div className="container">
        <h2 className="portfolio-heading">REAL SHIRTS.<br/>REAL PROJECTS.<br/>PRINTED BY PRINTFLOW.</h2>
        
        <div className="portfolio-editorial-grid">
          <div className="portfolio-item">
            <div className="portfolio-image" style={{ backgroundImage: "url('/shop/management-dogs.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="portfolio-meta">
              <h3>Custom Business Apparel</h3>
              <p>DTF Printed • Premium Tees</p>
            </div>
          </div>
          <div className="portfolio-item">
            <div className="portfolio-image" style={{ backgroundImage: "url('/shop/social-battery.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="portfolio-meta">
              <h3>Creator Merch</h3>
              <p>DTF Printed • Premium Apparel</p>
            </div>
          </div>
          <div className="portfolio-item">
            <div className="portfolio-image" style={{ backgroundImage: "url('/shop/chattanooga-bridge.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            <div className="portfolio-meta">
              <h3>Local Chattanooga Brand</h3>
              <p>DTF Printed • High-Quality Garments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
