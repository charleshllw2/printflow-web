import { useState } from 'react';
import '../styles/OrderPortal.css';

export default function OrderPortal() {
    const [width, setWidth] = useState(12);
    const [height, setHeight] = useState(12);
    const [quantity, setQuantity] = useState(1);
    const [isGangSheet, setIsGangSheet] = useState(false);
    const [isRush, setIsRush] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    // Pricing Logic (Mock)
    const basePricePerSqInch = 0.04;
    const area = width * height;
    let price = area * basePricePerSqInch * quantity;

    if (isGangSheet) price *= 0.9;
    if (isRush) price += 15;
    if (isPressed) price += (5 * quantity);

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

                        {/* Upload Area */}
                        <div className="upload-area">
                            <div className="upload-icon">📁</div>
                            <p><strong>Drag & Drop your design here</strong></p>
                            <p className="text-sm">or click to browse files</p>
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

                            <button className="btn btn-primary full-width">Add to Cart</button>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
