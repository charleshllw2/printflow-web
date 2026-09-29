import { useState, } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../lib/firebase';
import "../styles/Quote.css";

// Analytics Helper
const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  } else {
    console.log(`[Analytics Mock] ${eventName}`, params);
  }
};

export default function Quote() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service") || "";

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState("");
  const [purpose, setPurpose] = useState("");
  const [locations, setLocations] = useState("");
  const [artworkStatus, setArtworkStatus] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [delivery, setDelivery] = useState("");
  
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactOrg, setContactOrg] = useState("");
  const [contactNotes, setContactNotes] = useState("");

  const handleNext = (currentStepName: string) => {
    trackEvent("quote_step_completed", { step, step_name: currentStepName });
    setStep(s => s + 1);
    window.scrollTo(0, 0);
  };

  const handlePrev = () => setStep(s => s - 1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      trackEvent("artwork_uploaded", { file_type: e.target.files[0].type });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) {
      setError("Please provide at least your name and email.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      let fileUrl = "";
      if (file) {
        const fileRef = ref(storage, `quotes/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "quote_requests"), {
        quantity,
        purpose,
        locations,
        artworkStatus,
        fileUrl,
        dateNeeded: date,
        deliveryMethod: delivery,
        contactName,
        contactEmail,
        contactPhone,
        contactOrg,
        notes: contactNotes,
        initialService,
        createdAt: serverTimestamp(),
      });

      trackEvent("quote_submitted", { method: "multi_step_form" });
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError("An error occurred while submitting your quote. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <SEO title="Quote Requested | PrintFlow Studio" description="Thank you for requesting a custom apparel quote from PrintFlow Studio." />
        <main className="quote-page quote-success-page">
          <div className="container quote-container">
            <div className="quote-success-content">
              <h1>THANK YOU — WE'VE GOT YOUR REQUEST.</h1>
              <p>Your idea is officially in the queue. We will review your details and reach out shortly (usually within 1 business day) with pricing, recommendations, and the next steps to get your custom shirts printed right.</p>
              <Link to="/" className="btn btn-primary">Return to Home</Link>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="quote-step-content animate-fade-in">
            <h2>WHAT ARE YOU MAKING?</h2>
            <div className="quote-options-grid">
              {['One shirt', '2–9 shirts', '10–24 shirts', '25–49 shirts', '50+ shirts', 'Not sure yet'].map(opt => (
                <button key={opt} type="button" className={`quote-option-btn ${quantity === opt ? 'selected' : ''}`} onClick={() => { setQuantity(opt); handleNext("quantity"); }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="quote-step-content animate-fade-in">
            <h2>WHAT IS IT FOR?</h2>
            <div className="quote-options-grid">
              {['Personal', 'Business', 'Church', 'Team', 'Event', 'Brand/Merch', 'Other'].map(opt => (
                <button key={opt} type="button" className={`quote-option-btn ${purpose === opt ? 'selected' : ''}`} onClick={() => { setPurpose(opt); handleNext("purpose"); }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="quote-step-content animate-fade-in">
            <h2>WHAT DO YOU WANT PRINTED?</h2>
            <div className="quote-options-grid">
              {['Front', 'Back', 'Front + Back', 'Sleeve', 'Multiple locations', 'Not sure'].map(opt => (
                <button key={opt} type="button" className={`quote-option-btn ${locations === opt ? 'selected' : ''}`} onClick={() => { setLocations(opt); handleNext("locations"); }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="quote-step-content animate-fade-in">
            <h2>ARTWORK</h2>
            <div className="quote-options-grid">
              {['I have print-ready artwork', 'I have artwork but need help', 'I only have an idea', 'I need a design created'].map(opt => (
                <button key={opt} type="button" className={`quote-option-btn ${artworkStatus === opt ? 'selected' : ''}`} onClick={() => setArtworkStatus(opt)}>
                  {opt}
                </button>
              ))}
            </div>
            
            {artworkStatus && (
              <div className="quote-upload-section">
                <label className="quote-label">Attach File (PNG, JPG, PDF, SVG) - Optional</label>
                <input type="file" accept=".png,.jpg,.jpeg,.pdf,.svg" onChange={handleFileChange} className="quote-file-input" />
                {file && <p className="quote-file-name">Attached: {file.name}</p>}
                <button type="button" className="btn btn-primary mt-4" onClick={() => handleNext("artwork")}>Continue</button>
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="quote-step-content animate-fade-in">
            <h2>WHEN DO YOU NEED IT?</h2>
            <p className="quote-subtext">Selecting a date does not guarantee availability for rush orders, but helps us prioritize your request.</p>
            <input type="date" className="quote-input" value={date} onChange={e => setDate(e.target.value)} />
            <button type="button" className="btn btn-primary mt-4" onClick={() => handleNext("date")} disabled={!date}>Continue</button>
          </div>
        );
      case 6:
        return (
          <div className="quote-step-content animate-fade-in">
            <h2>HOW WILL YOU RECEIVE IT?</h2>
            <div className="quote-options-grid">
              {['Chattanooga-area pickup', 'Shipping', 'Not sure'].map(opt => (
                <button key={opt} type="button" className={`quote-option-btn ${delivery === opt ? 'selected' : ''}`} onClick={() => { setDelivery(opt); handleNext("delivery"); }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="quote-step-content animate-fade-in">
            <h2>ALMOST DONE. WHO ARE WE TALKING TO?</h2>
            <div className="quote-form-grid">
              <input type="text" placeholder="Name *" className="quote-input" value={contactName} onChange={e => setContactName(e.target.value)} required />
              <input type="email" placeholder="Email Address *" className="quote-input" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required />
              <input type="tel" placeholder="Phone Number" className="quote-input" value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
              <input type="text" placeholder="Business / Organization (Optional)" className="quote-input" value={contactOrg} onChange={e => setContactOrg(e.target.value)} />
              <textarea placeholder="Any additional notes or details?" className="quote-input quote-textarea" value={contactNotes} onChange={e => setContactNotes(e.target.value)}></textarea>
            </div>
            
            {error && <p className="quote-error" role="alert">{error}</p>}
            
            <button type="submit" className="btn btn-primary quote-submit-btn" disabled={isSubmitting || !contactName || !contactEmail}>
              {isSubmitting ? "SUBMITTING..." : "GET MY QUOTE"}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <SEO 
        title="Request a Custom Quote | PrintFlow Studio" 
        description="Get a fast quote for custom t-shirts, business apparel, DTF transfers and more from PrintFlow Studio in Chattanooga." 
        canonicalUrl="https://www.printflowstudio.com/request-quote"
      />
      <main className="quote-page">
        <div className="container quote-container">
          <header className="quote-header">
            <h1>LET'S MAKE YOUR SHIRT.</h1>
            <p>Tell us what you're creating. It should only take about a minute.</p>
          </header>

          <div className="quote-progress">
            <div className="quote-progress-bar" style={{ width: `${(step / 7) * 100}%` }}></div>
            <span className="quote-progress-text">{step} of 7</span>
          </div>

          <form className="quote-form" onSubmit={handleSubmit}>
            {renderStep()}
          </form>

          {step > 1 && step <= 7 && (
            <button type="button" className="quote-back-btn" onClick={handlePrev}>
              ← Back
            </button>
          )}
        </div>
      </main>
    </Layout>
  );
}
