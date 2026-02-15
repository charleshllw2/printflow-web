import '../styles/Testimonials.css';

export default function Testimonials() {
    return (
        <section className="section testimonials">
            <div className="container">
                <div className="section-header text-center">
                    <h2>What Our Customers Say</h2>
                </div>

                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <p className="quote">"PrintFlow is my go-to for DTF transfers. Color is always on point and shipping is fast."</p>
                        <div className="author">
                            <span className="name">— Small Brand Owner</span>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <p className="quote">"Bulk order came out perfect. Professional service from start to finish."</p>
                        <div className="author">
                            <span className="name">— Apparel Startup</span>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <p className="quote">"Finally a print partner that understands quality. The file guidelines helped me get it right the first time."</p>
                        <div className="author">
                            <span className="name">— Graphic Designer</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
