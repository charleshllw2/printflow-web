import '../styles/Showcase.css';

export default function Showcase() {
    // Placeholder images - using simple colored blocks or generic URLs if available, 
    // but for now creating a CSS-based placeholder grid as per requirement to not use external unauthorized images unless generated.
    // I'll use CSS gradients to simulate content.

    return (
        <section className="section showcase">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Recent Work</h2>
                    <p className="subtitle">See the quality for yourself. Clean detail. Rich color. Professional finish.</p>
                </div>

                <div className="showcase-grid">
                    <div className="showcase-item item-1">
                        <div className="overlay">
                            <span>DTF Transfer Detail</span>
                        </div>
                    </div>
                    <div className="showcase-item item-2">
                        <div className="overlay">
                            <span>Full Color Hoodie Print</span>
                        </div>
                    </div>
                    <div className="showcase-item item-3">
                        <div className="overlay">
                            <span>Bulk Order Staging</span>
                        </div>
                    </div>
                    <div className="showcase-item item-4">
                        <div className="overlay">
                            <span>Vibrant Art Print</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
