import Layout from "../components/Layout";
import "../styles/FileGuidelines.css";

export default function FileGuidelines() {
    return (
        <Layout>
            <div className="container section file-guidelines-page">
                <div className="guidelines-header text-center">
                    <h1>File Guidelines</h1>
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
                            <strong> "File Setup Assistance"</strong> add-on when placing your order.
                            Our team will review and prepare your file for a perfect print.
                        </p>
                        <div style={{ marginTop: '20px' }}>
                            <a href="/#order" className="btn btn-primary">Start Your Order</a>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}
