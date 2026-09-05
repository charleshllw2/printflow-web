import '../styles/Testimonials.css';

type Review = {
    id: number;
    quote: string;
    firstName: string;
    organization: string;
    city?: string;
    image?: string;
    source: string;
    permissionConfirmed: boolean;
};

// Owner Editable Testimonials Collection
// Add verified customer reviews here. They will only display if permissionConfirmed is true.
const customerReviews: Review[] = [
    /* Example structure:
    {
        id: 1,
        quote: "This is an example quote.",
        firstName: "Jane",
        organization: "Local Business",
        city: "Chattanooga, TN",
        image: "/path-to-image.jpg",
        source: "Google Review",
        permissionConfirmed: false
    }
    */
];

export default function Testimonials() {
    const displayReviews = customerReviews.filter(review => review.permissionConfirmed);

    return (
        <section className="section testimonials bg-light">
            <div className="container">
                {displayReviews.length > 0 ? (
                    <>
                        <div className="section-header text-center">
                            <h2>Verified Customer Reviews</h2>
                        </div>
                        <div className="testimonials-grid">
                            {displayReviews.map((review) => (
                                <div key={review.id} className="testimonial-card">
                                    <p className="quote">"{review.quote}"</p>
                                    <div className="author">
                                        <span className="name">— {review.firstName}, {review.organization}</span>
                                        {review.city && <span className="city d-block text-sm text-secondary">{review.city}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="section-header text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <h2>Customer Reviews Coming Soon</h2>
                        <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
                            We’re building this section with feedback and project photos from real PrintFlow Studio customers.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
