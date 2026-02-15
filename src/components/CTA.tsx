import '../styles/CTA.css';

export default function CTA() {
    const scrollToOrder = () => {
        const element = document.getElementById('order');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="contact" className="section cta-section">
            <div className="container text-center">
                <h2>Ready to Print?</h2>
                <p>Upload your design and let’s bring it to life.</p>
                <button className="btn btn-primary btn-large" onClick={scrollToOrder}>
                    Start Your Order
                </button>
            </div>
        </section>
    );
}
