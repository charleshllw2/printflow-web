import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import "../styles/FileGuidelines.css";

export default function FileGuidelines() {
    return (
        <Layout>
            <SEO title="Artwork & File Guidelines | PrintFlow Studio" description="Prepare artwork for custom shirts and DTF transfers: file formats, transparent backgrounds, resolution and print sizing from PrintFlow Studio." />
            <div className="container section file-guidelines-page">
                <div className="guidelines-header text-center">
                    <h1>File Guidelines</h1>
                    <p>For artwork ownership and permissions, see our <Link to="/artwork-policy">artwork policy</Link>.</p>
                    <p>Follow these requirements to ensure the best print quality for your DTF transfers.</p>
                </div>

                <div className="guidelines-content">

                    <div className="guideline-section">
                        <h2>Artwork Requirements</h2>
                        <ul className="guidelines-list">
                            <li>
                                <strong>Resolution:</strong> 300 DPI (Dots Per Inch) is recommended for sharp, crisp prints.
                            </li>
                            <li>
                                <strong>Background:</strong> Transparent background is required. We print exactly what you send.
                            </li>
                            <li>
                                <strong>File Format:</strong> PNG is preferred. We also accept SVG, AI, and PSD.
                            </li>
                            <li>
                                <strong>Color Mode:</strong> CMYK color profile is recommended for the most accurate color reproduction.
                            </li>
                            <li>
                                <strong>Text:</strong> Convert all text to outlines/shapes to avoid font issues.
                            </li>
                        </ul>
                    </div>

                    <div className="guideline-section warning-section">
                        <h2>What We Do Not Print</h2>
                        <ul className="guidelines-list">
                            <li>Low-resolution images (under 150 DPI) that appear pixelated or blurry.</li>
                            <li>Copyrighted material without proof of ownership or license.</li>
                            <li>Screenshots or watermarked images.</li>
                        </ul>
                    </div>

                    <div className="guideline-section">
                        <h2>Need Help?</h2>
                        <p>
                            If you're unsure if your file is print-ready, select the
                            <strong> "I have artwork but need help"</strong> option when requesting a quote, or read our step-by-step guide on <Link to="/blog/how-to-prepare-artwork-for-dtf-printing">How to Prepare Artwork for DTF Printing</Link>.
                            Our team will review and prepare your file for a clean print.
                        </p>
                        <div style={{ marginTop: '20px' }}>
                            <Link to="/request-quote" className="btn btn-primary">Start Your Order</Link>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
