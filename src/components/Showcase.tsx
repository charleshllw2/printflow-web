import '../styles/Showcase.css';

export default function Showcase() {
    const works = [
        { 
            id: 1, 
            label: "Gothic Moon & Rose T-Shirt", 
            image: "/moon_rose_shirt.png",
            customerType: "Small Brand",
            garmentType: "Heavyweight Tee",
            printMethod: "DTF Transfer",
            printLocations: "Front",
            delivery: "Shipped"
        },
        { id: 2, label: "Ornate Rose Hoodie", image: "/moon_rose_hoodie.png" },
        { id: 3, label: "Typography Hoodie Design", image: "/truth_hoodie.png" },
        { id: 4, label: "Framed Rose Graphic Tee", image: "/moon_rose_shirt_framed.png" },
        { id: 5, label: "Childcare Staff Apparel", image: "/nadine_neighborhood.png" },
        { id: 6, label: "Floral Boot Lifestyle Graphic", image: "/floral_boot_shirt.png" },
    ];

    return (
        <section className="section showcase">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Recent Custom Apparel Projects</h2>
                    <p className="subtitle">Explore custom shirts, branded apparel, event orders, and DTF projects produced for customers and organizations.</p>
                </div>

                <div className="showcase-grid">
                    {works.map((work) => (
                        <div key={work.id} className="showcase-item">
                            <img 
                                src={work.image} 
                                alt={work.label} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                            <div className="overlay">
                                <span>{work.label}</span>
                                {work.garmentType && (
                                    <div className="project-details" style={{fontSize: '0.8rem', marginTop: '10px'}}>
                                        {work.customerType && <p>{work.customerType}</p>}
                                        {work.garmentType && <p>{work.garmentType} • {work.printMethod}</p>}
                                        {work.delivery && <p>{work.delivery}</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
