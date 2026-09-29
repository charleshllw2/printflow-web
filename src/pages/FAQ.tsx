import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function FAQ() {
    const faqData = [
        {
            question: "How much does a custom T-shirt cost?",
            answer: "Our custom shirts start at $27.99. Final pricing depends on the garment chosen, quantity, and print locations (e.g., front and back). We provide clear, upfront pricing during the quote process."
        },
        {
            question: "Can I order only one custom shirt?",
            answer: "Yes! We proudly print single custom shirts. Your one special design receives the exact same professional printing process as our large bulk orders."
        },
        {
            question: "Do you have a minimum order?",
            answer: "No, we do not have a minimum order requirement for standard custom printed shirts. You can order exactly as many as you need."
        },
        {
            question: "Can you print my company logo?",
            answer: "Absolutely. We specialize in printing vibrant, full-color business logos on professional apparel. DTF printing is perfect for intricate, multi-color logos."
        },
        {
            question: "Can you make shirts for my church?",
            answer: "Yes, we regularly print apparel for ministries, youth groups, volunteer teams, and church events."
        },
        {
            question: "Can you make family reunion shirts?",
            answer: "Yes, family reunion shirts are a very popular request. We can help you outfit the entire family with matching designs."
        },
        {
            question: "Can I mix shirt sizes in an order?",
            answer: "Yes, you can mix and match any sizes (Small, Medium, Large, XL, etc.) within your order to ensure everyone gets a shirt that fits perfectly."
        },
        {
            question: "Can I use different shirt colors?",
            answer: "Yes, as long as the printed design works on the chosen shirt colors, you can mix and match garment colors in the same order."
        },
        {
            question: "Can you print the front and back?",
            answer: "Yes, we can print on the front, back, and both sides if required."
        },
        {
            question: "Can you print sleeves?",
            answer: "Yes, sleeve prints are a great way to add extra branding or personalization to your custom apparel."
        },
        {
            question: "What file format should I send?",
            answer: "We prefer high-resolution PNG or SVG files with a transparent background. We also accept high-quality JPG and PDF files."
        },
        {
            question: "What resolution should my artwork be?",
            answer: "For the best results, artwork should be at least 300 DPI at the exact physical size you want it printed on the garment."
        },
        {
            question: "Can PrintFlow Studio help fix my artwork?",
            answer: "Yes. If your artwork isn't perfectly print-ready, we offer assistance to help optimize it for the best possible printing result."
        },
        {
            question: "What is DTF printing?",
            answer: "Direct-to-Film (DTF) is a modern printing technique where a design is printed onto a special film and then heat-transferred to the garment. It yields incredibly vibrant, durable, full-color prints that sit beautifully on the fabric."
        },
        {
            question: "Can DTF print full color?",
            answer: "Yes! DTF printing allows for photorealistic, full-color prints without any limitations or extra fees per color."
        },
        {
            question: "How do I wash my printed shirt?",
            answer: "For maximum longevity, turn the shirt inside out, wash on a cold, gentle cycle with mild detergent, and tumble dry on low or hang dry. Do not iron directly on the print."
        },
        {
            question: "Can I pick up my order in Chattanooga?",
            answer: "Yes, local pickup is available for customers in the Chattanooga area."
        },
        {
            question: "Do you ship outside Chattanooga?",
            answer: "Yes, we ship our custom apparel and DTF transfers nationwide."
        },
        {
            question: "How long does custom shirt printing take?",
            answer: "[ADMIN TODO: Confirm standard turnaround policy] Typically, standard orders are processed within 5-7 business days after proof approval, but timelines can vary based on order size and complexity."
        },
        {
            question: "What happens after I request a quote?",
            answer: "After you submit a quote request, we review your project details and artwork. We then reach out (usually within 1 business day) with exact pricing, a digital mockup, and the next steps to approve your order for production."
        }
    ];

    const faqSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    });

    return (
        <Layout>
            <SEO 
                title="Frequently Asked Questions | PrintFlow Studio" 
                description="Find answers to common questions about custom T-shirt printing, DTF transfers, artwork requirements, pricing, and shipping in Chattanooga." 
                canonicalUrl="https://www.printflowstudio.com/faq"
                schema={faqSchema}
            />
            <main className="seo-landing-page" style={{ paddingTop: '120px' }}>
                <div className="container">
                    <h1 style={{ textAlign: 'center', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '60px' }}>
                        FREQUENTLY ASKED QUESTIONS
                    </h1>
                    
                    <div className="faq-hub-grid" style={{ display: 'grid', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
                        {faqData.map((faq, index) => (
                            <details key={index} style={{ 
                                background: 'var(--bg-secondary)', 
                                padding: '20px', 
                                borderRadius: '12px',
                                border: '1px solid var(--border-color)',
                                cursor: 'pointer'
                            }}>
                                <summary style={{ 
                                    fontWeight: 'bold', 
                                    fontSize: '1.1rem',
                                    outline: 'none',
                                    color: 'var(--text-primary)'
                                }}>
                                    {faq.question}
                                </summary>
                                <p style={{ 
                                    marginTop: '15px', 
                                    lineHeight: '1.6', 
                                    color: 'var(--text-secondary)' 
                                }}>
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </main>
        </Layout>
    );
}
