import '../styles/HowItWorks.css';

export default function HowItWorks() {
    return (
        <section className="section how-it-works">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Simple. Professional. Fast.</h2>
                </div>

                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-number">01</div>
                        <h3>Upload Your Design</h3>
                        <p>Submit your high-resolution PNG, SVG, PSD, or AI file. Transparent backgrounds preferred for best results.</p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">02</div>
                        <h3>We Print With Precision</h3>
                        <p>Vibrant color, sharp detail, soft feel. Industry-grade DTF technology for professional results every time.</p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">03</div>
                        <h3>Fast Nationwide Shipping</h3>
                        <p>Quick turnaround with secure packaging and tracking included directly to your doorstep.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
