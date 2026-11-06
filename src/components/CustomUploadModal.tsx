import { useRef, useState } from 'react';
import { submitInquiry } from '../lib/inquiries';
import type { Product, TransferSize } from '../data/products';

interface CustomUploadModalProps {
    product: Product;
    activeSize: TransferSize;
    selectedSizeId: string;
    setSelectedSizeId: (id: string) => void;
    closeModal: () => void;
}

export default function CustomUploadModal({
    product,
    activeSize,
    selectedSizeId,
    setSelectedSizeId,
    closeModal,
}: CustomUploadModalProps) {
    const requestId = useRef('');
    const [file, setFile] = useState<File | null>(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleUploadSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        if (!file) {
            setError('Please select an artwork file to upload.');
            return;
        }

        if (!name.trim() || !email.trim()) {
            setError('Name and email address are required.');
            return;
        }

        setIsUploading(true);

        try {
            requestId.current ||= crypto.randomUUID();
            await submitInquiry({
                kind: 'artwork', requestId: requestId.current,
                contactName: name.trim(), contactEmail: email.trim(),
                initialService: 'Custom DTF transfer', preselectedDesign: product.id,
                preselectedDesignName: product.title,
                preselectedSize: `${activeSize.label} (${activeSize.dimensions})`,
                preselectedQty: String(quantity), notes: notes.trim(),
            }, file);

            setUploadSuccess(true);
        } catch (err: unknown) {
            console.error('Upload error:', err);
            setError(
                err instanceof Error ? err.message : 'Artwork could not be sent. Your details are preserved; please try again or email hello@printflowstudio.com.'
            );
        } finally {
            setIsUploading(false);
        }
    };

    if (uploadSuccess) {
        return (
            <div className="pf-dtf-modal pf-dtf-modal--centered">
                <p className="pf-eyebrow">UPLOAD CONFIRMED</p>
                <h2 className="pf-dtf-modal__title">ARTWORK RECEIVED.</h2>
                <p className="pf-copy">
                    PrintFlow Studio received your file and will follow up at{' '}
                    <strong>{email}</strong> with review details and invoice steps.
                </p>
                <button
                    type="button"
                    className="pf-button pf-button--primary"
                    onClick={closeModal}
                >
                    DONE
                </button>
            </div>
        );
    }

    return (
        <div className="pf-dtf-modal">
            <div className="pf-dtf-modal__top">
                <span className="pf-eyebrow pf-dtf-modal__eyebrow">CUSTOM TRANSFER UPLOAD</span>
                <button
                    type="button"
                    className="pf-dialog-close"
                    onClick={closeModal}
                    aria-label="Close custom upload dialog"
                >
                    Close ✕
                </button>
            </div>

            <div className="pf-dtf-modal__grid">
                <div className="pf-dtf-modal__media">
                    {file ? (
                        <div className="pf-dtf-file-preview">
                            <span className="pf-eyebrow">SELECTED FILE</span>
                            <strong>{file.name}</strong>
                            <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                    ) : (
                        <img
                            src={product.image}
                            alt={product.alt}
                            className="pf-dtf-modal__img"
                        />
                    )}
                </div>

                <div className="pf-dtf-modal__info">
                    <h2 className="pf-dtf-modal__title">UPLOAD YOUR DESIGN</h2>

                    {error && (
                        <div role="alert" className="pf-dtf-validation-box">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleUploadSubmit} className="pf-dtf-modal__form">
                        <div className="pf-dtf-field">
                            <label htmlFor="custom-upload-file">
                                Design File (PNG, SVG, PDF, AI, EPS)
                            </label>
                            <input
                                id="custom-upload-file"
                                type="file"
                                accept=".png,.jpg,.jpeg,.pdf,.svg"
                                onChange={handleFileChange}
                                required
                                className="pf-input"
                            />
                            <span className="pf-dtf-field__hint">
                                PNG, JPG, PDF, or SVG up to 2 MB. Email larger files to hello@printflowstudio.com.
                            </span>
                        </div>

                        <div className="pf-dtf-field-row">
                            <div className="pf-dtf-field">
                                <label htmlFor="custom-upload-name">Your Name</label>
                                <input
                                    id="custom-upload-name"
                                    type="text"
                                    autoComplete="name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                    className="pf-input"
                                />
                            </div>
                            <div className="pf-dtf-field">
                                <label htmlFor="custom-upload-email">Email Address</label>
                                <input
                                    id="custom-upload-email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    className="pf-input"
                                />
                            </div>
                        </div>

                        <div className="pf-dtf-field-row">
                            <div className="pf-dtf-field">
                                <label htmlFor="custom-upload-size">Transfer Width</label>
                                <select
                                    id="custom-upload-size"
                                    value={selectedSizeId}
                                    onChange={(event) => setSelectedSizeId(event.target.value)}
                                    className="pf-select"
                                >
                                    {product.sizes.map((size) => (
                                        <option key={size.id} value={size.id}>
                                            {size.label} — ${size.price.toFixed(2)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="pf-dtf-field">
                                <label htmlFor="custom-upload-qty">Quantity</label>
                                <input
                                    id="custom-upload-qty"
                                    type="number"
                                    min={1}
                                    value={quantity}
                                    onChange={(event) =>
                                        setQuantity(Math.max(1, parseInt(event.target.value, 10) || 1))
                                    }
                                    className="pf-input"
                                />
                            </div>
                        </div>

                        <div className="pf-dtf-field">
                            <label htmlFor="custom-upload-notes">Project Notes (Optional)</label>
                            <textarea
                                id="custom-upload-notes"
                                value={notes}
                                onChange={(event) => setNotes(event.target.value)}
                                placeholder="Placement details or gang sheet notes..."
                                rows={3}
                                className="pf-textarea"
                            />
                        </div>

                        <div className="pf-dtf-modal__actions">
                            <button
                                type="submit"
                                className="pf-button pf-button--primary"
                                disabled={isUploading}
                            >
                                {isUploading ? 'UPLOADING ARTWORK…' : 'UPLOAD & SUBMIT REQUEST'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
