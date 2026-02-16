import { useState } from 'react';
import '../styles/ContactForm.css';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch("https://formsubmit.co/ajax/hello@printflowstudio.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New Inquiry from ${formData.name}`,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <div className="contact-wrapper">

                    <div className="contact-header text-center">
                        <h2>Contact Us</h2>
                        <p>Have a question or need a custom quote? Send us a message.</p>
                    </div>

                    {status === 'success' ? (
                        <div className="contact-success text-center">
                            <div className="success-icon">✅</div>
                            <h3>Message Sent!</h3>
                            <p>Thanks for reaching out. We'll get back to you shortly.</p>
                            <button className="btn btn-secondary" onClick={() => setStatus('idle')}>Send Another Message</button>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary full-width" disabled={status === 'submitting'}>
                                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                            </button>

                            {status === 'error' && (
                                <p className="error-text text-center">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    )}

                </div>
            </div>
        </section>
    );
}
