import '../styles/Showcase.css';

export default function Showcase() {
    const works = [
        { id: 1, label: "Gothic Moon & Rose T-Shirt", image: "/moon_rose_shirt.png" },
        { id: 2, label: "Ornate Rose Hoodie", image: "/moon_rose_hoodie.png" },
        { id: 3, label: "Typography Hoodie Design", image: "/truth_hoodie.png" },
        { id: 4, label: "Framed Rose Graphic Tee", image: "/moon_rose_shirt_framed.png" },
        { id: 5, label: "Childcare Staff Apparel", image: "/nadine_neighborhood.png" },
    ];

    return (
        <section className="section showcase">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Recent Work</h2>
                    <p className="subtitle">See the quality for yourself. Clean detail. Rich color. Professional finish.</p>
                </div>

                <div className="showcase-grid">
                    {works.map((work) => (
                        <div
                            key={work.id}
                            className="showcase-item"
                            style={{ backgroundImage: `url(${work.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        >
                            <div className="overlay">
                                <span>{work.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
