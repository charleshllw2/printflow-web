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
                        <p>Share your quantities, garment preferences, sizes, deadline, and delivery method.</p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">02</div>
                        <h3>Submit Your Artwork</h3>
                        <p>Upload your print-ready design or ask about professional design assistance.</p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">03</div>
                        <h3>Review Your Quote</h3>
                        <p>We’ll confirm pricing, production details, turnaround time, and shipping or pickup.</p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">04</div>
                        <h3>Approve Your Order</h3>
                        <p>Review and approve the order details and artwork before production begins.</p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">05</div>
                        <h3>Receive Your Apparel</h3>
                        <p>Pick up locally in Chattanooga or have your completed order shipped.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
