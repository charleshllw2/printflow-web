import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { PRICING_OFFERS, FULFILLMENT_POLICY } from "../data/businessSettings";

type FaqCategory =
    | "Pricing, Minimums & Ordering"
    | "Garments, Sizes & Print Placement"
    | "Artwork & DTF Printing"
    | "Care, Pickup, Shipping & Returns";

interface FaqEntry {
    category: FaqCategory;
    question: string;
    answer: string;
    relatedLink?: { label: string; to: string };
}

const FAQ_CATEGORIES: ("All Topics" | FaqCategory)[] = [
    "All Topics",
    "Pricing, Minimums & Ordering",
    "Garments, Sizes & Print Placement",
    "Artwork & DTF Printing",
    "Care, Pickup, Shipping & Returns",
];

export default function FAQ() {
    const [activeCategory, setActiveCategory] = useState<"All Topics" | FaqCategory>("All Topics");
    const [query, setQuery] = useState("");

    const faqData: FaqEntry[] = useMemo(() => [
        {
            category: "Pricing, Minimums & Ordering",
            question: "How much does a custom T-shirt cost?",
            answer: `Custom printed standard shirts start at $${PRICING_OFFERS.customShirtStartingPrice.toFixed(2)}. We also offer a ${PRICING_OFFERS.businessStarterPackQty}-shirt Business Apparel Starter Pack starting at $${PRICING_OFFERS.businessStarterPackStartingPrice}. Final pricing depends on the blank garment style, total quantity, and number of print locations (such as front only vs. front and back). We provide clear, upfront pricing before production starts.`,
            relatedLink: { label: "Request a Custom Quote", to: "/request-quote" }
        },
        {
            category: "Pricing, Minimums & Ordering",
            question: "Can I order only one custom shirt, or is there a minimum order?",
            answer: "There is no minimum order requirement on standard custom printed tees. Whether you need a single birthday or gift shirt or dozens of shirts for a crew or event, every order receives the same full-color DTF printing quality.",
            relatedLink: { label: "No-Minimum Custom Shirts", to: "/custom-shirts-no-minimum-chattanooga" }
        },
        {
            category: "Pricing, Minimums & Ordering",
            question: "What is the difference between your Ready-Made Shop, Ready-to-Press Transfers, and Custom Shirt Quotes?",
            answer: `Our Ready-Made Shop (/shop) offers PrintFlow Studio's original graphic tees ($${PRICING_OFFERS.shopStandardTeePrice.toFixed(2)}) for direct online purchase. Our Ready-to-Press DTF Transfers (/dtf-transfers) are heat-press transfer films only (no garment included) for customers with a commercial heat press. Our Custom Quote page (/request-quote) is for printing your own logo or design onto shirts, hoodies, or custom transfer sheets.`,
            relatedLink: { label: "How Custom Shirt Orders Work", to: "/blog/how-custom-shirt-orders-work" }
        },
        {
            category: "Pricing, Minimums & Ordering",
            question: "What happens after I submit a custom quote request?",
            answer: "After you submit your project details and artwork, we review your garment choices, quantities, and file readiness. We then follow up with clear pricing, a digital mockup or layout proof where applicable, and next steps. Production begins once payment is completed and your final proof is approved.",
            relatedLink: { label: "Read Full Ordering Walkthrough", to: "/blog/how-custom-shirt-orders-work" }
        },
        {
            category: "Pricing, Minimums & Ordering",
            question: "Can you print shirts for businesses, churches, family reunions, and sports teams?",
            answer: "Yes! We regularly produce branded work shirts for Chattanooga businesses, youth group and ministry shirts for churches, matching family reunion tees, and spirit wear for sports teams and community events.",
            relatedLink: { label: "Group Shirt Planning Guide", to: "/blog/how-to-plan-custom-shirts-for-church-team-or-event" }
        },
        {
            category: "Garments, Sizes & Print Placement",
            question: "Can I mix shirt sizes in a single order?",
            answer: "Yes. You can mix and match sizes—including Youth sizes and Adult Small through 3XL where available on your chosen garment—within the same custom order so every member of your group gets the right fit."
        },
        {
            category: "Garments, Sizes & Print Placement",
            question: "Can I mix different shirt colors in the same order?",
            answer: "Yes! Because DTF transfers include a dedicated white ink underbase, the same full-color design can be pressed onto multiple garment colors in one order—just make sure your artwork colors contrast well against each shirt color you pick."
        },
        {
            category: "Garments, Sizes & Print Placement",
            question: "Can you print on the front, back, left chest, and sleeves?",
            answer: "Yes. Popular combinations include left-chest logo + full back graphic for business uniforms, center-chest graphics for everyday tees and hoodies, and sleeve prints for team mottos, years, or sponsor emblems."
        },
        {
            category: "Garments, Sizes & Print Placement",
            question: "What print width should I choose for my shirt or transfer?",
            answer: "As a general rule: Pocket / Left-Chest logos are about 3.5–4 inches wide, Youth front graphics are about 8 inches wide, Adult Standard front/back prints are 10–11 inches wide, Adult Large prints are 12 inches wide, and Oversized graphics are 13–14 inches wide.",
            relatedLink: { label: "Read the Complete Print Size Guide", to: "/blog/choosing-the-right-shirt-print-size" }
        },
        {
            category: "Artwork & DTF Printing",
            question: "What file format and resolution should I send?",
            answer: "We prefer a high-resolution PNG (.png) at 300 DPI at actual print size with a transparent background, or vector files (.svg, .ai, .pdf) with text converted to outlines. High-quality PSD and JPG files can also be uploaded when requesting a quote.",
            relatedLink: { label: "Artwork & File Guidelines", to: "/file-guidelines" }
        },
        {
            category: "Artwork & DTF Printing",
            question: "Can PrintFlow Studio help if my artwork isn't print-ready?",
            answer: "Yes. If your logo has a white background box, low resolution, or needs layout cleanup, select 'I have artwork but need help' on our quote form and we will let you know what setup assistance is needed before printing.",
            relatedLink: { label: "How to Prepare Artwork for DTF", to: "/blog/how-to-prepare-artwork-for-dtf-printing" }
        },
        {
            category: "Artwork & DTF Printing",
            question: "What is Direct-to-Film (DTF) printing, and does color count cost extra?",
            answer: "Direct-to-Film (DTF) prints your full-color graphic onto specialized release film backed by white ink and cured adhesive powder, then bonds it into the fabric with a commercial heat press. Unlike traditional screen printing, gradients, fine details, and multi-color logos do not add per-color screen setup fees.",
            relatedLink: { label: "DTF Transfers vs. Screen Printing", to: "/blog/dtf-transfers-vs-screen-printing" }
        },
        {
            category: "Artwork & DTF Printing",
            question: "Can I apply ready-to-press DTF transfers with a household iron?",
            answer: "We strongly recommend using a commercial heat press (approximately 300–320°F for 10–15 seconds with medium-to-heavy even pressure, followed by a cold peel and 5-second finishing press). Household irons cannot maintain consistent heat or pressure across the transfer."
        },
        {
            category: "Care, Pickup, Shipping & Returns",
            question: "How should I wash and dry DTF-printed shirts and hoodies?",
            answer: "Wait at least 24 hours after pressing before the first wash. Turn the garment inside out, machine wash cold on a gentle cycle with mild detergent, skip bleach and liquid fabric softeners, and tumble dry low or hang dry. Never iron directly over the printed graphic.",
            relatedLink: { label: "Complete DTF Apparel Care Guide", to: "/blog/caring-for-dtf-printed-apparel" }
        },
        {
            category: "Care, Pickup, Shipping & Returns",
            question: "Can I pick up my order in Chattanooga, or do you ship nationwide?",
            answer: `${FULFILLMENT_POLICY.pickupSummary} ${FULFILLMENT_POLICY.shippingSummary}`,
            relatedLink: { label: "Shipping & Local Pickup Details", to: "/shipping-pickup" }
        },
        {
            category: "Care, Pickup, Shipping & Returns",
            question: "How long does custom shirt printing take?",
            answer: FULFILLMENT_POLICY.timingSummary
        },
        {
            category: "Care, Pickup, Shipping & Returns",
            question: "What is your return and replacement policy?",
            answer: `${FULFILLMENT_POLICY.returnsSummary} If there is an issue with your order, contact us within 7 days of delivery or pickup with photos so we can make it right.`,
            relatedLink: { label: "Returns & Custom Order Policy", to: "/returns" }
        }
    ], []);

    const filteredFaqs = useMemo(() => {
        const q = query.trim().toLowerCase();
        return faqData.filter((item) => {
            const matchesCat = activeCategory === "All Topics" || item.category === activeCategory;
            const matchesQuery =
                !q ||
                item.question.toLowerCase().includes(q) ||
                item.answer.toLowerCase().includes(q);
            return matchesCat && matchesQuery;
        });
    }, [faqData, activeCategory, query]);

    const groupedCategories: FaqCategory[] = [
        "Pricing, Minimums & Ordering",
        "Garments, Sizes & Print Placement",
        "Artwork & DTF Printing",
        "Care, Pickup, Shipping & Returns",
    ];

    const faqSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map((f) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer,
            },
        })),
    });

    return (
        <Layout>
            <SEO
                title="Frequently Asked Questions | Custom Shirts & DTF | PrintFlow Studio"
                description="Answers to common questions about PrintFlow Studio custom T-shirt pricing, no-minimum orders, DTF artwork specs, print sizes, garment care, Chattanooga pickup, and shipping."
                canonicalUrl="https://www.printflowstudio.com/faq"
                schema={faqSchema}
            />
            <main className="seo-landing-page" style={{ paddingTop: "120px", paddingBottom: "90px" }}>
                <div className="container" style={{ maxWidth: "900px" }}>
                    <header style={{ textAlign: "center", marginBottom: "44px" }}>
                        <span className="text-accent" style={{ fontWeight: 700, letterSpacing: "0.08em", fontSize: "0.85rem" }}>
                            CUSTOMER HELP CENTER
                        </span>
                        <h1 style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)", margin: "10px 0 16px" }}>
                            Frequently Asked Questions
                        </h1>
                        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.65, maxWidth: "680px", margin: "0 auto" }}>
                            Clear answers on custom shirt pricing, print widths, artwork preparation, garment washing care, Chattanooga pickup by arrangement, and nationwide shipping.
                        </p>
                    </header>

                    <search aria-label="Search frequently asked questions" style={{ marginBottom: "36px" }}>
                        <div style={{ marginBottom: "16px" }}>
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search questions (e.g., minimum, PNG, wash, pickup, sizes)..."
                                aria-label="Search frequently asked questions"
                                style={{
                                    width: "100%",
                                    padding: "14px 18px",
                                    borderRadius: "12px",
                                    border: "1px solid var(--border-color)",
                                    background: "var(--bg-secondary)",
                                    color: "var(--text-primary)",
                                    fontSize: "1rem",
                                }}
                            />
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }} role="group" aria-label="Filter FAQs by category">
                            {FAQ_CATEGORIES.map((cat) => {
                                const isActive = activeCategory === cat;
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setActiveCategory(cat)}
                                        style={{
                                            padding: "8px 15px",
                                            borderRadius: "999px",
                                            border: `1px solid ${isActive ? "var(--accent-color)" : "var(--border-color)"}`,
                                            background: isActive ? "var(--accent-color)" : "var(--bg-secondary)",
                                            color: isActive ? "#fff" : "var(--text-secondary)",
                                            fontSize: "0.88rem",
                                            fontWeight: 600,
                                            cursor: "pointer",
                                        }}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>
                    </search>

                    {filteredFaqs.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "48px 24px", background: "var(--bg-secondary)", borderRadius: "14px", border: "1px solid var(--border-color)" }}>
                            <h2 style={{ fontSize: "1.35rem", marginBottom: "10px" }}>No matching questions found</h2>
                            <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
                                Try clearing your search filter or reach out directly with your project question.
                            </p>
                            <button
                                type="button"
                                className="btn-secondary-outline"
                                onClick={() => { setQuery(""); setActiveCategory("All Topics"); }}
                            >
                                Reset FAQ Filters
                            </button>
                        </div>
                    ) : (
                        groupedCategories.map((categoryName) => {
                            const items = filteredFaqs.filter((f) => f.category === categoryName);
                            if (items.length === 0) return null;

                            return (
                                <section key={categoryName} style={{ marginBottom: "44px" }}>
                                    <h2 style={{ fontSize: "1.45rem", marginBottom: "18px", paddingBottom: "10px", borderBottom: "1px solid var(--border-color)" }}>
                                        {categoryName}
                                    </h2>
                                    <div style={{ display: "grid", gap: "14px" }}>
                                        {items.map((faq) => (
                                            <details
                                                key={faq.question}
                                                style={{
                                                    background: "var(--bg-secondary)",
                                                    padding: "20px 22px",
                                                    borderRadius: "12px",
                                                    border: "1px solid var(--border-color)",
                                                }}
                                            >
                                                <summary
                                                    style={{
                                                        fontWeight: 700,
                                                        fontSize: "1.08rem",
                                                        cursor: "pointer",
                                                        color: "var(--text-primary)",
                                                        lineHeight: 1.4,
                                                    }}
                                                >
                                                    {faq.question}
                                                </summary>
                                                <p
                                                    style={{
                                                        marginTop: "14px",
                                                        marginBottom: faq.relatedLink ? "12px" : 0,
                                                        lineHeight: 1.68,
                                                        color: "var(--text-secondary)",
                                                    }}
                                                >
                                                    {faq.answer}
                                                </p>
                                                {faq.relatedLink && (
                                                    <Link
                                                        to={faq.relatedLink.to}
                                                        style={{
                                                            display: "inline-block",
                                                            fontSize: "0.92rem",
                                                            fontWeight: 600,
                                                            color: "var(--accent-color)",
                                                            textDecoration: "underline",
                                                            textUnderlineOffset: "3px",
                                                        }}
                                                    >
                                                        {faq.relatedLink.label} →
                                                    </Link>
                                                )}
                                            </details>
                                        ))}
                                    </div>
                                </section>
                            );
                        })
                    )}

                    <section
                        style={{
                            marginTop: "56px",
                            padding: "36px 28px",
                            borderRadius: "16px",
                            background: "var(--bg-secondary)",
                            border: "1px solid var(--border-color)",
                            textAlign: "center",
                        }}
                    >
                        <h2 style={{ fontSize: "1.65rem", marginBottom: "12px" }}>Still Have a Question About Your Order?</h2>
                        <p style={{ color: "var(--text-secondary)", maxWidth: "620px", margin: "0 auto 24px", lineHeight: 1.6 }}>
                            Send us your garment ideas, estimated quantity, or artwork file and we will walk you through options and pricing before anything goes to print.
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
                            <Link to="/request-quote" className="btn-primary-large">
                                Get a Custom Quote
                            </Link>
                            <Link to="/blog" className="btn-secondary-outline">
                                Browse Printing Guides
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        </Layout>
    );
}
