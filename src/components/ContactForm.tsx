import { useRef, useState, type FormEvent } from 'react';
import { submitInquiry } from '../lib/inquiries';
import '../styles/ContactForm.css';

export default function ContactForm() {
    const requestId = useRef('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [website, setWebsite] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
    const [error, setError] = useState('');
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setStatus('sending');
        setError('');
        try {
            requestId.current ||= crypto.randomUUID();
            await submitInquiry({ kind: 'contact', requestId: requestId.current, contactName: name, contactEmail: email, notes: message, website });
            setStatus('success');
        } catch (failure) {
            setError(failure instanceof Error ? failure.message : 'Your message could not be sent. Please email hello@printflowstudio.com.');
            setStatus('idle');
        }
    }
    return <section id="contact" className="pf-section pf-section--alt pf-section--bordered pf-contact" aria-labelledby="contact-heading">
        <div className="pf-container pf-contact__grid">
            <div><p className="pf-eyebrow">GET IN TOUCH</p><h2 id="contact-heading" className="pf-section-title">SEND A<br />MESSAGE.</h2><p className="pf-copy">Questions about your order or next project? Your message goes to hello@printflowstudio.com.</p><a className="pf-text-link" href="mailto:hello@printflowstudio.com">hello@printflowstudio.com</a></div>
            {status === 'success' ? <div role="status" className="pf-contact__confirmation"><h3>MESSAGE RECEIVED.</h3><p>Thank you for contacting PrintFlow Studio. We’ll review your message and reply to your email.</p><button className="pf-button pf-button--secondary" onClick={() => { setName(''); setEmail(''); setMessage(''); requestId.current = ''; setStatus('idle'); }}>Send another message</button></div> :
                <form onSubmit={handleSubmit} className="pf-contact__form">
                    <label htmlFor="contact-name">Name</label><input id="contact-name" className="pf-input" value={name} onChange={e => setName(e.target.value)} required maxLength={120} autoComplete="name" />
                    <label htmlFor="contact-email">Email</label><input id="contact-email" className="pf-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required maxLength={254} autoComplete="email" />
                    <label htmlFor="contact-message">Message</label><textarea id="contact-message" className="pf-input" rows={6} value={message} onChange={e => setMessage(e.target.value)} required maxLength={6000} />
                    <div hidden aria-hidden="true"><label htmlFor="contact-website">Leave empty</label><input id="contact-website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} /></div>
                    {error && <p role="alert">{error}</p>}
                    <button type="submit" disabled={status === 'sending'} className="pf-button pf-button--primary">{status === 'sending' ? 'Sending…' : 'Send message'}</button>
                </form>}
        </div>
    </section>;
}
