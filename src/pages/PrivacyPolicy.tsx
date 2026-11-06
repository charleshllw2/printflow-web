import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { BUSINESS_INFO, PRIVACY_AND_ADS_SETTINGS } from "../data/businessSettings";

export default function PrivacyPolicy() {
    return (
        <Layout>
            <SEO
                title="Privacy Policy | PrintFlow Studio"
                description="Read PrintFlow Studio's Privacy Policy covering customer quote data, Stripe checkout, cookies, Google Analytics, and advertising data disclosures."
                canonicalUrl="https://www.printflowstudio.com/privacy-policy"
            />
            <div className="container section" style={{ paddingTop: "110px", maxWidth: "850px", margin: "0 auto" }}>
                <h1>Privacy Policy</h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "8px" }}>
                    Last Updated: {PRIVACY_AND_ADS_SETTINGS.lastUpdated}
                </p>

                <div style={{ marginTop: "26px", color: "var(--text-secondary)", lineHeight: "1.75" }}>
                    <p style={{ marginBottom: "20px" }}>
                        This Privacy Policy describes how {BUSINESS_INFO.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares personal information when you visit <a href="https://www.printflowstudio.com" style={{ color: "var(--accent-color)" }}>www.printflowstudio.com</a>, submit a custom apparel or DTF transfer quote request, upload artwork files, or purchase products from our online shop.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>1. Information We Collect</h2>
                    <p style={{ marginBottom: "15px" }}>
                        When you interact with {BUSINESS_INFO.name}, we collect the following categories of information:
                    </p>
                    <ul style={{ marginLeft: "20px", marginBottom: "20px" }}>
                        <li style={{ marginBottom: "10px" }}>
                            <strong>Information You Provide Directly:</strong> When you request a custom quote or contact us, you may provide your name, email address, phone number, business or organization name, target needed-by date, Chattanooga pickup or shipping preferences, project notes, and uploaded artwork or logo files.
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                            <strong>Payment &amp; Checkout Information:</strong> Online shop purchases are processed securely through Stripe Checkout (or external marketplaces such as Etsy when you choose an external listing link). Payment card numbers are collected directly by the payment processor and are never stored on PrintFlow Studio servers.
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                            <strong>Automatically Collected Technical Data:</strong> Our website and analytics tools automatically receive basic technical data—such as IP address, browser type, device type, approximate region, pages visited, and referring URLs—through cookies and similar web technologies.
                        </li>
                    </ul>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>2. How We Use Your Information</h2>
                    <p style={{ marginBottom: "15px" }}>
                        We use collected information to:
                    </p>
                    <ul style={{ marginLeft: "20px", marginBottom: "20px" }}>
                        <li style={{ marginBottom: "8px" }}>Review your custom apparel or DTF transfer quote requests and prepare accurate pricing and digital proofs.</li>
                        <li style={{ marginBottom: "8px" }}>Inspect uploaded artwork files for print readiness and produce your custom garments or transfers.</li>
                        <li style={{ marginBottom: "8px" }}>Communicate with you regarding proof approvals, Chattanooga-area pickup arrangements, or nationwide shipping updates.</li>
                        <li style={{ marginBottom: "8px" }}>Maintain, secure, troubleshoot, and improve website usability and content.</li>
                    </ul>

                    {/* Editable Cookies, Analytics & Google Advertising / AdSense Disclosure Section (managed in src/data/businessSettings.ts) */}
                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>
                        3. Cookies, Analytics &amp; Google Advertising Data Disclosure
                    </h2>
                    <p style={{ marginBottom: "15px" }}>
                        Cookies are small text files stored by your web browser to remember preferences, measure site performance, and support third-party services:
                    </p>
                    <ul style={{ marginLeft: "20px", marginBottom: "20px" }}>
                        {PRIVACY_AND_ADS_SETTINGS.analyticsEnabled && (
                            <li style={{ marginBottom: "12px" }}>
                                <strong>Website Analytics ({PRIVACY_AND_ADS_SETTINGS.analyticsProvider}):</strong> We use Google Analytics to measure aggregate traffic patterns, page views, and customer navigation paths so we can improve our guides and ordering experience.
                            </li>
                        )}
                        <li style={{ marginBottom: "12px" }}>
                            <strong>Google Advertising &amp; Google AdSense Disclosure:</strong>{" "}
                            {PRIVACY_AND_ADS_SETTINGS.adsenseApprovedAndActive ? (
                                <>
                                    We display third-party advertisements through Google AdSense strictly on informational printing guide pages. Third-party vendors, including Google, use cookies to serve ads based on a visitor&apos;s prior visits to this website or other websites on the internet. Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the internet.
                                </>
                            ) : (
                                <>
                                    {PRIVACY_AND_ADS_SETTINGS.adsensePublisherNote} If and when Google AdSense or Google publisher tags are active on informational guide pages, third-party vendors—including Google—may use cookies to serve ads or measure traffic based on a visitor&apos;s prior visits to this website or other websites on the internet.
                                </>
                            )}
                        </li>
                        <li style={{ marginBottom: "12px" }}>
                            <strong>Managing Cookies &amp; Ad Personalization:</strong> You can block or delete cookies at any time in your browser settings. You may opt out of personalized advertising from Google by visiting{" "}
                            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-color)" }}>
                                Google Ads Settings
                            </a>{" "}
                            or opt out of participating third-party vendors&apos; cookies for personalized advertising at{" "}
                            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-color)" }}>
                                www.aboutads.info/choices
                            </a>. To learn more about how Google processes data when you visit sites using Google services, see{" "}
                            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-color)" }}>
                                How Google uses information from sites or apps that use our services
                            </a>.
                        </li>
                    </ul>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>4. Infrastructure &amp; Fulfillment Partners</h2>
                    <ul style={{ marginLeft: "20px", marginBottom: "20px" }}>
                        <li style={{ marginBottom: "10px" }}>
                            <strong>Inquiry delivery (Resend):</strong> Contact messages, custom quote details, and optional artwork attachments are transmitted through Resend to PrintFlow Studio’s business email inbox so we can review and respond to your project. Firebase is used for administrative access and historical records.
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                            <strong>Stripe &amp; Print Partners:</strong> Direct shop checkout transactions are processed by Stripe. Certain ready-made garment styles or external storefront orders may be fulfilled in coordination with PrintFlow Studio&apos;s production partners or Printify/Etsy storefronts using only the shipping details needed to deliver your order.
                        </li>
                    </ul>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>5. Customer Artwork Confidentiality</h2>
                    <p style={{ marginBottom: "20px" }}>
                        Logos and custom artwork files you upload through our <Link to="/request-quote" style={{ color: "var(--accent-color)" }}>quote form</Link> are used solely to evaluate, quote, proof, and produce your order. We do not sell your uploaded company logos or personal artwork to third parties, nor do we publish client-identifying custom garments in our portfolio without permission. See our <Link to="/artwork-policy" style={{ color: "var(--accent-color)" }}>Artwork &amp; Copyright Policy</Link> for additional details.
                    </p>

                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.4rem", marginTop: "35px", marginBottom: "12px" }}>6. Contact Us</h2>
                    <p style={{ marginBottom: "20px" }}>
                        If you have questions about this Privacy Policy or would like to request updates or deletion of your quote information, contact {BUSINESS_INFO.name} at <a href={BUSINESS_INFO.emailHref} style={{ color: "var(--accent-color)" }}>{BUSINESS_INFO.email}</a> or call <a href={BUSINESS_INFO.phoneHref} style={{ color: "var(--accent-color)" }}>{BUSINESS_INFO.phone}</a>.
                    </p>
                </div>
            </div>
        </Layout>
    );
}
