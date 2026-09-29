export default function Portfolio({ headingLevel = 2 }: { headingLevel?: 1 | 2 }) {
  const Heading = headingLevel === 1 ? "h1" : "h2";
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
        <Heading className="portfolio-heading">REAL SHIRTS.<br/>REAL PROJECTS.<br/>PRINTED BY PRINTFLOW.</Heading>
        
        <div className="portfolio-editorial-grid">
          {projects.map((project, index) => (
            <div className="portfolio-item" key={index}>
              <img className="portfolio-image" src={project.image} alt={project.title + " — " + project.description} loading="lazy" style={{ width: '100%', objectFit: 'cover', display: 'block' }} />
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
