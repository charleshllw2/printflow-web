import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../lib/firebase';
import type { Product } from '../data/products';

interface CustomUploadModalProps {
    product: Product;
    activeSize: any;
    selectedSizeId: string;
    setSelectedSizeId: (id: string) => void;
    closeModal: () => void;
}

export default function CustomUploadModal({ product, activeSize, selectedSizeId, setSelectedSizeId, closeModal }: CustomUploadModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        if (!name || !email) {
            setError('Name and Email are required.');
            return;
        }

        setIsUploading(true);

        try {
            // 1. Upload to Firebase Storage
            const storageRef = ref(storage, `custom_uploads/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadUrl = await getDownloadURL(snapshot.ref);

            // 2. Save metadata to Firestore
            await addDoc(collection(db, 'custom_uploads'), {
                name,
                email,
                fileUrl: downloadUrl,
                fileName: file.name,
                sizeLabel: activeSize.label,
                sizeDimensions: activeSize.dimensions,
                price: activeSize.price,
                quantity,
                notes,
                status: 'pending',
                createdAt: serverTimestamp()
            });

            setUploadSuccess(true);
            setTimeout(() => {
                closeModal();
            }, 3000);
        } catch (err: any) {
            console.error('Upload error:', err);
            setError(err.message || 'An error occurred during upload. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    if (uploadSuccess) {
        return (
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{textAlign: 'center', padding: '4rem 2rem'}}>
                <div style={{fontSize: '4rem', color: '#10B981', marginBottom: '1rem'}}>✓</div>
                <h2>Upload Successful!</h2>
                <p>We've received your custom design. We'll review it and contact you at {email} with the next steps.</p>
            </div>
        );
    }

    return (
        <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">×</button>
            
            <div className="modal-grid">
                <div className="modal-image-col">
                    <div style={{background: '#f3f4f6', height: '100%', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '2rem', textAlign: 'center'}}>
                        {file ? (
                            <>
                                <div style={{fontSize: '3rem', color: 'var(--accent-primary, #D000E8)', marginBottom: '1rem'}}>📄</div>
                                <strong>{file.name}</strong>
                                <span style={{fontSize: '0.8rem', color: '#666'}}>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </>
                        ) : (
                            <img src={product.image} alt={product.title} style={{maxWidth: '100%', borderRadius: '8px'}} />
                        )}
                    </div>
                </div>
                <div className="modal-info-col">
                    <div className="modal-category">Custom Order</div>
                    <h2>Upload Your Design</h2>
                    
                    {error && <div style={{background: '#FEE2E2', color: '#B91C1C', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem'}}>{error}</div>}

                    <form onSubmit={handleUploadSubmit} className="modal-form">
                        <div className="form-group">
                            <label>Design File (PNG, SVG, PDF, AI)</label>
                            <input type="file" accept=".png,.svg,.pdf,.ai,.eps,.jpg,.jpeg" onChange={handleFileChange} required style={{padding: '0.5rem 0'}} />
                            <p style={{fontSize: '0.75rem', color: '#666'}}>For best results, upload a high-resolution PNG with a transparent background (300 DPI).</p>
                        </div>

                        <div className="form-group" style={{display: 'flex', gap: '1rem'}}>
                            <div style={{flex: 1}}>
                                <label>Your Name</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="John Doe" />
                            </div>
                            <div style={{flex: 1}}>
                                <label>Email Address</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="john@example.com" />
                            </div>
                        </div>

                        <div className="form-group" style={{display: 'flex', gap: '1rem'}}>
                            <div style={{flex: 2}}>
                                <label>Desired Size</label>
                                <select value={selectedSizeId} onChange={(e) => setSelectedSizeId(e.target.value)}>
                                    {product.sizes.map(size => (
                                        <option key={size.id} value={size.id}>
                                            {size.label} - ${size.price.toFixed(2)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{flex: 1}}>
                                <label>Quantity</label>
                                <input type="number" min="1" value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Additional Notes (Optional)</label>
                            <textarea 
                                value={notes} 
                                onChange={e => setNotes(e.target.value)}
                                placeholder="Any specific instructions or multiple designs in a gang sheet?"
                                rows={2}
                            />
                        </div>

                        <div className="modal-actions" style={{marginTop: '1.5rem'}}>
                            <button type="submit" className="btn btn-primary full-width" disabled={isUploading}>
                                {isUploading ? 'Uploading...' : 'Upload & Submit Request'}
                            </button>
                            <p className="text-center" style={{fontSize: '0.8rem', color: '#666', marginTop: '0.5rem'}}>
                                We will review your file and email you a final invoice to complete the order.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
