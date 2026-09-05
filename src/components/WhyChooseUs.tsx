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
                            <span className="benefit-icon" style={{display: 'inline-block', width: '24px', height: '24px'}}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </span>
                            <h4>Clear Quotes & Order Details</h4>
                            <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '5px'}}>Transparent pricing and project confirmation.</p>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon" style={{display: 'inline-block', width: '24px', height: '24px'}}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
                            </span>
                            <h4>Artwork & File Support</h4>
                            <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '5px'}}>Professional help to ensure your designs are print-ready.</p>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon" style={{display: 'inline-block', width: '24px', height: '24px'}}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                            </span>
                            <h4>Flexible Order Quantities</h4>
                            <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '5px'}}>Solutions for individuals, small teams, and bulk orders.</p>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon" style={{display: 'inline-block', width: '24px', height: '24px'}}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </span>
                            <h4>Quality-Checked Orders</h4>
                            <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '5px'}}>Every item is inspected before it reaches you.</p>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon" style={{display: 'inline-block', width: '24px', height: '24px'}}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </span>
                            <h4>Local Chattanooga Service</h4>
                            <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '5px'}}>Local pickup and dedicated support in the Tennessee Valley.</p>
                        </div>
                        <div className="benefit-item">
                            <span className="benefit-icon" style={{display: 'inline-block', width: '24px', height: '24px'}}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            </span>
                            <h4>Nationwide Shipping</h4>
                            <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '5px'}}>Reliable delivery across the United States.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
