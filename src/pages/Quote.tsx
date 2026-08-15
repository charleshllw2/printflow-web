import { useState } from "react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import "../styles/Quote.css";

export default function Quote() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        
        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append('_subject', `New Quote Request from ${formData.get('name')}`);
        formData.append('_captcha', 'false');

        try {
            const response = await fetch("https://formsubmit.co/ajax/hello@printflowstudio.com", {
                method: "POST",
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                // Push to dataLayer for GA4 conversion tracking if it exists
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({'event': 'quote_form_submit'});
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
                                        <label htmlFor="phone">Phone Number *</label>
                                        <input type="tel" id="phone" name="phone" required placeholder="(423) 555-0199" />
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="contactMethod">Preferred Contact Method</label>
                                        <select id="contactMethod" name="contactMethod">
                                            <option value="email">Email</option>
                                            <option value="phone">Phone Call</option>
                                            <option value="text">Text Message</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="projectType">Type of Project *</label>
                                        <select id="projectType" name="projectType" required>
                                            <option value="">Select a project type...</option>
                                            <option value="custom-shirts">Custom T-Shirts</option>
                                            <option value="dtf-transfers">DTF Transfers Only</option>
                                            <option value="business-apparel">Business Apparel</option>
                                            <option value="team-apparel">School / Team Apparel</option>
                                            <option value="promo-products">Promotional Products</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="apparelType">Preferred Apparel Type</label>
                                        <input type="text" id="apparelType" name="apparelType" placeholder="e.g. Bella+Canvas 3001, Hoodies, Hats" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="quantity">Estimated Quantity *</label>
                                        <input type="number" id="quantity" name="quantity" required min="1" placeholder="Number of items" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="neededBy">Needed By Date *</label>
                                        <input type="date" id="neededBy" name="neededBy" required />
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="printLocations">Print Locations</label>
                                        <input type="text" id="printLocations" name="printLocations" placeholder="e.g. Front Center, Left Chest, Full Back" />
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="artwork">Upload Artwork (PNG, SVG, AI, PSD)</label>
                                        <input type="file" id="artwork" name="artwork" accept=".png,.svg,.ai,.psd,.pdf,.jpg,.jpeg" />
                                    </div>

                                    <div className="form-group full-width checkbox-group">
                                        <input type="checkbox" id="designHelp" name="designHelp" />
                                        <label htmlFor="designHelp">I need help designing or preparing my artwork for print.</label>
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="delivery">Pickup or Shipping Preference *</label>
                                        <select id="delivery" name="delivery" required>
                                            <option value="">Select an option...</option>
                                            <option value="pickup">Local Pickup (Chattanooga)</option>
                                            <option value="shipping">Shipping Needed</option>
                                        </select>
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="notes">Project Notes & Details</label>
                                        <textarea id="notes" name="notes" rows={4} placeholder="Please provide any additional details about colors, sizes, or special requests..."></textarea>
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
