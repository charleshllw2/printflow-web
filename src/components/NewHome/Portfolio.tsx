export default function Portfolio() {
  const projects = [
    {
      title: "Custom Business Apparel",
      description: "DTF Printed • Premium Tees",
      image: "/shop/management-dogs.jpg",
    },
    {
      title: "Creator Merch",
      description: "DTF Printed • Premium Apparel",
      image: "/shop/social-battery.jpg",
    },
    {
      title: "Local Chattanooga Brand",
      description: "DTF Printed • High-Quality Garments",
      image: "/shop/chattanooga-bridge.jpg",
    },
    {
      title: "Book Club Merch",
      description: "DTF Printed • Long-Sleeve Tees",
      image: "/shop/reading-sundown.jpg",
    },
    {
      title: "Church & Ministry",
      description: "DTF Printed • Softstyle Apparel",
      image: "/shop/grace-grows.jpg",
    },
    {
      title: "Seasonal & Event Shirts",
      description: "DTF Printed • Premium Hoodies & Sweaters",
      image: "/shop/scenic-city-sweater-weather.jpg",
    }
  ];

  return (
    <section id="portfolio" className="premium-portfolio section">
      <div className="container">
        <h2 className="portfolio-heading">REAL SHIRTS.<br/>REAL PROJECTS.<br/>PRINTED BY PRINTFLOW.</h2>
        
        <div className="portfolio-editorial-grid">
          {projects.map((project, index) => (
            <div className="portfolio-item" key={index}>
              <div className="portfolio-image" style={{ backgroundImage: `url('${project.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="portfolio-meta">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
