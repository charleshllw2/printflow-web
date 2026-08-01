import '../styles/HowItWorks.css';

export default function HowItWorks() {
    return (
        <section className="section how-it-works">
            <div className="container">
                <div className="section-header text-center">
                    <h2>Simple Ordering Process</h2>
                </div>

                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-number">01</div>
                        <h3>Tell Us What You Need</h3>
                        <p>Request a quote and let us know your garment preferences, quantities, and project deadlines.</p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">02</div>
                        <h3>Artwork & Design</h3>
                        <p>Upload your print-ready artwork, or request professional design assistance from our team.</p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">03</div>
                        <h3>Review & Approve</h3>
                        <p>Review the final project details, quote, and mockups. Approve the project to move forward.</p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">04</div>
                        <h3>We Produce Your Apparel</h3>
                        <p>We use industry-grade DTF technology for vibrant colors, sharp detail, and professional results.</p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">05</div>
                        <h3>Pickup or Shipping</h3>
                        <p>Pickup locally in Chattanooga, or we arrange secure shipping directly to your location.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
