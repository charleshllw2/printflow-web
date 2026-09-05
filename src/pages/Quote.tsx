import { useState } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import "../styles/Quote.css";

export default function Quote() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [deliveryMethod, setDeliveryMethod] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        
        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append('_subject', `New Quote Request from ${formData.get('name')}`);
        formData.append('_captcha', 'false');

        // Check if artwork is attached for analytics
        const artworkFile = formData.get('artwork') as File;
        const hasArtwork = artworkFile && artworkFile.size > 0;

        try {
            const response = await fetch("https://formsubmit.co/ajax/hello@printflowstudio.com", {
                method: "POST",
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                // Push to dataLayer for GA4 conversion tracking if it exists (no PII sent to GA4)
                if (typeof window !== 'undefined' && (window as unknown as { dataLayer: unknown[] }).dataLayer) {
                    (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
                        'event': 'quote_form_submit',
                        'has_artwork': hasArtwork
                    });
                }
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Form submission error", error);
            setStatus('error');
        }
    };

    return (
        <Layout>
            <SEO 
                title="Request a Quote | PrintFlow Studio" 
                description="Request a quote for custom apparel, T-shirts, or DTF transfers in Chattanooga. Upload artwork and get a fast estimate."
            />
            <div className="section bg-light" style={{ padding: '60px 0', backgroundColor: '#f9fafb' }}>
                <div className="container">
                    <div className="section-header text-center">
                        <h1>Request a Custom Quote</h1>
                        <p>Fill out the details below and we'll get back to you with an estimate as soon as possible.</p>
                    </div>

                    <div className="quote-form-container">
                        {status === 'success' ? (
                            <div className="text-center" style={{padding: '40px 0'}}>
                                <h2>✅ Quote Request Received!</h2>
                                <p style={{marginTop: '15px'}}>Thank you for reaching out. Our team will review your project details and contact you shortly with an estimate and next steps.</p>
                                <button className="btn btn-primary" onClick={() => setStatus('idle')} style={{marginTop: '20px'}}>Submit Another Request</button>
                            </div>
                        ) : (
                            <form className="quote-form" onSubmit={handleSubmit}>
                                <div className="quote-grid">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input type="text" id="name" name="name" required placeholder="John Doe" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="businessName">Business / Organization Name</label>
                                        <input type="text" id="businessName" name="businessName" placeholder="Optional" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input type="email" id="email" name="email" required placeholder="john@example.com" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input type="tel" id="phone" name="phone" placeholder="(Optional)" />
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="contactMethod">Preferred Contact Method *</label>
                                        <select id="contactMethod" name="contactMethod" required>
                                            <option value="email">Email</option>
                                            <option value="phone">Phone Call</option>
                                            <option value="text">Text Message</option>
                                        </select>
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="serviceNeeded">Service Needed *</label>
                                        <select id="serviceNeeded" name="serviceNeeded" required>
                                            <option value="">Select a service...</option>
                                            <option value="Custom T-shirts">Custom T-shirts</option>
                                            <option value="Business apparel">Business apparel</option>
                                            <option value="Church or ministry apparel">Church or ministry apparel</option>
                                            <option value="School or team apparel">School or team apparel</option>
                                            <option value="Event or reunion shirts">Event or reunion shirts</option>
                                            <option value="DTF transfers">DTF transfers</option>
                                            <option value="Gang sheets">Gang sheets</option>
                                            <option value="DIY DTF Print Sheets / Iron Ons">DIY DTF Print Sheets / Iron Ons</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="garmentType">Garment Type</label>
                                        <input type="text" id="garmentType" name="garmentType" placeholder="e.g. Premium Tees, Hoodies, Hats" />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="garmentColors">Garment Colors</label>
                                        <input type="text" id="garmentColors" name="garmentColors" placeholder="e.g. Black, Navy, White" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="quantity">Estimated Quantity *</label>
                                        <input type="number" id="quantity" name="quantity" required min="1" placeholder="Number of items" />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="sizes">Adult and Youth Sizes</label>
                                        <input type="text" id="sizes" name="sizes" placeholder="e.g. Adult S-XXL, Youth M-L" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="neededBy">Needed-By Date *</label>
                                        <input type="date" id="neededBy" name="neededBy" required />
                                        <p style={{fontSize: '0.75rem', color: '#6b7280', marginTop: '5px'}}>
                                            Submitting a requested date does not guarantee availability. Turnaround is confirmed with your quote.
                                        </p>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="printLocations">Number of Print Locations</label>
                                        <input type="text" id="printLocations" name="printLocations" placeholder="e.g. 1 (Front), 2 (Front & Back)" />
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="delivery">Local Pickup or Shipping *</label>
                                        <select id="delivery" name="delivery" required onChange={(e) => setDeliveryMethod(e.target.value)}>
                                            <option value="">Select an option...</option>
                                            <option value="pickup">Local Pickup (Chattanooga)</option>
                                            <option value="shipping">Shipping Needed</option>
                                        </select>
                                    </div>

                                    {deliveryMethod === 'shipping' && (
                                        <div className="form-group full-width">
                                            <label htmlFor="zipCode">Shipping ZIP Code *</label>
                                            <input type="text" id="zipCode" name="zipCode" required placeholder="Enter ZIP Code" />
                                        </div>
                                    )}

                                    <div className="form-group full-width">
                                        <label htmlFor="artwork">Upload Artwork</label>
                                        <input type="file" id="artwork" name="artwork" accept=".png,.svg,.ai,.psd,.pdf,.jpg,.jpeg" />
                                        <p style={{fontSize: '0.75rem', color: '#6b7280', marginTop: '5px'}}>
                                            Accepted formats: PNG, SVG, AI, PSD, PDF, JPG. Max size: 10MB.
                                        </p>
                                    </div>

                                    <div className="form-group full-width">
                                        <label>Design assistance needed? *</label>
                                        <div style={{display: 'flex', gap: '15px', marginTop: '5px'}}>
                                            <label style={{fontWeight: 'normal'}}><input type="radio" name="designHelp" value="yes" required /> Yes</label>
                                            <label style={{fontWeight: 'normal'}}><input type="radio" name="designHelp" value="no" /> No</label>
                                        </div>
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="notes">Project Details</label>
                                        <textarea id="notes" name="notes" rows={4} placeholder="Please provide any additional details about your project..."></textarea>
                                    </div>

                                    <div className="form-group full-width checkbox-group" style={{marginTop: '10px'}}>
                                        <input type="checkbox" id="consent" name="consent" required />
                                        <label htmlFor="consent">I consent to being contacted regarding this quote request. *</label>
                                    </div>

                                    <div className="form-group full-width" style={{marginTop: '20px'}}>
                                        <button type="submit" className="btn btn-primary full-width" style={{padding: '15px', fontSize: '1.1rem'}} disabled={status === 'submitting'}>
                                            {status === 'submitting' ? 'Submitting Request...' : 'Submit Quote Request'}
                                        </button>
                                        
                                        {status === 'error' && (
                                            <div style={{color: '#dc2626', marginTop: '15px', textAlign: 'center', fontWeight: '500'}}>
                                                Something went wrong submitting your request. Please try again or email us directly.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
