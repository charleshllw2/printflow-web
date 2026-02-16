import { useState, useRef } from 'react';
import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../styles/OrderPortal.css';

export default function OrderPortal() {
    const [width, setWidth] = useState(12);
    const [height, setHeight] = useState(12);
    const [quantity, setQuantity] = useState(1);
    const [isGangSheet, setIsGangSheet] = useState(false);
    const [isRush, setIsRush] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Pricing Logic
    const basePricePerSqInch = 0.04;
    const area = width * height;
    let price = area * basePricePerSqInch * quantity;

    if (isGangSheet) price *= 0.9;
    if (isRush) price += 15;
    if (isPressed) price += (5 * quantity);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("Please upload a file to proceed.");
            return;
        }

        setIsUploading(true);
        setOrderStatus('idle');

        try {
            // 1. Upload File to Firebase Storage
            const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            // 2. Send Email via FormSubmit.co
            const formData = {
                _subject: `New PrintFlow Order: ${width}x${height} - Qty: ${quantity}`,
                _template: "table",
                width: `${width} inches`,
                height: `${height} inches`,
                quantity: quantity,
                price_estimate: `$${price.toFixed(2)}`,
                gang_sheet: isGangSheet ? "Yes" : "No",
                rush_order: isRush ? "Yes" : "No",
                apparel_press: isPressed ? "Yes" : "No",
                file_url: downloadURL,
                file_name: file.name
            };

            await fetch("https://formsubmit.co/ajax/hello@printflowstudio.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            setOrderStatus('success');
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";

        } catch (error) {
            console.error("Order submission failed:", error);
            setOrderStatus('error');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <section id="order" className="section order-portal-section">
            <div className="container">
                <div className="portal-grid">

                    {/* Left: Instructions */}
                    <div className="portal-info">
                        <h2>Start Your Order</h2>
                        <p className="portal-subtitle">Upload your file, choose your size and quantity, and receive instant pricing.</p>

                        <div className="info-card">
                            <h4>Artwork Requirements</h4>
                            <ul>
                                <li>300 DPI recommended</li>
                                <li>Transparent background preferred</li>
                                <li>PNG, SVG, AI, PSD accepted</li>
                                <li>Minimum 8x8 inches for best results</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Upload Form */}
                    <div className="portal-form-card">

                        {orderStatus === 'success' ? (
                            <div className="success-message" style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✅</div>
                                <h3>Order Received!</h3>
                                <p style={{ color: '#a3a3a3', marginTop: '10px' }}>
                                    We have received your file and order details. <br />
                                    We will contact you shortly to confirm payment and production.
                                </p>
                                <button
                                    className="btn btn-secondary"
                                    style={{ marginTop: '30px' }}
                                    onClick={() => setOrderStatus('idle')}
                                >
                                    Start Another Order
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Upload Area */}
                                <div
                                    className={`upload-area ${file ? 'has-file' : ''}`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="upload-icon">{file ? '📄' : '📁'}</div>
                                    <p><strong>{file ? file.name : 'Drag & Drop your design here'}</strong></p>
                                    <p className="text-sm">{file ? 'Click to change file' : 'or click to browse files'}</p>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                        accept=".png,.jpg,.jpeg,.svg,.ai,.psd,.pdf"
                                    />
                                </div>

                                {/* Configuration */}
                                <div className="form-controls">

                                    <div className="control-row">
                                        <div className="control-group">
                                            <label htmlFor="width-input">Width (in)</label>
                                            <input
                                                id="width-input"
                                                type="number"
                                                value={width}
                                                onChange={e => setWidth(Number(e.target.value))}
                                            />
                                        </div>
                                        <div className="control-group">
                                            <label htmlFor="height-input">Height (in)</label>
                                            <input
                                                id="height-input"
                                                type="number"
                                                value={height}
                                                onChange={e => setHeight(Number(e.target.value))}
                                            />
                                        </div>
                                    </div>

                                    <div className="control-group">
                                        <label htmlFor="quantity-input">Quantity</label>
                                        <input
                                            id="quantity-input"
                                            type="number"
                                            value={quantity}
                                            onChange={e => setQuantity(Number(e.target.value))}
                                            min="1"
                                        />
                                    </div>

                                    <div className="toggles-list">
                                        <label className="toggle-row">
                                            <input type="checkbox" checked={isGangSheet} onChange={e => setIsGangSheet(e.target.checked)} />
                                            <span>Gang Sheet (Save 10%)</span>
                                        </label>

                                        <label className="toggle-row">
                                            <input type="checkbox" checked={isRush} onChange={e => setIsRush(e.target.checked)} />
                                            <span>Rush Order (+$15.00)</span>
                                        </label>

                                        <label className="toggle-row">
                                            <input type="checkbox" checked={isPressed} onChange={e => setIsPressed(e.target.checked)} />
                                            <span>Apparel Press Service (+$5/item)</span>
                                        </label>
                                    </div>

                                    <div className="price-summary">
                                        <span>Estimated Total:</span>
                                        <span className="price-tag">${price.toFixed(2)}</span>
                                    </div>

                                    <button
                                        className="btn btn-primary full-width"
                                        onClick={handleSubmit}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? 'Uploading & Sending...' : 'Submit Order'}
                                    </button>

                                    {orderStatus === 'error' && (
                                        <p style={{ color: '#ff4444', marginTop: '10px', textAlign: 'center' }}>
                                            Something went wrong. Please try again.
                                        </p>
                                    )}

                                </div>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
