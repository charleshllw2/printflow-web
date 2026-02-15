import '../styles/WhyChooseUs.css';

export default function WhyChooseUs() {
    return (
        <section className="section why-choose-us">
            <div className="container">
                <div className="why-content text-center">

                    <div className="why-header">
                        <h2>Why Choose PrintFlow Studio</h2>
                        <p>We don't cut corners. Every order is inspected for quality before it ships.</p>
                    </div>

                    <div className="benefits-list">
                        <div className="benefit-item">
                            <span className="benefit-icon">🎨</span>
                            <h4>Vibrant, True-to-Color Prints</h4>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">👕</span>
                            <h4>Soft, Durable Transfers</h4>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">⚡</span>
                            <h4>Fast Turnaround Times</h4>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">📂</span>
                            <h4>Professional File Handling</h4>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">🤝</span>
                            <h4>Trusted by Creators & Brands</h4>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
