import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../lib/firebase';
import "../styles/Quote.css";

type GtagWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

// Analytics Helper
const trackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined") {
    const w = window as GtagWindow;
    if (w.gtag) {
      w.gtag("event", eventName, params);
    }
  }
};

export default function Quote() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get("service") || "";
  const preselectedDesign = searchParams.get("design") || "";
  const preselectedDesignName = searchParams.get("designName") || "";
  const preselectedSize = searchParams.get("size") || "";
  const preselectedQty = searchParams.get("qty") || "";
  const preselectedVariant = searchParams.get("variant") || "";

  const prefilledNoteParts: string[] = [];
  if (preselectedDesignName || preselectedDesign) {
    prefilledNoteParts.push(`Selected Design: ${preselectedDesignName || preselectedDesign}`);
  }
  if (preselectedVariant) {
    prefilledNoteParts.push(`Requested Garment / Variant: ${preselectedVariant}`);
  }
  if (preselectedSize) {
    prefilledNoteParts.push(`Selected Size / Width: ${preselectedSize}`);
  }
  if (preselectedQty) {
    prefilledNoteParts.push(`Requested Quantity: ${preselectedQty}`);
  }
  if (initialService === "business_starter_pack") {
    prefilledNoteParts.push("Interested in: 10-Shirt Business Starter Pack (starting at $199)");
  }

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
  const [contactNotes, setContactNotes] = useState(() => prefilledNoteParts.join(" | "));

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
        preselectedDesign,
        preselectedDesignName,
        preselectedSize,
        preselectedQty,
        preselectedVariant,
        createdAt: serverTimestamp(),
      });

      trackEvent("quote_submitted", { method: "multi_step_form" });
      setSuccess(true);
    } catch (err: unknown) {
      console.error(err);
      setError("An error occurred while submitting your quote. Please try again or email us directly at hello@printflowstudio.com.");
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
              <h1>THANK YOU — WE&apos;VE GOT YOUR REQUEST.</h1>
              <p>Your project details are in our queue. We will review your garment selections, timeline, and artwork and follow up with clear pricing, recommendations, and next steps before anything goes to print.</p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "20px" }}>
                <Link to="/" className="btn btn-primary">Return to Home</Link>
                <Link to="/blog/how-custom-shirt-orders-work" className="btn btn-outline">Read How Custom Orders Work</Link>
              </div>
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
            <h2>WHAT ARE YOU ORDERING?</h2>
            <div className="quote-options-grid">
              {['One shirt / item', '2–9 items', '10–24 items', '25–49 items', '50+ items', 'DTF transfers only', 'Not sure yet'].map(opt => (
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
              {['Personal / Gift', 'Business / Crew', 'Church / Ministry', 'Family Reunion', 'Sports Team', 'Community Event', 'Brand / Merch'].map(opt => (
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
            <h2>WHERE DO YOU WANT IT PRINTED?</h2>
            <div className="quote-options-grid">
              {['Front', 'Back', 'Front + Back', 'Left Chest + Back', 'Sleeve', 'Transfer Film Only', 'Not sure'].map(opt => (
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
              {['I have print-ready artwork', 'I have artwork but need help', 'Using a PrintFlow shop/transfer design', 'I need a design created'].map(opt => (
                <button key={opt} type="button" className={`quote-option-btn ${artworkStatus === opt ? 'selected' : ''}`} onClick={() => setArtworkStatus(opt)}>
                  {opt}
                </button>
              ))}
            </div>

            {artworkStatus && (
              <div className="quote-upload-section">
                <label className="quote-label">Attach File (PNG, JPG, PDF, SVG) — Optional</label>
                <input type="file" accept=".png,.jpg,.jpeg,.pdf,.svg" onChange={handleFileChange} className="quote-file-input" />
                {file && <p className="quote-file-name">Attached: {file.name}</p>}
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "8px" }}>
                  Unsure about file specs? See our <Link to="/file-guidelines" style={{ color: "var(--accent-color)" }}>Artwork Guidelines</Link>.
                </p>
                <button type="button" className="btn btn-primary mt-4" onClick={() => handleNext("artwork")}>Continue</button>
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="quote-step-content animate-fade-in">
            <h2>WHEN DO YOU NEED IT?</h2>
            <p className="quote-subtext">Production timing depends on quantity, blank garment availability, and artwork readiness (separate from carrier transit time). Sharing your target date helps us confirm a realistic schedule.</p>
            <input type="date" className="quote-input" value={date} onChange={e => setDate(e.target.value)} aria-label="Target needed-by date" />
            <button type="button" className="btn btn-primary mt-4" onClick={() => handleNext("date")} disabled={!date}>Continue</button>
          </div>
        );
      case 6:
        return (
          <div className="quote-step-content animate-fade-in">
            <h2>HOW WILL YOU RECEIVE IT?</h2>
            <div className="quote-options-grid">
              {['Chattanooga-area pickup (by arrangement)', 'Nationwide shipping', 'Not sure yet'].map(opt => (
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
              <textarea placeholder="Garment colors, size breakdown, or any additional details?" className="quote-input quote-textarea" value={contactNotes} onChange={e => setContactNotes(e.target.value)}></textarea>
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
        title="Request a Custom Quote | PrintFlow Studio Chattanooga"
        description="Request a custom quote for printed T-shirts, business apparel, group shirts, or DTF transfers from PrintFlow Studio in Chattanooga, TN."
        canonicalUrl="https://www.printflowstudio.com/request-quote"
      />
      <main className="quote-page">
        <div className="container quote-container">
          <header className="quote-header">
            <h1>LET&apos;S MAKE YOUR SHIRT.</h1>
            <p>Tell us what you&apos;re creating. We review every order and confirm pricing and mockup details before printing.</p>
          </header>

          {prefilledNoteParts.length > 0 && (
            <div
              style={{
                marginBottom: "24px",
                padding: "14px 18px",
                borderRadius: "12px",
                background: "rgba(255, 0, 127, 0.08)",
                border: "1px solid var(--accent-color)",
                fontSize: "0.92rem",
                lineHeight: 1.5,
              }}
            >
              <strong style={{ color: "var(--text-primary)" }}>Pre-selected item attached to your request:</strong>{" "}
              <span style={{ color: "var(--text-secondary)" }}>{prefilledNoteParts.join(" • ")}</span>
            </div>
          )}

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
