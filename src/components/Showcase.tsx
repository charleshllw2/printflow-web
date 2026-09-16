import '../styles/Showcase.css';

export default function Showcase() {
    const works = [
        { 
            id: 1, 
            label: "Chattanooga River City Energy Tee", 
            image: "/showcase-1.jpg",
            customerType: "Local Business",
            garmentType: "Premium Navy Tee",
            printMethod: "DTF Transfer"
        },
        { 
            id: 2, 
            label: "Management Dogs Cream Tee", 
            image: "/showcase-2.jpg",
            customerType: "Boutique Brand",
            garmentType: "Classic Cream Tee",
            printMethod: "DTF Transfer"
        },
        { 
            id: 3, 
            label: "Management Dogs Red Long-Sleeve", 
            image: "/showcase-3.jpg",
            customerType: "Boutique Brand",
            garmentType: "Red Long-Sleeve",
            printMethod: "DTF Transfer"
        },
        { 
            id: 4, 
            label: "Reading After Sundown Long-Sleeve", 
            image: "/showcase-4.jpg",
            customerType: "Creator Merch",
            garmentType: "Brown Long-Sleeve",
            printMethod: "DTF Transfer"
        },
        { 
            id: 5, 
            label: "Chattanooga River City Grey Long-Sleeve", 
            image: "/showcase-5.jpg",
            customerType: "Local Business",
            garmentType: "Grey Long-Sleeve",
            printMethod: "DTF Transfer"
        },
        { 
            id: 6, 
            label: "Custom Typography Hoodie", 
            image: "/truth_hoodie.png",
            customerType: "Small Brand",
            garmentType: "Heavyweight Hoodie",
            printMethod: "DTF Transfer"
        }
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
