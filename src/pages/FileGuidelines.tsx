import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import "../styles/FileGuidelines.css";

export default function FileGuidelines() {
    const [pixels, setPixels] = useState("2400");
    const [inches, setInches] = useState("10");
    const width = Number(pixels);
    const printWidth = Number(inches);
    const density = width / printWidth;
    const valid = Number.isSafeInteger(width) && width > 0 && printWidth > 0 && Number.isFinite(density);
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

                    <section className="guideline-section" id="print-size-check">
                        <h2>Check your artwork at print size</h2>
                        <p>Enter the width of the visible design after trimming transparent margins. Use the pixel dimensions of the original PNG, before any enlargement.</p>
                        <p><label>Artwork width in pixels <input type="number" min="1" step="1" value={pixels} onChange={event => setPixels(event.target.value)} /></label></p>
                        <p><label>Desired print width in inches <input type="number" min="0" step="any" value={inches} onChange={event => setInches(event.target.value)} /></label></p>
                        <p aria-live="polite">{valid ? <><strong>{Number(density.toFixed(1))} pixels per inch</strong> at your chosen width. {density >= 300 ? "Your file meets the studio’s 300 PPI resolution target at this size." : "For this print width, use an original at least " + Math.ceil(printWidth * 300).toLocaleString("en-US") + " pixels wide."}</> : "Enter a positive whole pixel count and a positive print width."}</p>
                        <p>For example, a 2,400-pixel design prints at 300 pixels per inch across 8 inches. At 10 inches it delivers 240. Changing the resolution label alone preserves the same pixels. Check edges, lettering and background transparency separately.</p>
                    </section>

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
