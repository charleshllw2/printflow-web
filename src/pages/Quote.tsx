import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import "../styles/Quote.css";
import { useBlackFridayOffer } from "../lib/blackFriday";
import { MAX_ARTWORK_BYTES, submitInquiry } from "../lib/inquiries";

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
  const showBlackFriday = useBlackFridayOffer();
  const requestedPromo = searchParams.get("promo");
  const verifiedPromo = requestedPromo === "BLACKFRIDAY" || requestedPromo === "CUSTOM5" ? requestedPromo : null;
  const initialService = searchParams.get("service") || "";
  const occasion = searchParams.get("occasion") || "";
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

  const requestId = useRef('');
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
  const [garmentType, setGarmentType] = useState(preselectedVariant);
  const [sizeBreakdown, setSizeBreakdown] = useState("");
  const [garmentColors, setGarmentColors] = useState("");
  const [contactNotes, setContactNotes] = useState("");
  const [fileError, setFileError] = useState("");

  const handleNext = (currentStepName: string) => {
    trackEvent("quote_step_completed", { step, step_name: currentStepName });
    setStep(s => s + 1);
    window.scrollTo(0, 0);
  };

  const handlePrev = () => setStep(s => s - 1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    const allowedTypes = ["image/png", "image/jpeg", "application/pdf", "image/svg+xml"];
    if (selectedFile && (!allowedTypes.includes(selectedFile.type) || selectedFile.size === 0 || selectedFile.size > MAX_ARTWORK_BYTES)) {
      setFile(null);
      e.target.value = "";
      setFileError("Choose a PNG, JPG, PDF, or SVG file up to 2 MB, or email larger artwork to hello@printflowstudio.com.");
      return;
    }
    setFile(selectedFile);
    setFileError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || step !== 7) return;
    if (!contactName.trim() || !contactEmail.trim()) {
      setError("Please provide at least your name and email.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      requestId.current ||= crypto.randomUUID();
      await submitInquiry({
        kind: 'quote', requestId: requestId.current,
        quantity, purpose, locations, artworkStatus, dateNeeded: date,
        deliveryMethod: delivery, contactName: contactName.trim(), contactEmail: contactEmail.trim(), contactPhone,
        contactOrg,
        notes: [
          ...prefilledNoteParts,
          occasion && `Occasion: ${occasion.slice(0, 120)}`,
          garmentType.trim() && `Garment / format: ${garmentType.trim()}`,
          sizeBreakdown.trim() && `Size breakdown: ${sizeBreakdown.trim()}`,
          garmentColors.trim() && `Garment colors: ${garmentColors.trim()}`,
          contactNotes.trim(),
          showBlackFriday && verifiedPromo && `Promo requested: ${verifiedPromo}`,
        ].filter(Boolean).join("\n"),
        initialService, preselectedDesign,
        preselectedDesignName, preselectedSize, preselectedQty, preselectedVariant,
      }, file);

      trackEvent("generate_lead", { method: "custom_quote" });
      trackEvent("quote_submitted", { method: "multi_step_form" });
      setSuccess(true);
      requestAnimationFrame(() => window.scrollTo(0, 0));
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Your quote could not be sent. Please try again or email hello@printflowstudio.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <Layout>
        <SEO title="Quote Requested | PrintFlow Studio" description="Thank you for requesting a custom apparel quote from PrintFlow Studio." />
        <div className="quote-page quote-success-page">
          <div className="container quote-container">
            <div className="quote-success-content">
              <h1>THANK YOU — WE&apos;VE GOT YOUR REQUEST.</h1>
              <p>Your project details have been sent to PrintFlow Studio. We will review your garment selections, timeline, and artwork and follow up with clear pricing, recommendations, and next steps before anything goes to print.</p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginTop: "20px" }}>
                <Link to="/" className="btn btn-primary">Return to Home</Link>
                <Link to="/blog/how-custom-shirt-orders-work" className="btn btn-outline">Read How Custom Orders Work</Link>
              </div>
            </div>
          </div>
        </div>
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
                <label className="quote-label" htmlFor="quote-artwork">Attach Artwork (PNG, JPG, PDF, SVG, up to 2 MB) — Optional</label>
                <input id="quote-artwork" type="file" accept=".png,.jpg,.jpeg,.pdf,.svg" onChange={handleFileChange} className="quote-file-input" />
                {fileError && <p className="quote-error" role="alert">{fileError}</p>}
                {file && <p className="quote-file-name">Attached: {file.name}</p>}
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "8px" }}>
                  Unsure about file specs? See our <Link to="/file-guidelines" style={{ color: "var(--accent-color)" }}>Artwork Guidelines</Link>.
                </p>
                <button type="button" className="btn btn-primary mt-4" onClick={() => handleNext("artwork")} disabled={!!fileError}>Continue</button>
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
              <input type="text" aria-label="Name" autoComplete="name" maxLength={120} placeholder="Name *" className="quote-input" value={contactName} onChange={e => setContactName(e.target.value)} required />
              <input type="email" aria-label="Email address" autoComplete="email" maxLength={254} placeholder="Email Address *" className="quote-input" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required />
              <input type="tel" aria-label="Phone number" autoComplete="tel" maxLength={40} placeholder="Phone Number" className="quote-input" value={contactPhone} onChange={e => setContactPhone(e.target.value)} />
              <input type="text" aria-label="Business or organization" maxLength={120} placeholder="Business / Organization (Optional)" className="quote-input" value={contactOrg} onChange={e => setContactOrg(e.target.value)} />
              <input type="text" aria-label="Garment type or transfer format" placeholder="Garment type or transfer format" className="quote-input" maxLength={120} value={garmentType} onChange={e => setGarmentType(e.target.value)} />
              <input type="text" aria-label="Preferred garment colors" placeholder="Preferred garment colors" className="quote-input" maxLength={120} value={garmentColors} onChange={e => setGarmentColors(e.target.value)} />
              <input type="text" aria-label="Size breakdown" placeholder="Size breakdown (e.g. 5 M, 8 L)" className="quote-input" maxLength={250} value={sizeBreakdown} onChange={e => setSizeBreakdown(e.target.value)} />
              {showBlackFriday && <p id="quote-holiday-tip" className="quote-subtext">{verifiedPromo ? `${verifiedPromo} is attached to this request. ` : "Enter BLACKFRIDAY for the two holiday tees or CUSTOM5 for the qualifying custom tee offer. "}Include your design and sizes. Offers cannot be combined; pricing is confirmed in your quote.</p>}
              <textarea aria-describedby={showBlackFriday ? "quote-holiday-tip" : undefined} aria-label="Additional instructions" maxLength={1500} placeholder="Additional instructions" className="quote-input quote-textarea" value={contactNotes} onChange={e => setContactNotes(e.target.value)}></textarea>
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
      <div className="quote-page">
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
      </div>
    </Layout>
  );
}
