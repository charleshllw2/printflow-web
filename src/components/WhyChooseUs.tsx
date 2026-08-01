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
                            <h4>Professional Print Quality</h4>
                            <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '5px'}}>Vibrant colors and durable prints.</p>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">📂</span>
                            <h4>Helpful Artwork Support</h4>
                            <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '5px'}}>We ensure your files are print-ready.</p>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">🤝</span>
                            <h4>Friendly Customer Service</h4>
                            <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '5px'}}>We're here to help you succeed.</p>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">⚡</span>
                            <h4>Fast & Organized Production</h4>
                            <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '5px'}}>Reliable turnaround times.</p>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">👕</span>
                            <h4>Any Order Size</h4>
                            <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '5px'}}>Solutions for individuals and bulk orders.</p>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon">📍</span>
                            <h4>Local Chattanooga Service</h4>
                            <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '5px'}}>Proudly serving the Tennessee Valley.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
