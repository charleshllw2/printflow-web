import '../styles/Showcase.css';

export default function Showcase() {
    const works = [
        { id: 1, label: "DTF Transfer Detail", image: "/work-1.jpg" },
        { id: 2, label: "Full Color Hoodie Print", image: "/work-2.jpg" },
        { id: 3, label: "Bulk Order Staging", image: "/work-3.jpg" },
        { id: 4, label: "Vibrant Art Print", image: "/work-4.jpg" },
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
